class ProjextBudget{
    constructor(cName="N/A",pName="N/A",budget="N/A"){
        
        this.cName=cName;
        this.pName=pName;
        this.budget=budget;
    }
}
function StoreData(){
    var projects=[];
    let client=document.getElementById("cName").value;
    let project=document.getElementById("pName").value;
    let bud=document.getElementById("budget").value;
    let budgetProject=new ProjextBudget(client,project,bud);
    projects = JSON.parse(localStorage.getItem("jsonArray")) || [];
    projects.push(budgetProject); 
    localStorage.setItem("jsonArray", JSON.stringify(projects));
}
function GetData(){
    let jsonObj=localStorage.getItem("jsonArray");
    let jArray=JSON.parse(jsonObj);
    var startTable="<table class='table table-striped'><tr><th>No.</th><th>Client Name</th><th>Project Name</th><th>Budget</th></tr>";
    var tableContent="";
    var endTable="</table>";
    var totalBudget=0;
    for(var i=0;i<jArray.length;i++)
    {   
        if(i==1){
            tableContent="<tbody><tr><th scope='row'>"+(i)+"</th><td>"+jArray[i].cName+"</td><td>"+jArray[i].pName+"</td><td>$"+jArray[i].budget+"</td></tr></tbody>";  
        }else{
            tableContent=tableContent+"<tbody><tr><th scope='row'>"+(i)+"</th><td>"+jArray[i].cName+"</td><td>"+jArray[i].pName+"</td><td>$"+jArray[i].budget+"</td></tr></tbody>";  
        }
        if(i>0)
        {
        totalBudget=totalBudget+parseInt(jArray[i].budget);
        console.log(parseInt(totalBudget));
        }
    }
    tableContent=startTable+tableContent+endTable;
    console.log(jArray.length)
    if(jArray.length==1)
    {
        document.getElementById("main").innerHTML="No Data"
    }else{
        document.getElementById("main").innerHTML=tableContent;
        document.getElementById("total").innerHTML="Total annual budget for the projects is: $"+parseInt(totalBudget);
    }   
}
function DeleteData(){
    localStorage.clear();
}