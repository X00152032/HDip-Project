// Import router package
const router = require('express').Router();
const validator = require('validator');
const fs = require('fs');
const multer = require('multer');
const { sql, dbConnPoolPromise, buildSelect } = require('../database/db.js');
const { MAX } = require('mssql');

const upload = multer({
    dest: "/uploaded_files"
});

// Define SQL statements here for use in function below
// These are parameterised queries note @named parameters.
// Input parameters are parsed and set before queries are executed

// for json path - Tell MS SQL to return results as JSON
const SQL_SELECT_ALL = 'SELECT * FROM dbo.Picture';
// without_array_wrapper - use for single result

const SQL_SELECT_BY_ID = 'SELECT * FROM dbo.Picture WHERE id = @id for json path, without_array_wrapper;';

// Second statement (Select...) returns inserted record identified by id = SCOPE_IDENTITY()
const SQL_INSERT = 'INSERT INTO dbo.Picture (contentId, pictureName, picture) VALUES (@contentId, @pictureName, @picture); SELECT * from dbo.Picture WHERE id = SCOPE_IDENTITY();';

//const SQL_UPDATE = 'UPDATE dbo.Picture SET contentId = @contentId, pictureName = @pictureName WHERE id = @id; SELECT * FROM dbo.Picture WHERE id = @id;';

const SQL_DELETE = 'DELETE FROM dbo.Picture WHERE id = @id;';

/**
 * GET a list of all pictures
 * Address http://server:port/Picture
 * @return JSON object
 */
router.get('/', async (req, res) => {
    let parsedSQL = SQL_SELECT_ALL + buildSelect(req);
    try {
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // execute query
            .query(parsedSQL);
        
        // Send HTTP reponse
        // JSON data from SQL is contained in first element of recordset
        res.status(200);
        res.json(result.recordset[0]);
    } catch(err) {
        res.status(500);
        res.send(err.message);
    }
});

/**
 * GET single Picture by id
 * Address http://server:port/Picture/:id
 * @id passed as parameter via url
 * @return JSON Picture object
 */
router.get('/:id', async (req, res) => {
    // Read value of parameter from the request url
    const pictureId = req.params.id;

    /**
     * Validate input - important as bad input could crash the server or lead to an attack
     * See link to validator npm package (at top) for docs
     * If validation fails return an error message
     */
    if (!validator.isNumeric(pictureId, { no_symbols: true })) {
        res.json({ "error": "invalid id parameter" });
        return false;
    }

    /**
     * If validation passed execute query and return result
     * Single Picture with matching id is returned
     */
    try {
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // set id parameter(s) in query
            .input('id', sql.Int, pictureId)
            // execute query
            .query(SQL_SELECT_BY_ID);
        
        // Send HTTP reponse
        // JSON data from SQL is contained in first element of recordset
        res.status(200);
        res.json(result.recordset[0]);
    } catch(err) {
        res.status(500);
        res.send(err.message);
    }
});

/**
 * POST - Insert a new Picture
 * This async function processes a HTTP post request
 */
/* name attribute of <file> element in your form */
router.post('/', upload.any(), async (req, res) => {
    req.files.forEach((file) => {
        if (file.mimetype.startsWith('image')) {
            fs.readFile(file.path, 'binary', async (err, fileData) => {
                let binBuff = Buffer.from(fileData, 'binary');
                const pool = await dbConnPoolPromise
                const ps = new sql.PreparedStatement(pool);
                ps.input('contentId', sql.Int)
                ps.input('pictureName', sql.NVarChar(MAX))
                ps.input('picture', sql.VarBinary(MAX))
                ps.prepare(SQL_INSERT, err => {
                    if (err) {
                        console.warn(err);
                        res.status(500);
                        res.end(err.message);
                    }
                    let newPicture = {
                        contentId: req.body.contentId,
                        pictureName: file.originalname,
                        picture: binBuff
                    };
                    ps.execute(newPicture, (err, result) => {
                        if (err) {
                            console.warn(err);
                            res.status(500);
                            res.end(err.message);
                        } else {
                            console.log(result);
                            res.status(201);
                            res.end();
                        }
                        // release the connection after queries are executed
                        ps.unprepare(err => {
                            if (err) {
                                console.warn(err);
                            }
                        });
                    });
                });
            });
        } else {
            res.status(403);
            res.contentType("text/plain")
            res.end("Only images files are allowed!");
        }
    });
});

module.exports = router;
