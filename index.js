import express from 'express';

const app = express();
const port = 3000;





app.set("view engine", "ejs")
// app.set("views", "views1")

app.listen(port, () => {
    console.log('server listening at port ${port}')
})

// app.get("/", (req, res) => {
//     let i = Math.floor(Math.random() * magicResponse.length)
//     res.render('home', { pageTitle : magicResponse[i]})
// }
// )

app.get("/news", (req, res) => {
    res.render('news')
}
)
app.get('/users',(req,res)=> {
  res.send('users')

})


app.post("/create",(req,res)=>{
    res.send("hit")
})


app.use((req,res) => {
    res.status(404).render('404')
})