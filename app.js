import express from 'express';

const app = express();
const port = 3000;
// var alert =require('alert')


// app.use("/", (req, res) => {
//     console.log("First page");
//     console.log('Request method is', req.method, 'and', req.url, 'url address page is running');
//     // next();
// });



// app.use('/', routing);

app.set("view engine", "ejs")
// app.set("views", "views1")

app.listen(port, () => {
    console.log('server listening at port ${port}')
})

app.get("/", (req, res) => {
    res.render('home', { name: "test" })
}
)

app.get("/news", (req, res) => {
    res.render('news')
}
)
app.get('/users', (req, res) => {
    res.send('users')

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
    res.status(500).send('Something broke!')
})