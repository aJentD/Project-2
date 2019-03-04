// The API object contains methods for each kind of request we'll make

var API = {
  addToCart: function(prodId) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      data: JSON.stringify(prodId)
    });
  },
  getProducts: function() {
    return $.ajax({
      type: "GET",
      url: "api/products"
    });
  },
  getProduct: function(prodId) {
    var myUrl = "/products/" + prodId;
    console.log(myUrl);
    return $.ajax({
      type: "GET",
      url: myUrl
    });
  },
  buyProducts: function() {
    return $.ajax({
      type: "PUT"
    });
  }
};

// Button: add item to Detail page
$(".details").on("click", function(event) {
  event.preventDefault();
  console.log("CLICKED");
  var prodId = $(this).attr("data-id");
  console.log(prodId);
  API.getProduct(prodId).done(function(data) {
    console.log(JSON.stringify(data));
    console.log("You're AHHMAZING!!!");
  });
});

// Botton: Add item to cart
$(".addToCart").on("click", function(e) {
  e.preventDefault();
  console.log("CLICKED");
  var cart_id = $(this).attr("data-id");
  API.getProduct(cart_id).done(function(data) {
    console.log(JSON.stringify(data));
    console.log("You Did It!!!");
  });
});

// Button: Buy....Ghost Pal
// $("#buy-button").on("click", function(e){
//   e.preventDefault();
//     console.log("CLICKED")
//     var prodId = $(this).attr("data-id");
//     API.buyProducts(prodId).done(function(data) {
//       console.log(JSON.stringify(data));
//       console.log("You Bought It!!!  WOW!!!!");
// });

// Calculate total amount based on quantity

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
// $("#clickMe").on("click", function() {
//   alert("clicked!");
//   API.getExamples().then(function(data) {
//     var x = data;
//     for (i = 0; i < data.length; i++) {
//       if (i === 3) {
//         alert(x[i].product_name);
//       }
//     }
//   });
// });
