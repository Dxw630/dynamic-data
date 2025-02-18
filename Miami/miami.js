const express = require('express');
const handlebars = require ('express-handlebars');

const app = express();
const bodyParser = require('body-parser')
const port = process.env.port || 3000;
const navigation = require('./data/navigation.json');
app.use(bodyParser.urlencoded({extended:true}))

const handler= require('./lib/handler')

//Set up handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set("views", __dirname + '/views'); // Ensure express knows where views are

// const navigation = require('./data/navigation.json');


app.get('/', (request, response) => {
    response.type("text/html");
    response.render("home", { title: "Miami Travel Site", nav: navigation });
});


app.get('/beaches', (request, response) => {
    response.type("text/html");
    response.render("page", { title: "Miami Beaches", nav: navigation });
});

app.get('/nightlife', (request, response) => {
    response.type("text/html");
    response.render("page", { title: "Miami Night Life", nav: navigation });
});

app.get('/about', (request, response) => {
    response.type("text/html");
    response.render("page", { title: "About Miami", nav: navigation });
});

app.get('/search', (request, response) => {
    console.log(request);
    response.type("text/html");
    response.render("page", { title: "Search results for: " + request.query.q });
 })


app.get('/basic',(req,res) =>{
    res.render('page', {req})
})



//Newsletter Routes
app.get('/newsletter-signup', handler.newsletterSignup)
app.post('/newsletter-signup/process', handler.newsletterSignupProcess)
app.get('/newsletter/list',handler.newsletterSignupList)
//Dyanmic Routes
//details shows one record
app.get('/newsletter/details/:email',handler.newsletterUser)
//delete users by email
app.get('/newsletter/delete/:email',handler.newsletterUserDelete)

//error handling goes after the actual routes
//The default response is not found 
app.use((request, response) => {
    response.type("text/html");
    response.status(404);
    response.send("404 not found");
});

app.use((error, request, response, next) => {
    console.error("Error:", error);
    response.type("text/html");
    response.status(500);
    response.send("500 server error");
});

app.listen(port, () => {
    console.log(`Express is running on http://localhost:${port}`);
    console.log("Press Ctrl-C to terminate.");
});