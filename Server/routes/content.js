// https://restfulapi.net/http-status-codes/

// Import router package
const router = require('express').Router();
const validator = require('validator');
const { sql, dbConnPoolPromise, buildSelect } = require('../database/db.js');
const { MAX } = require('mssql');

// Define SQL statements here for use in function below
// These are parameterised queries note @named parameters.
// Input parameters are parsed and set before queries are executed

// for json path - Tell MS SQL to return results as JSON
const SQL_SELECT_ALL = 'SELECT * FROM dbo.Content';
// without_array_wrapper - use for single result

const SQL_SELECT_BY_ID = 'SELECT * FROM dbo.Content WHERE id = @id for json path, without_array_wrapper;';

// Second statement (Select...) returns inserted record identified by id = SCOPE_IDENTITY()
const SQL_INSERT = 'INSERT INTO dbo.Content (subjectId, contentName, description, text) VALUES (@subjectId, @contentName, @description, @text); SELECT * from dbo.Content WHERE id = SCOPE_IDENTITY();';

const SQL_UPDATE = 'UPDATE dbo.Content SET subjectId = @subjectId, contentName = @contentName, description = @description, text = @text WHERE id = @id; SELECT * FROM dbo.Content WHERE id = @id;';

const SQL_DELETE = 'DELETE FROM dbo.Content WHERE id = @id;';

/**
 * GET a list of all or if search criteria is set filter 
 * Address http://server:port/content
 * @search (optional) passed as parameter via url
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
 * GET single content by id
 * Address http://server:port/content/:id
 * @id passed as parameter via url
 * @return JSON object
 */
router.get('/:id', async (req, res) => {
    // Read value of parameter from the request url
    const contentId = req.params.id;

    /**
     * Validate input - important as bad input could crash the server or lead to an attack
     * See link to validator npm package (at top) for docs
     * If validation fails return an error message
     */
    if (!validator.isNumeric(contentId, { no_symbols: true })) {
        res.json({ "error": "invalid id parameter" });
        return false;
    }

    /**
     * If validation passed execute query and return result
     * Single content with matching id is returned
     */
    try {
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // set id parameter(s) in query
            .input('id', sql.Int, contentId)
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
 * Validate request data for both post/insert and put/update
 * @param http request
 * @param isUpdate validate id for update
 * @return errors if any
 */
function validate(req, isUpdate) {
    // Validate - error string, initally empty, will store any errors
    let errors = "";

    if (isUpdate) {
        // Make sure that Content id is just a number - note that values are read from request body
        const id = req.body.id;
        if (!validator.isNumeric(String(id), { no_symbols: true })) {
            errors += "Invalid id; ";
        }
    }

    // Make sure that subject id is just a number - note that values are read from request body
    const subjectId = req.body.subjectId;
    if (!validator.isNumeric(String(subjectId), { no_symbols: true })) {
        errors += "Invalid subjectid; ";
    }
    
    // Escape text and potentially bad characters
    const contentName = validator.escape(req.body.contentName);
    if (contentName === "") {
        errors += "invalid contentName; ";
    }

    if (req.body.description) {
        const description = validator.escape(req.body.description);
        if (description === "") {
            errors += "invalid description; ";
        }
    }
    
    return errors;
}

/**
 * POST - Insert new Content
 * This async function processes a HTTP post request
 */
router.post('/', async (req, res) => {
    
    // Validate - erros string, initally empty, will store any errors
    let errors = validate(req);

    // If errors send details in response
    if (errors != "") {
        // return http response 400 (bad request) with errors if validation failed
        res.status(400);
        res.json({ "error": errors });
        return false;  
    }

    // If no errors, insert
    try {
        // Get a DB connection and execute SQL
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // set parameter(s) in query
            .input('subjectId', sql.Int, req.body.subjectId)    
            .input('contentName', sql.NVarChar(50), validator.escape(req.body.contentName))
            .input('description', sql.NVarChar(50), validator.escape(req.body.description || ''))
            .input('text', sql.NVarChar(MAX), req.body.text)
            // Execute Query
            .query(SQL_INSERT);
    
        // If successful, return inserted content via HTTP   
        res.status(201);
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

/**
 * PUT - Update existing content
 * This async function processes a HTTP put request
 */
router.put('/', async (req, res) => {

    // Validate - erros string, initally empty, will store any errors
    let errors = validate(req, true);

    // If errors send details in response
    if (errors != "") {
        // return http response 400 (bad request) with errors if validation failed
        res.status(400);
        res.json({ "error": errors });
        return false;  
    }

    // If no errors, update
    try {
        // Get a DB connection and execute SQL
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // set parameter(s) in query
            .input('subjectId', sql.Int, req.body.subjectId)    
            .input('contentName', sql.NVarChar(50), validator.escape(req.body.contentName))
            .input('description', sql.NVarChar(50), validator.escape(req.body.description))
            .input('text', sql.NVarChar(MAX), req.body.text)
            .input('id', sql.Int, req.body.id)
            // Execute Query
            .query(SQL_UPDATE);
    
        // If successful, return inserted product via HTTP   
        res.status(200);
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

/**
 * DELETE single piece of content by id
 * Address http://server:port/content/:id
 * @id passed as parameter via url
 */
router.delete('/:id', async (req, res) => {
    // Read value of parameter from the request url
    const contentId = req.params.id;

    /**
     * Validate input - important as bad input could crash the server or lead to an attack
     * See link to validator npm package (at top) for docs
     * If validation fails return an error message
     */
    if (!validator.isNumeric(contentId, { no_symbols: true })) {
        res.json({ "error": "invalid id parameter" });
        return false;
    }

    // If validation passed delete content with matching id
    try {
        // Get a DB connection and execute SQL
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // set id parameter(s) in query
            .input('id', sql.Int, contentId)
            // Execute Query
            .query(SQL_DELETE);
    
        // If successful, return OK
        res.status(200);
        res.end();
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

module.exports = router;
