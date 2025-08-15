const express = require('express')
const app = express()
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended : true}));
const path = require('path')
app.use(express.static(path.join(__dirname,'public')));
const fs =require('fs')

app.get('/',function(req,res){
    fs.readdir(`./files`,function(err,files){
      res.render("index",{files : files})  
    })
})

app.get('/file/:filename',function(req,res){
   fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
    res.render('show',{filename : req.params.filename, filedata: filedata})
   })
})

app.get('/delete/:filename',function(req,res){
  fs.unlink(`./files/${req.params.filename}`,function(err){
    res.redirect('/')
   })
})

app.get('/edit/:filename',function(req,res){
  res.render('edit',{filename : req.params.filename})
})
app.post('/create',function(req,res){
     fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){
            res.redirect("/")
     })
     
    })


app.post('/rename',function(req,res){
     fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new.split(' ').join('')}.txt`,function(err){
            res.redirect("/")
            console.log(req.body);
            
     })
     
    })


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
