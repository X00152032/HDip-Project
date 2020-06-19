// Import router package
const router = require('express').Router();

/* Handle get requests for '/'
/* this is the index or home page
*/
router.get('/', function (req, res) {

    // set content type of response body in the headers
    res.setHeader('Content-Type', 'application/json');

    // Send a JSON response - no need to send HTML
    //res.end(JSON.stringify({message: 'This is the home page'}));
    res.json({content: 'This is the my Home Page.'});

});

// export
module.exports = router;