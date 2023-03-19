const express=require("express")
const bodyParser=require("body-parser")
const request=require("request")
const https=require("https")
const { resolveSoa } = require("dns")
const app=express()
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})
app.post("/",function(req,res){
    const firstname=req.body.fname;
    const lastname=req.body.mname;
    const email=req.body.ename;
    
    var data={
        member:[
            {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME: firstname,
                LNAME: lastname 
            }
        }
    ]
    }
    const jsonData =JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/eb505867ff";
    const options={
        METHOD:"POST",
        auth:"himanshu:b53fbf151a1c64c1db4b26bdf8320533-us21"
    }
   const request= https.request(url,options,function(response){
   if (response.statusCode===200){
    res.sendFile(__dirname+"/success.html")
   }else{
    res.sendFile(__dirname+"/failure.html");
   }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })

    })
    request.write(jsonData);
    request.end();
    
})
app.listen(3000,function(){
    console.log("server is at 3000")
})
// e0ab359a4166b234e9a3a921c0d20ca6-us21
// eb505867ff
// https://us21.admin.mailchimp.com/lists/members