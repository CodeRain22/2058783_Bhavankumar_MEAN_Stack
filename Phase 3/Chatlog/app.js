//load the expresss module
let express=require("express")
//create the app reference
let app=express();
//load the http module and connect to the app reference
let http=require("http").Server(app);
//load the socket io module and connect to the http module.
let io=require("socket.io")(http);
let mongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017";
var keywords=["help","orders","returns","deals"];
var answers=[
    "You are getting help!",
    "Please tell the order number.",
    "Please wait while i connect you with asssociate.",
    "Click on this message for current deals"
]
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"\\chat.html");
})
io.on("connection",(socket)=>{
    socket.on("name1",(name)=>{
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let Obj={TIME:time,MSG:"Hello! "+name+" , How Can I Help You?. "}
        //console.log(name);
        socket.emit("obj1",Obj);
        mongoClient.connect(url,(err,client)=>{
            if(!err){
                let db=client.db("tcsmean");
                //console.log("connected");
                //console.log(obj);
                db.collection("Chatlog").insertOne(
                    
                    {"client":{"NAME":name,"TIME":time},"server":Obj},
                    (err,result)=>{
                        if(!err){
                            console.log(result);
                            console.log("Log added to database");
                        }else{
                            console.log(err);
                        }
                        client.close();
                    }
                )
               
            }else{
                console.log(err);
            }
           
        })
    })
    socket.on("obj",(msg)=>{
        //console.log(msg);
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let result=keywords.findIndex(i=>i==msg.toLowerCase());
        let Obj="";
        if(result!=-1){
            Obj={TIME:time,MSG:answers[result]}
            socket.emit("obj1",Obj);
        }
        else{
            Obj={TIME:time,MSG:"Please Wait for the help.Thank you."}
            socket.emit("obj1",Obj);
        }
        mongoClient.connect(url,(err,client)=>{
            if(!err){
                let db=client.db("tcsmean");
                //console.log("connected");
                //console.log(obj);
                db.collection("Chatlog").insertOne(
                    {"client":{"TIME":time,"MSG":msg},"server":Obj},
                    (err,result)=>{
                        if(!err){
                            console.log(result);
                            console.log("Log added to database");
                        }else{
                            console.log(err);
                        }
                        client.close();
                    }
                   
                )
             
            }else{
                console.log(err);
            }
            
        })
    })
})
http.listen(9090,()=>console.log("Server running on port number 9090"));