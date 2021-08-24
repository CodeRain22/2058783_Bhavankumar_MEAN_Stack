class User{
    constructor(fname,lname,gender,email,time){
       this.fname=fname;
       this.lname=lname;
       this.gender=gender;
       this.email=email;
       this.time=time;
    }
}
debugger;
function getTimeDetails(){
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    return dateTime;

}
debugger;
function addRecords(){
    var isNewUser=readline.question("Enter Y to Add Record or Enter E to exit: ")
    while(isNewUser=="y"  || isNewUser=="Y"){
    debugger;
        let firstname=readline.question("Enter first name: ");
        let lastname=readline.question("Emter last name: ");
        let genderType=readline.question("Enter gender: ");
        let emailadd=readline.questionEMail("Enter email address: "); 
        if(!fs.existsSync('records.json'))
        {
            fs.writeFileSync("records.json",JSON.stringify(users));
        }
        debugger;
        var data=fs.readFileSync("records.json")
        let empString=data.toString();
        users=JSON.parse(empString);
        debugger;
        let currentUser=new User(firstname,lastname,genderType,emailadd,getTimeDetails());
        users.push(currentUser);
        fs.writeFileSync("records.json",JSON.stringify(users));
        isNewUser=readline.question("Enter Y to Add Record or Enter E to exit: ");
    }
}

var users=[];
let readline=require("readline-sync");
let fs=require("fs");
debugger;
addRecords();