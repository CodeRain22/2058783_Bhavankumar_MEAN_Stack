//load the expresss module
let express=require("express")
//create the app reference
let app=express();
//load the http module and connect to the app reference
let http=require("http").Server(app);
//load the socket io module and connect to the http module.
let io=require("socket.io")(http);
//
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
        let Obj={d:time,m:"Hello! "+name+" , How Can I Help You?. "}
        console.log(name);
        socket.emit("obj1",Obj);
    })
    socket.on("obj",(msg)=>{
        console.log(msg);
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let result=keywords.findIndex(i=>i==msg.toLowerCase());
        if(result!=-1){
            let Obj={d:time,m:answers[result]}
            socket.emit("obj1",Obj);
        }
        else{
            let Obj={d:time,m:"Please Wait for the help.Thank you."}
            socket.emit("obj1",Obj);
        }
    })
})
http.listen(9090,()=>console.log("Server running on port number 9090"));

