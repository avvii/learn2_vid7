const express = require('express');
const app = express();
const path = require('path');
const fs=require('fs');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    // res.send("welcome");
    // res.render("index");
    fs.readdir('./files', (err, files) => {
        res.render('index', { files:files });
    });
});
app.post('/create', (req, res) => {
    const title = req.body.title.split(' ').join('');
    // writeFile(file,data,callback)
    fs.writeFile(`./files/${title}.txt`, req.body.details, (err) => {
        res.redirect('/');
    });
});
app.get('/file/:filename', (req, res) => {
    const filename = req.params.filename;
    fs.readFile(`./files/${filename}`, 'utf-8', (err, filedata) => {
        res.render('show',{filename:filename, filedata:filedata });
    });
}); 
 
app.listen(3000);