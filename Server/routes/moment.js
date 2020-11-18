/**
 * POST - Insert a new Assessment
 * This async function processes a HTTP post request
 */
router.post('/', async (req, res) => {

    // Validate - error string, initally empty, will store any errors
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
            .input('appUserId', sql.Int, req.body.appUserId)
            .input('subjectId', sql.Int, req.body.subjectId)
            .input('yearGroupId', sql.Int, req.body.yearGroupId)
            .input('subjectLevel', sql.NVarChar(50), req.body.subjectLevel)
            .input('assessmentName', sql.NVarChar(50), validator.escape(req.body.assessmentName))
            .input('assessmentType', sql.NVarChar(50), req.body.assessmentType)
            .input('percentage', sql.Float(), req.body.percentage)
            .input('grade', sql.NVarChar(50), req.body.grade)
            .input('descriptor', sql.NVarChar(50), req.body.descriptor || '')            
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