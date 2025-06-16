import express from 'express';
// import parser from './parser.js';
import path from 'path';
import { fileURLToPath } from 'url';

import bodyParser from 'body-parser';


// const bodyParser = require('body-parser');
// converts the module's URL into a file path

const __filename = fileURLToPath(import.meta.url);
// extracts the directory name from the file path.

const __dirname = path.dirname(__filename);


const app = express();
const port = 3000;
app.use(bodyParser.json()); // Parses JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded form data



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
//include style sheet into the program
app.use('/styles', express.static(path.join(__dirname, 'styles')));

// app.use('/', routing);

app.set("view engine", "ejs")
// app.set("views", "views1")

app.listen(port, () => {
    console.log('server listening at port ${port}')
})
//Create GET routes for all data that should be exposed to the client.
app.get("/", (req, res) => {
    console.log(data)
    res.render('index')
}
)


//render users.ejs in browser
//Create GET routes for all data that should be exposed to the client.
app.get('/users', (req, res) => {

        let userID = req.query.id;
        const selectedUser = data.filter(user => user.id === userID);
        if (selectedUser != null && selectedUser.length >= 1) {
            res.render('users', { users: selectedUser });
        } else {
             res.render('users', { users: data });
        }


    
})



// Rendering the user sign up form 
app.get('/usersignup', (req, res) => {
    res.render('usersignup', { statusMsg: '' })
})

//Create POST routes for data
//Create POST routes for data, as appropriate. At least one data category should allow for client creation via a POST request.
app.post('/registeruser', (req, res) => {
    const newEntry = req.body;
    console.log("newEntry", req.body)

    // Generate new ID based on array length
    newEntry.id = (data.length + 1).toString();

    console.log("newEntry", newEntry)
    // Add new entry to the array
    data.push(newEntry);
    console.log(data);
    res.status(201).render("usersignup", { statusMsg: "Entry added successfully!" });
});

//create delete routes for data
//Create DELETE routes for data, as appropriate. At least one data category should allow for client deletion via a DELETE request.
app.delete("/delete/:id", (req, res) => {
    console.log("deleete API", req.params.id)
    const user = data.find((u, i) => {
        if (u.id == req.params.id) {
            data.splice(i, 1);
        }
    });
    res.json({ message: "Successfully deleted.." })
    // deleteuser()
});


//Create PATCH or PUT routes for data, as appropriate. At least one data category should allow for client manipulation via a PATCH or PUT request.
app.patch("/patch/:id", (req, res) => {
    const user = data.find((u, i) => {
        if (u.id == req.params.id) {
            data.splice(i, 1);
        }
    });
    res.json({ message: "Successfully updated.." })

});



app.use((req, res) => {
    res.status(404).render('404')
})


// Create and use error-handling middleware.
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).render('404')
})