var db = require("../models");

module.exports = function(app) {
  // Load Products page
  app.get("/products", function(req, res) {
    db.products
      .findAll({
        raw: true,
        attributes: [
          "id",
          "sku",
          "product_name",
          "product_desc",
          "country",
          "product_image",
          "price"
        ]
      })
      .then(function(dbProducts) {
        console.log(dbProducts);
        res.render("index", {
          products: dbProducts
        });
      });
  });
  //Display Cart Contents
  app.get("/cart/:cart_id", function(req, res) {
    db.cart_contents.findAlldb.Cart_Contents.findAll({
      raw: true,
      attributes: ["id", "cart_id", "quantity"],
      where: {
        cart_id: req.params.cart_id
      },
      include: [
        {
          model: Products,
          attributes: [
            "id",
            "sku",
            "product_name",
            "product_desc",
            "country",
            "product_image",
            "price"
          ],
          where: { id: Sequelize.col("cart_content.project_id") }
        }
      ]
    }).then(function(dbCartContents) {
      res.render("shoppingcart", {
        cart_contents: dbCartContents
      });
    });
  });

  // Load Product page and pass in the product id
  app.get("/products/:id", function(req, res) {
    db.products
      .findOne({
        raw: true,
        attributes: [
          "id",
          "sku",
          "product_name",
          "product_desc",
          "country",
          "product_image",
          "price"
        ],
        where: { id: req.params.id }
      })
      .then(function(dbProducts) {
        res.render("example", {
          products: dbProducts
        });
      });
  });

  app.post("/cart", function(req, res) {
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
  });
  app.put("/purchase", function(req, res) {
    db.carts
      .update(
        {
          date_purchased: db.sequelize.fn("NOW")
        },
        {
          where: { id: req.body.cart_id }
        }
      )
      .then(function(dbCart) {
        console.log(JSON.stringify(dbCart));
      })
      .then(function() {
        db.products
          .findAll({
            raw: true,
            attributes: [
              "id",
              "sku",
              "product_name",
              "product_desc",
              "country",
              "product_image",
              "price"
            ]
          })
          .then(function(dbProducts) {
            console.log(dbProducts);
            res.render("index", {
              products: dbProducts
            });
          });
      });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

//Original code

// module.exports = function(app) {
//   // Load index page
//   app.get("/", function(req, res) {
//     db.Example.findAll({}).then(function(dbExamples) {
//       res.render("index", {
//         msg: "Welcome!",
//         examples: dbExamples
//       });
//     });
//   });

//   // Load example page and pass in an example by id
//   app.get("/example/:id", function(req, res) {
//     db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
//       res.render("example", {
//         example: dbExample
//       });
//     });
//   });

//   // Render 404 page for any unmatched routes
//   app.get("*", function(req, res) {
//     res.render("404");
//   });
// };
