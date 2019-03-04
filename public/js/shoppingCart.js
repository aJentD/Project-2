$(document).ready(function() {
  //page logic to be defined.

  loadTable();
  $("#testSS").on("click", function(event) {
    event.preventDefault();
    var mySession = sessionStorage.getItem("cartId");
    console.log(mySession);
  });
});

function loadTable() {
  var cartId = sessionStorage.getItem("cartId");

  var url = "/api/cart/" + cartId;
  $.ajax({ url: url, method: "GET" }).then(function(res) {
    console.log(res);
    console.log(res.length);
    var myTable = $("#myTable");
    var myTotal = 0;
    var myCartId = 0;
    for (var i = 0; i < res.length; i++) {
      var newRow = $("<tr>");
      var prodName = $("<td>").text(res[i]["product.product_name"]);
      var qty = $("<td>").text(res[i].quantity);
      var price = $("<td>").text(res[i]["product.price"]);
      myCartId = res[i].cart_id;
      myTotal += parseInt(price) * parseInt(qty);
      newRow
        .append(prodName)
        .append(qty)
        .append(price);
      myTable.append(newRow);
    }
    sessionStorage.setItem("cartId", myCartId);
  });
}
