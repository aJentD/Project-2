$(document).ready(function() {
  //page logic to be defined.

  $("#testSS").on("click", function(event) {
    event.preventDefault();
    var mySession = sessionStorage.getItem("cartId");
    console.log(mySession);
  });
  $(".myBtn").on("click", function(event) {
    event.preventDefault();
    var productId;
    var price = 0;
    var quantity = 0;
    var btnId = $(this).attr("id");
    switch (btnId) {
      case "btnDesk":
        productId = 2;
        price = 199.99;
        quantity = 1;
        break;
      case "btnPillow":
        productId = 12;
        price = 10.99;
        quantity = 2;
        break;
      case "btnRack":
        productId = 2;
        price = 10.99;
        quantity = 1;
        break;
      case "btnClock":
        productId = 5;
        price = 40.99;
        quantity = 1;
    }
    var url = "/api/cart";
    var myCartId = sessionStorage.getItem("cartId");
    var cartData = {
      cart_id: myCartId,
      product_id: productId,
      quantity: quantity
    };
    console.log(JSON.stringify(cartData));
    $.ajax({ url: url, method: "POST", data: cartData }).then(function(obj) {
      console.log(obj);
    });
  });
});
