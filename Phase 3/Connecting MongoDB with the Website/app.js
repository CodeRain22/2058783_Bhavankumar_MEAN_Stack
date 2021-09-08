let express = require("express");
let app = express();
let bodyParser = require("body-parser");
const {
  request,
  response
} = require("express");
app.use(bodyParser.urlencoded({
  extended: true
}));
let mongoClient = require("mongodb").MongoClient;
const {
  Promise
} = require("mongoose");
let url = "mongodb://localhost:27017";

app.get("/", (request, response) => {
  response.sendFile(__dirname + "\\course_platform.html");
})
app.get("/addCourse", (request, response) => {
  response.sendFile(__dirname + "\\addCourse.html");
})
app.get("/updateCourse", (request, response) => {
  response.sendFile(__dirname + "\\updateCourse.html");
})
app.get("/deleteCourse", (request, response) => {
  response.sendFile(__dirname + "\\deleteCourse.html");
})
// app.get("/",(request,response)=>{
//     response.sendFile(__dirname+"\\course_platform.html");
// })
//ADD COURSE TO DATABASE START
app.post("/addCoursetoDB", (request, response) => {
  let courseDetail = request.body;
  let outputMessage = "hi";
  console.log(courseDetail);
  mongoClient.connect(url, (err, client) => {
    if (!err) {
      console.log("Connected");
      let db = client.db("tcsmean");
      db.collection("CourseCol").insertOne(courseDetail, (err, result) => {
        if (!err) {
          outputMessage = "Course Added Sucessfully";
          //console.log(outputMessage)
        } else {
          outputMessage = "Course Did Not Add Sucessfully";
        }
        response.writeHead(200, {
          "content-type": "text/html"
        })
        response.write(`
                <head>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
                </head>
                <div class="text-center">
                <h2>${outputMessage}</h2>
                <a href="/" class="btn btn-primary" style="margin-left: 2%;">
                <button type="button" class="btn btn-primary">Back</button>
                </a>
                </div>
                `)
        client.close();
      });
    } else {
      console.log(err)
    }

  })
})
//ADD COURSE TO DATABASE END
//UPDATE COURSE TO DATABASE START
app.post("/updateCoursetoDB", (request, response) => {
  let courseDetail = request.body;
  let outputMessage = "hi";
  console.log(courseDetail.cId);
  mongoClient.connect(url, (err, client) => {
    if (!err) {
      "cAmount"
      console.log("Connected");
      let db = client.db("tcsmean");
      db.collection("CourseCol").updateOne({
          cId: courseDetail.cId
        }, {
          $set: {
            cAmount: courseDetail.cAmount
          }
        },
        (err, result) => {
          if (!err) {
            if (result.modifiedCount == 1 || result.matchedCount == 1) {
              outputMessage = "Course Updated Sucessfully/Already Updated";
            } else {
              outputMessage = "Course Did Update Sucessfully/Cours Id Does Not Exist";
            }

            console.log(result);
          } else {
            outputMessage = "Course Did Not Add Sucessfully";
            console.log(err)
          }
          response.writeHead(200, {
            "content-type": "text/html"
          })
          response.write(`
                <head>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
                </head>
                <div class="text-center">
                <h2>${outputMessage}</h2>
                <a href="/" class="btn btn-primary" style="margin-left: 2%;">
                <button type="button" class="btn btn-primary">Back</button>
                </a>
                </div>
                `)
          client.close();
        });
    } else {
      console.log(err)
    }

  })
})
//UPDATE COURSE TO DATABASE END
//DELETE COURSE TO DATABASE START
app.post("/deleteCoursetoDB", (request, response) => {
  let courseDetail = request.body;
  let outputMessage = "hi";
  console.log(courseDetail.cId);
  mongoClient.connect(url, (err, client) => {
    if (!err) {
      "cAmount"
      console.log("Connected");
      let db = client.db("tcsmean");
      db.collection("CourseCol").deleteOne({
          cId: courseDetail.cId
        },
        (err, result) => {
          if (!err) {
            if (result.deletedCount == 1) {
              outputMessage = "Course Deleted Sucessfully";
            } else {
              outputMessage = "Course Is Not Present In Record";
            }

            console.log(result);
          } else {
            outputMessage = "Course Did Not Add Sucessfully";
            console.log(err)
          }
          response.writeHead(200, {
            "content-type": "text/html"
          })
          response.write(`
                <head>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
                </head>
                <div class="text-center">
                <h2>${outputMessage}</h2>
                <a href="/" class="btn btn-primary" style="margin-left: 2%;">
                <button type="button" class="btn btn-primary">Back</button>
                </a>
                </div>
                `)
          client.close();
        });
    } else {
      console.log(err)
    }

  })
})
//DELETE COURSE TO DATABASE END
//FETCH COURSE FROM DATABSE START
app.get("/fetchCourse", (request, response) => {
  let CourseListPageStart = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Course List</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    </head>
    <body>
        <div style="text-align: center;">
            <h1>CoursePlateform.Com</h1>
            <h2 style="text-decoration:underline;">Course List</h2>
        </div>
        <table style=" margin-left: auto;margin-right: auto;" border="1px solid"> 
            <tr>
                <th>Course Id.</th>
                <th>Course Name.</th>
                <th>Description.</th>
                <th>Course Amount.</th>
            </tr>`
  let CourseListPageData = ``;
  let CourseListPageEnd =
    `</table> <br><br>
        <a href="/" class="btn btn-primary" style="margin-left: 2%;">
        <button type="button" class="btn btn-primary">Back</button>
        </a>
    </body>
    </html>
    `
  mongoClient.connect(url, async (err, client) => {
    let count = 0;
    if (!err) {
      CourseListPageData = ``;
      let CourseListPage = ``;
      console.log("Connected");
      let db = client.db("tcsmean");
      let cursor = db.collection("CourseCol").find();
      let numb = await db.collection("CourseCol").count();
      if (numb == 0) {
        response.sendFile(__dirname + "\\addCourse.html");
      }
      await cursor.forEach(doc => {
        count++;
        CourseListPageData = CourseListPageData +
          `<tr>
                    <td>` + doc.cId + `</td>
                    <td>` + doc.cName + `</td>
                    <td>` + doc.cDes + `</td>
                    <td>` + doc.cAmount + `</td>
                </tr>`;
        CourseListPage = CourseListPageStart + CourseListPageData + CourseListPageEnd;
        client.close()
        if (count == numb) {
          response.write(CourseListPage)
        } else {

          response.write("");
        }
      })
    } else {
      console.log(err)
    }
  })
})
//FETCH COURSE FROM DATABSE END
app.listen(9090, () => console.log("Server is running on port 9090"));