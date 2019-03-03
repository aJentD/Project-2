$(document).ready(function() {
  //page logic to be defined.
  alert("booom1!");
  loadTable();
});

function loadTable() {
  var cartId = "1";
  var url = "api/cart/" + cartId;
  $.ajax({ url: url, type: "GET" }).then(function(res) {
    console.log(res);
    alert("hello");
  });
}
