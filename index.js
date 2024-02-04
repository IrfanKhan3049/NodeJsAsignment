var http =  require('http');
var fs = require('fs');
const multer = require("multer");


// File upload folder



var server = http.createServer((req,res)=>{
  
  if(req.url =="/"){
    res.write('<h1>This is Home Page</h1>')
    res.end();
  }
  else if(req.url == "/about"){
    res.write('<h1>This is About Page</h1>')
    res.end();
  }
  else if(req.url == "/contact"){

    res.write('<h1>This is Contact Page</h1>')
    res.end();

  }
  else if(req.url == "/file-write"){

    fs.writeFile('demo.txt','Hello World',(error)=>{
      if(error){
        res.write("File write Fail");
        res.end();
      }
      else{
        res.write("File write Succes");
        res.end();
      }
      
    });
  }
  else if(req.url == "/file-upload"){
   
    upload(req, res, function (error) {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end("File Upload Fail");
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("File Upload Success");
      }
    });
     
  }

});


// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, callBack) {
    callBack(null, './uploads');
  },
  filename: function (req, file, callBack) {
    callBack(null, file.originalname);
  }
});

const upload = multer({ storage: storage }).single('avatar');

server.listen(5500,()=>{
  console.log("Server run succesfully");

});