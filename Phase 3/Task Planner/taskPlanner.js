let http=require("http");
let url=require("url");
let fs=require("fs");
let taskArray=[];
let indexPage=`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Planner</title>
</head>
<body>
    <div style="text-align: center;font-family: monospace;">
        <h2 >Welcome to Task Planner</h2>
        <br><br>
        <h3>Click on the options link below for action:</h3><br> |
        <a href="addTask"><input type="button" value="Add Task"></a> |
        <a href="deleteTask"><input type="button" value="Delete Task"></a> |
        <a href="taskList"><input type="button" value="Task List"></a> |
    </div>
</body>
</html>
`
let addTaskPage=`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Task</title>
</head>
<body>
    <div style="font-family: monospace;">
        <h1 style="text-align: center;">Task Planner</h1>
        <h2 style="text-decoration:underline;">Add Task</h2>
    </div>
    <form action="addTaskFunction" >
        <label for="empid">Employee ID:</label>
        <input type="text" name="empid"><br><br>
        <label style="margin-right: 35px;" for="taskid">Task ID:</label>
        <input type="text" name="taskid"><br><br>
        <label style="margin-right: 56px;" for="taskname">Task: </label>
        <input type="text" name="taskname"><br><br>
        <label style="margin-right: 28px;" for="deadline">Deadline: </label>
        <input type="date" name="deadline"><br><br> |
        <input type="submit" value="Add Task"> |
        <a href="index"><input type="button" value="Back"></a> |
    </form>
</body>
</html>
`
let deleteTaskPage=`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Delete Task</title>
</head>
<body>
    <div style="font-family: monospace;">
        <h1 style="text-align: center;">Task Planner</h1>
        <h2 style="text-decoration:underline;">Delete Task</h2>
    </div>
    <form action="deletTaskFuncation">
        <label for="">Enter Task Id :</label>
        <input type="text" name="dTaskid"><br><br> |
        <input type="submit" value="Submit"> |
        <a href="index"><input type="button" value="Back"></a> |
    </form>
</body>
</html>
`

let TaskListPageStart=`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task List</title>
</head>
<body>
    <div style="font-family: monospace;text-align: center;">
        <h1>Task Planner</h1>
        <h2 style="text-decoration:underline;">Task List</h2>
    </div>
    <table style=" margin-left: auto;margin-right: auto;" border="1px solid"> 
        <tr>
            <th>Emp Id.</th>
            <th>Task Id.</th>
            <th>Task.</th>
            <th>Deadline.</th>
        </tr>`
let TaskListPageData=``;
let TaskListPageEnd=
`</table> <br><br>
    | <a href="index"><input type="button" value="Back"></a> |
</body>
</html>
`


let server=http.createServer((request,response)=>{
    let urlInfo=url.parse(request.url,true);
   
    if(urlInfo.path!="/favicon.ico")
    {
        console.log(urlInfo);
        if(urlInfo.pathname=="/")
        {
            response.write(indexPage)
        }
        if(urlInfo.pathname=="/index")
        {
            response.write(indexPage)
        }
        if(urlInfo.pathname=="/addTask")
        {
            response.write(addTaskPage)
        }
        if(urlInfo.pathname=="/deleteTask")
        {
            response.write(deleteTaskPage)
        }
        if(urlInfo.pathname=="/taskList")
        {
            
            if(!fs.existsSync('listTask.json'))
            {
                response.writeHead(200,{"content-type":"text/html"})
                response.write("<h4>There Are No Task Added. Please Add the Task First.</h4>")
            }
            else{
                TaskListPageData=``;
                var data=fs.readFileSync("listTask.json")
                console.log(data.length);
                if (data.length==2){
                    response.writeHead(200,{"content-type":"text/html"})
                    response.write("<h4>There Are No Task Added. Please Add the Task First.</h4>")
                }
                else{
                   
                    let taskString=data.toString();
                    taskArray=JSON.parse(taskString);
                    for(let i=0;i<taskArray.length;i++)
                    {
                        TaskListPageData=TaskListPageData+
                        `<tr>
                            <td>`+taskArray[i].empid+`</td>
                            <td>`+taskArray[i].taskid+`</td>
                            <td>`+taskArray[i].taskname+`</td>
                            <td>`+taskArray[i].deadline+`</td>
                        </tr>`;
                    }
                }
            }
            let TaskListPage=TaskListPageStart+TaskListPageData+TaskListPageEnd;
            response.write(TaskListPage)
        }
        if(urlInfo.pathname=="/addTaskFunction")
        {  
            let taskDetails={empid:urlInfo.query.empid,
                taskid:urlInfo.query.taskid,
                taskname:urlInfo.query.taskname,
                deadline:urlInfo.query.deadline};
                //console.log(taskDetails)
            if(!fs.existsSync('listTask.json'))
            {
                fs.writeFileSync("listTask.json",JSON.stringify(taskArray));
            }
            let data=fs.readFileSync("listTask.json")
            let taskString=data.toString();
            taskArray=JSON.parse(taskString);
            let resultIndex=taskArray.findIndex(r=>r.taskid==urlInfo.query.taskid);
            if(resultIndex==-1){
                taskArray.push(taskDetails);
                fs.writeFileSync("listTask.json",JSON.stringify(taskArray));
                response.writeHead(200,{"content-type":"text/html"})
                response.write("<h3>Task Added in the List Sucessfully!!!</h3>")
                response.write(indexPage)
            }
            else{
                response.writeHead(200,{"content-type":"text/html"})
                response.write("<h3>Task ID Must Be Unique. Please Enter the Task Details.</h3>")
                response.write(addTaskPage)
            }
        }
        if(urlInfo.pathname=="/deletTaskFuncation")
        {
            if(!fs.existsSync('listTask.json'))
            {
                response.writeHead(200,{"content-type":"text/html"})
                response.write("<h4>There Are No Task Added. Please Add the Task First.</h4>")
            }
            else{
                let taskIdDetail=urlInfo.query.dTaskid;
                let data=fs.readFileSync("listTask.json")
                let taskString=data.toString();
                taskArray=JSON.parse(taskString);
                if (data.length==2){
                    response.writeHead(200,{"content-type":"text/html"})
                    response.write("<h4>There Are No Task Added. Please Add the Task First.</h4>")
                }else{
                  
                    let resultIndex=taskArray.findIndex(r=>r.taskid==taskIdDetail);
                    if(resultIndex==-1){
                        response.writeHead(200,{"content-type":"text/html"})
                        response.write("<h4>No Task Found With Task ID.</h4>")
                    }
                    else{
                        taskArray.splice(resultIndex,1);
                        fs.writeFileSync("listTask.json",JSON.stringify(taskArray));
                        response.writeHead(200,{"content-type":"text/html"})
                        response.write("<h4>Task Deleted With Tak ID.</h4>")
                    }
               }
            }
            response.write(indexPage)
        }
        
        response.end("");
    }
})
server.listen(9090,()=>console.log("Server is running on port 9090"));
