// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

// TODO-Express to run server and routes
const express = require('express');
// TODO-Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static('website'));




/*Post and Get requests */

//Http Post
const data = [];
app.post("/postData", addInfo);

function addInfo(req, res) {
    projectData['date'] = req.body.date;
    projectData['temp'] = req.body.temp;
    projectData['content'] = req.body.content;
  res.send(projectData);
}

//Http Get
function getInfo(req, res) {
    res.send(projectData);
}

app.get("/getData", getInfo);



// My Setup Server
const port = 3500;

const server = app.listen(port, listening);

function listening(){

    console.log("server is running");

}
