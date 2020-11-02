// https://restfulapi.net/http-status-codes/

// Import router package
const router = require('express').Router();
const validator = require('validator');
const { sql, dbConnPoolPromise, buildSelect } = require('../database/db.js');

// Define SQL statements here for use in function below
// These are parameterised queries note @named parameters.
// Input parameters are parsed and set before queries are executed

// for json path - Tell MS SQL to return results as JSON
const SQL_SELECT_ALL = 'SELECT * FROM X00152032.Product';
// without_array_wrapper - use for single result

const SQL_SELECT_BY_ID = 'SELECT * FROM X00152032.Product WHERE id = @id for json path, without_array_wrapper;';

// Second statement (Select...) returns inserted record identified by id = SCOPE_IDENTITY()
const SQL_INSERT = 'INSERT INTO X00152032.Product (categoryId, productName, description, stock, price) VALUES (@categoryId, @productName, @description, @stock, @price); SELECT * from X00152032.Product WHERE id = SCOPE_IDENTITY();';

const SQL_UPDATE = 'UPDATE X00152032.Product SET categoryId = @categoryId, productName = @productName, description = @description, stock = @stock, price = @price WHERE id = @id; SELECT * FROM X00152032.Product WHERE id = @id;';

const SQL_DELETE = 'DELETE FROM X00152032.Product WHERE id = @id;';

/**
 * GET a list of all or if search criteria is set filter 
 * Address http://server:port/product
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
 * GET single by id
 * Address http://server:port/product/:id
 * @id passed as parameter via url
 * @return JSON object
 */
router.get('/:id', async (req, res) => {
    // Read value of parameter from the request url
    const productId = req.params.id;

    /**
     * Validate input - important as bad input could crash the server or lead to an attack
     * See link to validator npm package (at top) for docs
     * If validation fails return an error message
     */
    if (!validator.isNumeric(productId, { no_symbols: true })) {
        res.json({ "error": "invalid id parameter" });
        return false;
    }

    /**
     * If validation passed execute query and return result
     * Single product with matching id is returned
     */
    try {
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // set id parameter(s) in query
            .input('id', sql.Int, productId)
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
    // Validate - erros string, initally empty, will store any errors
    let errors = "";

    if (isUpdate) {
        // Make sure that id is just a number - note that values are read from request body
        const id = req.body.id;
        if (!validator.isNumeric(String(id), { no_symbols: true })) {
            errors += "invalid id; ";
        }
    }

    // Make sure that category id is just a number - note that values are read from request body
    const categoryId = req.body.categoryId;
    if (!validator.isNumeric(String(categoryId), { no_symbols: true })) {
        errors += "invalid category id; ";
    }
    
    // Escape text and potentially bad characters
    const productName = validator.escape(req.body.productName);
    if (productName === "") {
        errors += "invalid productName; ";
    }

    if (req.body.description) {
        const description = validator.escape(req.body.description);
        if (description === "") {
            errors += "invalid description; ";
        }
    }

    // Make sure that product stock is a number
    const stock = req.body.stock;
    if (!validator.isNumeric(String(stock), { no_symbols: true })) {
        errors += "invalid stock; ";
    }

    // Validate price
    const price = req.body.price;
    if (!validator.isDecimal(String(price), { allow_negatives: false })) {
        errors += "invalid productPrice; ";
    }
    
    return errors;
}

/**
 * POST - Insert a new product
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
            .input('categoryId', sql.Int, req.body.categoryId)    
            .input('productName', sql.NVarChar, validator.escape(req.body.productName))
            .input('description', sql.NVarChar, validator.escape(req.body.description || ''))
            .input('stock', sql.Int,  req.body.stock)
            .input('price', sql.Decimal, req.body.price)
            // Execute Query
            .query(SQL_INSERT);
    
        // If successful, return inserted product via HTTP   
        res.status(201);
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

/**
 * PUT - Update an existing product
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
            .input('categoryId', sql.Int, req.body.categoryId)    
            .input('productName', sql.NVarChar, validator.escape(req.body.productName))
            .input('description', sql.NVarChar, validator.escape(req.body.description))
            .input('stock', sql.Int,  req.body.stock)
            .input('price', sql.Decimal, req.body.price)
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
 * DELETE single product by id
 * Address http://server:port/product/:id
 * @id passed as parameter via url
 */
router.delete('/:id', async (req, res) => {
    // Read value of parameter from the request url
    const productId = req.params.id;

    /**
     * Validate input - important as bad input could crash the server or lead to an attack
     * See link to validator npm package (at top) for docs
     * If validation fails return an error message
     */
    if (!validator.isNumeric(productId, { no_symbols: true })) {
        res.json({ "error": "invalid id parameter" });
        return false;
    }

    // If validation passed delete product with matching id
    try {
        // Get a DB connection and execute SQL
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // set id parameter(s) in query
            .input('id', sql.Int, productId)
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
