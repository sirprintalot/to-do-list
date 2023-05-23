const express = require("express");
const app = express();
const date = require(__dirname+ "/date.js");
const port = 3000;


app.set('view engine', 'ejs');
// replace of body parser
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static(__dirname + '/public'));

let items = [];
let workItems = [];

app.get("/", (req, res) => {
    let day = date.getDate();
    res.render('list', {
        listTitle: day,
        newListItems: items
    });
});

// post using the express parser intead of the body parser
app.post("/", (req, res) => {
    // console.log(req.body);
    let item = req.body.newItem;
    if (req.body.list === "work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect('/');
    }
})

// adding another route

app.get("/work", (req, res) => {
    res.render("list", {
        listTitle: "work List",
        newListItems: workItems
    });
});







app.listen(port, () => {
    console.log(`App online on port ${port}.`);
});