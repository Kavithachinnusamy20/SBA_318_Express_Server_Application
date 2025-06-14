import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
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
    // let userData = data[0];
   
    // res.render('users', { id: " ", name: userData.name, age: userData.age, email: userData.email })
   res.render('users', { id: "", name: "", age: "", email: ""})
})

app.get('/users/:id', (req, res) => {
    let userID = req.params.id;

    const selectedUser = data.filter(user => user.id === userID);

    console.log("User Data", userID, selectedUser);

    if (selectedUser != null && selectedUser.length >=1) {
        let userData = selectedUser[0];
        res.render('users', { id: userData.id, name: userData.name, age: userData.age, email: userData.email })
    } else {
        try {
            throw new Error('BROKEN')
        } catch (err) {
            next(err)
        }
    }

})


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