var cartItem = /** @class */ (function () {
    function cartItem(itemName, itemPrice) {
        this.itemName = itemName;
        this.itemPrice = itemPrice;
    }
    return cartItem;
}());
var cart = [];
var itemCount = 0;
function addItem(itemname, price) {
    var item = new cartItem(itemname, price);
    cart = JSON.parse(localStorage.getItem("jsonArray")) || [];
    itemCount = JSON.parse(localStorage.getItem("count"));
    itemCount = itemCount + 1;
    cart.push(item);
    localStorage.setItem("count", JSON.stringify(itemCount));
    localStorage.setItem("jsonArray", JSON.stringify(cart));
    document.getElementById("cart_number").innerHTML = JSON.parse(localStorage.getItem("count"));
}
function getItemCount() {
    if (JSON.parse(localStorage.getItem("count")) == null) {
        document.getElementById("cart_number").innerHTML = '0';
    }
    else {
        document.getElementById("cart_number").innerHTML = JSON.parse(localStorage.getItem("count"));
    }
}
function clears() {
    localStorage.clear();
    document.getElementById("checkout").innerHTML = 'No Items In the Cart';
    document.getElementById("total").innerHTML = "";
}
function getvalues() {
    var array = JSON.parse(localStorage.getItem("jsonArray"));
    if (array != null) {
        var sum = 0;
        var startTable = "<table class='table table-striped center'><tr><th>No.</th><th>Item Name</th><th>Item Price</th></tr>";
        var tableContent = "";
        var endTable = "</table>";
        for (var i in array) {
            tableContent = tableContent + "<tbody><tr><th scope='row'>" + (parseInt(i) + 1) + "</th><td>" + array[i].itemName + "</td><td>$" + array[i].itemPrice + "</td></tr></tbody>";
            sum = sum + array[i].itemPrice;
        }
        tableContent = startTable + tableContent + endTable;
        document.getElementById("checkout").innerHTML = tableContent;
        document.getElementById("total").innerHTML = "Total value: $" + sum;
    }
    else {
        document.getElementById("checkout").innerHTML = 'No Items In the Cart';
    }
}
