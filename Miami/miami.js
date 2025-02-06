const express = require('express');
const handlebars = require ('express-handlebars');

const app = express();
const port = process.env.port || 3000;
const navigation = require('./data/navigation.json');

//Set up handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set("views", __dirname + '/views'); // Ensure express knows where views are

const navigation = require('./data/navigation.json');


app.get('/', (request, response) => {
    response.type("text/html");
    response.render("home", { title: "Miami Travel Site", navigation });
});


app.get('/beaches', (request, response) => {
    response.type("text/html");
    response.render("page", { title: "Miami Beaches" });
});

app.get('/nightlife', (request, response) => {
    response.type("text/html");
    response.render("page", { title: "Miami Night Life" });
});

app.get('/about', (request, response) => {
    response.type("text/html");
    response.render("page", { title: "About Miami" });
});

app.get('/search', (request, response) => {
    console.log(request);
    response.type("text/html");
    response.render("page", { title: "Search results for: " + request.query.q });
});

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