let express = require('express');
let fs = require('fs');
let cors = require('cors');

let app = express();
let port = 8080;

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
  fs.readFile("./db.json", 'utf-8', (error, data) => {
    if (error) {
      response.send(error);
    } else {
      response.send(data);
    }
  })
});

// Dispaly data Logic
app.get('/Userdata', (request, respons) => {
  fs.readFile("./db.json", 'utf-8', (error, data) => {
    if (error) {
      respons.send(error);
    } else {
      respons.send(data);
    }
  })
});

// Data Delete logic
app.delete('/Deleteuserdata/:id',(request,respons)=>{
     let UserId=request.params.id;
     console.log(UserId);
     fs.readFile('./db.json','utf-8',(err,data)=>{
      if(err){
        respons.send(err);
      }else{
          let Userparse=JSON.parse(data);
           let Userfilter=Userparse.Userdata.filter((el)=> el.id!= UserId);
           fs.writeFile('./db.json',JSON.stringify({Userdata:Userfilter}),(err)=>{
            if(err){
              respons.send(err);
            }else{
              console.log("Data Was Delete")
            }
           })
           

      }
     })
})

// Add DATA User logic

app.post('/AddUserdata', (request, response) => {
  let Adduserdata = request.body;

  fs.readFile('./db.json', 'utf-8', (err, data) => {
    if (err) {
      response.send(err);
    } else {
      let Adddate = JSON.parse(data);
      Adddate.Userdata.push({...Adduserdata, id: new Date().getMilliseconds()});
      fs.writeFile('./db.json', JSON.stringify(Adddate), (err) => {
        if (err) {
          response.send(err);
        } else {
          console.log("Data ADD");
          response.send("Data added successfully");
        }
      })
    }
   })
})





// Update Data 

app.patch('/Updateuser/:id', (request, response) => {
  let userUpdateid = request.params.id;
  let userbody = request.body;

  fs.readFile('./db.json', 'utf-8', (err, data) => {
    if (err) {
      response.send(err);
    } else {
      let Maindata = JSON.parse(data);
      let FinalData = Maindata.Userdata.map((item) => item.id == userUpdateid ? { ...item, ...userbody } : item);
      Maindata.Userdata = FinalData;
      fs.writeFile('./db.json', JSON.stringify(Maindata), (err) => {
        if (err) {
          response.send(err);
        } else {
          console.log("success");
          response.send("Data updated successfully");
        }
      })
    }
  })
})
app.listen(port, (err) => {
  if (err) {
    console.log("Error starting server: " + err);
  } else {
    console.log("Server is Running on port " + port);
  }
});
