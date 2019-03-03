var db = require("../models");

module.exports = function(app) {
  //retrieve all products
  app.get("/api/products", function(req, res) {
    console.log(db.products);
    db.products.findAll({}).then(function(dbProducts) {
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
  app.get("/api/cart/:cart_id", function(req, res) {
    db.cart_contents
      .findAll({
        raw: true,
        attributes: ["id", "cart_id", "product_id", "quantity"],
        where: {
          cart_id: req.params.cart_id
        }
      })
      .then(function(dbCartContents) {
        //pass back data
        res.json(dbCartContents);
      });
  });

  // Add something to cart
  //Step 1.  If :cart_id = 0, create a new record in cart table and set the id.
  //Step 2.  If :cart_id <> 0, create a new item in cart_contents table.

  app.post("/api/cart", function(req, res) {
    var myCartId, myParam1, myParam2;

    myParam1 = parseInt(req.body.cart_id);
    myParam2 = parseInt(req.body.product_id);
    myParam3 = parseInt(req.body.quantity);

    if (myParam1 === 0) {
      db.carts
        .create({
          customer_id: 0
        })
        .then(function(dbCart) {
          myCartId = dbCart.id;

          db.cart_contents
            .create({
              cart_id: myCartId,
              product_id: myParam2,
              quantity: myParam3
            })
            .then(function(dbContents) {
              res.json(JSON.stringify(dbContents));
            });
        });
    } else {
      db.cart_contents
        .create({
          cart_id: myParam1,
          product_id: myParam2,
          quantity: myParam3
        })
        .then(function(dbContents) {
          res.json(JSON.stringify(dbContents));
        });
    }

    // db.Example.create(req.body).then(function(dbExample) {
    //   res.json(dbExample);
    // });
  });
  app.put("/api/cart", function(req, res) {
    var myParam1, myParam2, myParam3;

    myParam1 = parseInt(req.body.cart_id);
    myParam2 = parseInt(req.body.product_id);
    myParam3 = parseInt(req.body.quantity);

    db.cart_contents
      .update(
        { quantity: myParam3 },
        { where: { cart_id: myParam1, product_id: myParam2 } }
      )
      .then(function(dbContents) {
        res.json(JSON.stringify(dbContents));
      });
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
