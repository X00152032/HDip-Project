// Import router package
const router = require('express').Router();
const validator = require('validator');
const { sql, dbConnPoolPromise, buildSelect } = require('../database/db.js');

// Authenication
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs');

// Define SQL statements here for use in function below
// These are parameterised queries note @named parameters.
// Input parameters are parsed and set before queries are executed

// for json path - Tell MS SQL to return results as JSON
const SQL_SELECT_ALL = 'SELECT * FROM dbo.AppUser';
// without_array_wrapper - use for single result

const SQL_SELECT_BY_ID = 'SELECT * FROM dbo.AppUser WHERE id = @id for json path, without_array_wrapper;';

const SQL_SELECT_BY_EMAIL = 'SELECT * FROM dbo.AppUser WHERE email = @email;';

// Second statement (Select...) returns inserted record identified by id = SCOPE_IDENTITY()
const SQL_INSERT = 'INSERT INTO dbo.AppUser (firstName, lastName, yearGroupId, email, password, role) VALUES (@firstName, @lastName, @yearGroupId, @email, @password, @role); SELECT * from dbo.AppUser WHERE id = SCOPE_IDENTITY();';

const SQL_UPDATE = 'UPDATE dbo.AppUser SET firstName = @firstName, lastName = @lastName, yearGroupId = @yearGroupId, email = @email, password = @password, role = @role WHERE id = @id; SELECT * FROM dbo.AppUser WHERE id = @id;';

const SQL_DELETE = 'DELETE FROM dbo.AppUser WHERE id = @id';

/**
 * GET list of all users
 * Address http://server:port/user
 * @return JSON array of users
 */
// Passport JWT checks
// This calls the jwt middleware in auth.js
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
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
 * GET single user by id
 * Address http://server:port/user/:id
 * @id passed as parameter via url
 * @return JSON user object
 */
router.get('/:id', async (req, res) => {
    // Read value of parameter from the request url
    const userId = req.params.id;

    /**
     * Validate input - important as bad input could crash the server or lead to an attack
     * See link to validator npm package (at top) for docs
     * If validation fails return an error message
     */
    if (!validator.isNumeric(userId, { no_symbols: true })) {
        res.json({ "error": "invalid id parameter" });
        return false;
    }

    /**
     * If validation passed execute query and return result
     * Single user with matching id is returned
     */
    try {
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // set id parameter(s) in query
            .input('id', sql.Int, userId)
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

async function emailExists(emailAddress) {
    try {
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // set id parameter(s) in query
            .input('email', sql.NVarChar, emailAddress)
            // execute query
            .query(SQL_SELECT_BY_EMAIL);
        
        return result.recordset[0];
    } catch(err) {
        throw err;
    }
};

/**
 * Validate request data for both post/insert and put/update
 * @param {*} req - http request
 * @return errors if any
 */
function validate(req, isUpdate) {
    // Validate - error string, initally empty, will store any errors
    let errors = "";

    if (isUpdate) {
        // Make sure that id is just a number - note that values are read from request body
        const id = req.body.id;
        if (!validator.isNumeric(String(id), { no_symbols: true })) {
            errors += "Invalid id; ";
        }
    }
    
    // Escape text and potentially bad characters
    const firstName = validator.escape(req.body.firstName);
    if (firstName === "") {
        errors += "Invalid firstName; ";
    }

    // Escape text and potentially bad characters
    const lastName = validator.escape(req.body.lastName);
    if (lastName === "") {
        errors += "Invalid lastName; ";
    }

    const emailAddress = validator.escape(req.body.email);
    if (emailAddress === "" || !validator.isEmail(emailAddress)) {
        errors += "Invalid email; ";
    }

    const password = req.body.password;
    if (password === "" || password.length < 8) {
        errors += "Invalid password; ";
    }
    
 //   if (!isUpdate) {
 //       if (emailExists(emailAddress)) {
 //           errors += "User already exists";
 //       }
 //   }
    return errors;
    
};

/**
 * POST - Insert a new user
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
            .input('firstName', sql.NVarChar, validator.escape(req.body.firstName))
            .input('lastName', sql.NVarChar, validator.escape(req.body.lastName))
            .input('yearGroupId', sql.Int, req.body.yearGroupId)
            .input('email', sql.NVarChar, validator.escape(req.body.email))
            .input('password', sql.NVarChar, validator.escape(req.body.password))
            .input('role', sql.NVarChar, (req.body.role))
            // Execute Query
            .query(SQL_INSERT);
    
        // If successful, return inserted user via HTTP   
        res.status(201);
        res.json(result.recordset);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

/**
 * PUT - Update an existing user
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
            .input('firstName', sql.NVarChar, validator.escape(req.body.firstName))
            .input('lastName', sql.NVarChar, validator.escape(req.body.lastName))
            .input('yearGroupId', sql.Int, req.body.yearGroupId)
            .input('email', sql.NVarChar, validator.escape(req.body.email))
            .input('password', sql.NVarChar, validator.escape(req.body.password))
            .input('role', sql.NVarChar, (req.body.role))
            .input('id', sql.Int, req.body.id)
            // Execute Query
            .query(SQL_UPDATE);
    
        // If successful, return inserted user via HTTP   
        res.status(200);
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

/**
 * DELETE single user by id
 * Address http://server:port/user/:id
 * @id passed as parameter via url
 */
router.delete('/:id', async (req, res) => {
    // Read value of parameter from the request url
    const id = req.params.id;

    /**
     * Validate input - important as bad input could crash the server or lead to an attack
     * See link to validator npm package (at top) for docs
     * If validation fails return an error message
     */
    if (!validator.isNumeric(id, { no_symbols: true })) {
        res.json({ "error": "invalid id parameter" });
        return false;
    }

    // If validation passed delete user with matching id
    try {
        // Get a DB connection and execute SQL
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // set id parameter(s) in query
            .input('id', sql.Int, id)
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
