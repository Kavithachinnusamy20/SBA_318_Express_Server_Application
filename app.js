import express from 'express';
// import parser from './parser.js';
import path from 'path';
import { fileURLToPath } from 'url';

import bodyParser from 'body-parser';


// const bodyParser = require('body-parser');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
app.use(bodyParser.json()); // Parses JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded form data


// var alert =require('alert')


// app.use("/", (req, res) => {
//     console.log("First page");
//     console.log('Request method is', req.method, 'and', req.url, 'url address page is running');
//     // next();
// });

const data = [
    {
        "id": "1",
        "name": "xyz",
        "email": "xxxx@example.com",
        "age": 28
    },
    {
        "id": "2",
        "name": "abc",
        "email": "abcss@example.com",
        "age": 34
    },
    {
        "id": "3",
        "name": "yzaa",
        "email": "yyyy@example.com",
        "age": 25
    }
]
    ;

app.use('/styles', express.static(path.join(__dirname, 'styles')));

// app.use('/', routing);

app.set("view engine", "ejs")
// app.set("views", "views1")

app.listen(port, () => {
    console.log('server listening at port ${port}')
})

app.get("/", (req, res) => {
    console.log(data)
    res.render('index')
}
)

// app.get("/news", (req, res) => {
//     res.render('news')
// }
// )

app.get('/users', (req, res) => {
    let userData = data[0];

    res.render('users', { id: userData.id, name: userData.name, age: userData.age, email: userData.email })
    // res.render('users', { id: "", name: "", age: "", email: "" })
})

app.get('/users/:id', (req, res) => {
    let userID = req.params.id;

    const selectedUser = data.filter(user => user.id === userID);

    // console.log("User Data", userID, selectedUser);

    if (selectedUser != null && selectedUser.length >= 1) {
        let userData = selectedUser[0];
        res.render('users', { id: userData.id, name: userData.name, age: userData.age, email: userData.email })
    } else {
        try {
            throw new Error('BROKEN')
        } catch (err) {
            next(err)
        }
    }

});


app.post('/registeruser', (req, res) => {

    const newEntry = req.body;
    //  console.log ( "newEntry", req.body)

    // Generate new ID based on array length
    newEntry.id = (data.length + 1).toString();

   console.log ( "newEntry", newEntry)
    // Add new entry to the array
    data.push(newEntry);

    res.status(201).json({ message: "Entry added successfully!", data });
});





app.get("/contact", (req, res) => {
    try {
        throw new Error('BROKEN')
    } catch (err) {
        next(err)
    }

})


app.use((req, res) => {
    res.status(404).render('404')
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).render('404')
})