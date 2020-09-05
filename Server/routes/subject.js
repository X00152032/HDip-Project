// Import router package
const router = require('express').Router();
const validator = require('validator');
const { sql, dbConnPoolPromise } = require('../database/db.js');
const { MAX } = require('mssql');

// Define SQL statements here for use in function below
// These are parameterised queries note @named parameters.
// Input parameters are parsed and set before queries are executed

// for the json path - Tell MS SQL to return all results as JSON
const SQL_SELECT_ALL = 'SELECT * FROM dbo.Subject for json path;';
// without_array_wrapper - use for single result

const SQL_SELECT_BY_ID = 'SELECT * FROM dbo.Subject WHERE id = @id for json path, without_array_wrapper;';

// Second statement (Select...) returns inserted record identified by id = SCOPE_IDENTITY()
const SQL_INSERT = 'INSERT INTO dbo.Subject (subjectName, description) VALUES (@subjectName, @description); SELECT * from dbo.Subject WHERE id = SCOPE_IDENTITY();';

const SQL_UPDATE = 'UPDATE dbo.Subject SET subjectName = @subjectName, description = @description WHERE id = @id; SELECT * FROM dbo.Subject WHERE id = @id;';

const SQL_DELETE = 'DELETE FROM dbo.Subject WHERE id = @id;';

/**
 * GET a list of all Subjects
 * Address http://server:port/subject
 * @return JSON object
 */
router.get('/', async (req, res) => {
    try {
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // execute query
            .query(SQL_SELECT_ALL);

        // Send HTTP reponse
        // JSON data from SQL is contained in first element of recordset
        res.status(200);
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

/**
 * GET single category by id
 * Address http://server:port/subject/:id
 * @id passed as parameter via url
 * @return JSON category object
 */
router.get('/:id', async (req, res) => {
    // Read value of parameter from the request url
    const subjectId = req.params.id;

    /**
     * Validate input - important as bad input could crash the server or lead to an attack
     * See link to validator npm package (at top) for docs
     * If validation fails return an error message
     */
    if (!validator.isNumeric(subjectId, { no_symbols: true })) {
        res.json({ "error": "invalid id parameter" });
        return false;
    }

    /**
     * If validation passed execute query and return result
     * Single Subject with matching id is returned
     */
    try {
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // set id parameter(s) in query
            .input('id', sql.Int, subjectId)
            // execute query
            .query(SQL_SELECT_BY_ID);

        // Send HTTP reponse
        // JSON data from SQL is contained in first element of recordset
        res.status(200);
        res.json(result.recordset[0]);
    } catch (err) {
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
    // Validate - erros string, initally empty, will store any errors
    let errors = "";

    if (isUpdate) {
        // Make sure that id is just a number - note that values are read from request body
        const id = req.body.id;
        if (!validator.isNumeric(String(id), { no_symbols: true })) {
            errors += "invalid id; ";
        }
    }

    // Escape text and potentially bad characters
    const subjectName = validator.escape(req.body.subjectName);
    if (subjectName === "") {
        errors += "invalid subjectName; ";
    }

    return errors;
}

/**
 * POST - Insert a new Subject
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
            .input('subjectName', sql.NVarChar(50), validator.escape(req.body.subjectName))
            .input('description', sql.NVarChar(MAX), validator.escape(req.body.description || ''))
            // Execute Query
            .query(SQL_INSERT);

        // If successful, return inserted subject via HTTP   
        res.status(201);
        res.json(result.recordset);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

/**
 * PUT - Update an existing Subject
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
            .input('subjectName', sql.NVarChar(50), validator.escape(req.body.subjectName))
            .input('description', sql.NVarChar(MAX), validator.escape(req.body.description))
            .input('id', sql.Int, req.body.id)
            // Execute Query
            .query(SQL_UPDATE);

        // If successful, return inserted subject via HTTP   
        res.status(200);
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

/**
 * DELETE single subject by id
 * Address http://server:port/subject/:id
 * @id passed as parameter via url
 */
router.delete('/:id', async (req, res) => {
    // Read value of parameter from the request url
    const subjectId = req.params.id;

    /**
     * Validate input - important as bad input could crash the server or lead to an attack
     * See link to validator npm package (at top) for docs
     * If validation fails return an error message
     */
    if (!validator.isNumeric(subjectId, { no_symbols: true })) {
        res.json({ "error": "invalid id parameter" });
        return false;
    }

    // If validation passed delete subject with matching id
    try {
        // Get a DB connection and execute SQL
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // set id parameter(s) in query
            .input('id', sql.Int, subjectId)
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
