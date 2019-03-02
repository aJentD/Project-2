var db = require("../models");

module.exports = function(app) {
  //retrieve all products
  app.get("/api/products", function(req, res) {
    console.log(db.products);
    db.products.findAll({ timestamps: false }).then(function(dbProducts) {
      res.json(dbProducts);
    });
  });

  app.get("/api/products/:product_id", function(req, res) {
    db.products
      .findOne({
        where: {
          id: req.params.product_id
        }
      })
      .then(function(dbProducts) {
        res.json(dbProducts);
      });
  });

  // Get all items in the cart
  app.get("/api/cart_contents/:cart_id", function(req, res) {
    db.cart_contents
      .findAll({
        where: {
          cart_id: req.params.cart_id
        },
        include: [
          {
            model: Products,
            where: { id: Sequelize.col("cart_content.project_id") }
          }
        ]
      })
      .then(function(dbCartContents) {
        //pass back data
        res.json(dbCartContents);
      });
  });

  // Add something to cart
  //Step 1.  If :cart_id = 0, create a new record in cart table and set the id.
  //Step 2.  If :cart_id <> 0, create a new item in cart_contents table.

  app.post("/api/cart/:cart_id/:product_id", function(req, res) {
    var myCartId, myParam1, myParam2;
    console.log(req.params.cart_id);
    console.log(req.params.product_id);
    myParam1 = parseInt(req.params.cart_id);
    myParam2 = parseInt(req.params.product_id);
    console.log(myParam1);
    console.log(myParam2);

    if (myParam1 === 0) {
      db.cart
        .create({
          customer_id: 0
        })
        .then(function(dbCart) {
          myCartId = dbCart.id; //TEST HERE TO SEE IF THIS GIVE YOU THE CART ID!!!
          console.log(myCartId);
          res.json(JSON.stringify(dbCart));
          //db.cart_contents.create()
        });
    }

    // db.Example.create(req.body).then(function(dbExample) {
    //   res.json(dbExample);
    // });
  });

  // Delete an example by id
  //   app.delete("/api/examples/:id", function(req, res) {
  //     db.Example.destroy({ where: { id: req.params.id } }).then(function(
  //       dbExample
  //     ) {
  //       res.json(dbExample);
  //     });
  //   });
};

//   ORIG STARTER CODE
// module.exports = function(app) {
//   // Get all examples
//   app.get("/api/examples", function(req, res) {
//     db.Example.findAll({}).then(function(dbExamples) {
//       res.json(dbExamples);
//     });
//   });

//   // Create a new example
//   app.post("/api/examples", function(req, res) {
//     db.Example.create(req.body).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });

//   // Delete an example by id
//   app.delete("/api/examples/:id", function(req, res) {
//     db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });
// };
