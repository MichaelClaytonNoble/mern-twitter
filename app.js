const mongoose = require('mongoose');
const passport = require('passport');


const bodyParser = require('body-parser');

//creating a new express server 
const express = require("express");

const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");

const app = express();
const db = require('./config/keys').mongoURI;


mongoose
.connect(db, { useNewUrlParser: true })
.then(() => console.log("Connected to MongoDB successfully"))
.catch(err => console.log(err));

//setting up a basic route so we can render some information on the page 
app.get("/", (req, res) =>  {
  console.log(res);
});
app.use(passport.initialize());
require('./config/passport')(passport);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//now we need to tell the app which port to run on 
//since we are deploying this app on heroku 
//and heroku requires that we run our serever on 
//process.env.PORT 
//we must add the following port 

const port = process.env.PORT || 5000;

//now the server will run on localhost:5000

//now now we have express create a socket and listen for connections on the path 
app.listen(port, () => console.log(`Server is running on port ${port}`));

//running node app you should see Hello World! on the browser 


app.use("/api/users", users);
app.use("/api/tweets", tweets);

//nodemon 
//use nodemon to watch for changes and update the page 
//add this to package.json 
//"scripts": {
//   "start": "node app.js",
//   "server": "nodemon app.js"
// }

