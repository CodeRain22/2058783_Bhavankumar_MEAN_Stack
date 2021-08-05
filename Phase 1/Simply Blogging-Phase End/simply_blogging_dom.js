function addBlog(){
    var title=document.getElementById("title").value;
    var article=document.getElementById("article").value;
    var imageUrl=document.getElementById("image").value;
    
    
    var cardDeckTag=document.createElement("div");
    cardDeckTag.className="card-deck col-sm-6 col-md-4 col-lg-3";
    cardDeckTag.setAttribute("style","width: 18rem; ");


    var cardTag=document.createElement("div");
    cardTag.className="card text-white bg-primary mb-3";
    cardTag.setAttribute("style","border-radius: 20px;")

    var cardBody=document.createElement("div");
    cardBody.className="card-body";
    cardBody.setAttribute("style","text-align: center; ");

    var cardTitle=document.createElement("h4");
    cardTitle.className="card-title";
    cardTitleContain=document.createTextNode(title);
    cardTitle.appendChild(cardTitleContain);
    cardTitle.setAttribute("style","text-align: start;");

    var imagetag=document.createElement("img");
    imagetag.className="card-img-top col-m-2";
    imagetag.src=imageUrl;
    imagetag.setAttribute("style","height:200px;")
  

    var articleTag=document.createElement("h5");
    articleTag.className="col-m-4";
   
    var articleTagContain=document.createTextNode(article);
    articleTag.appendChild(articleTagContain);
    articleTag.setAttribute("style","padding:10px;border-radius: 20px;text-align: start;color:black;height:200px; overflow:auto;background-color: lightblue");
     

    var buttonTag=document.createElement("BUTTON");
    buttonTag.className="col-sm-4 btn btn-secondary btn-lg active";
    buttonTag.innerHTML="Read"    

    cardBody.appendChild(imagetag);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(articleTag);
    cardBody.appendChild(buttonTag);
    cardTag.appendChild(cardBody);
    cardDeckTag.appendChild(cardTag);
    document.getElementById("blogs").appendChild(cardDeckTag);
    
   document.getElementById("blogForm").reset();

}