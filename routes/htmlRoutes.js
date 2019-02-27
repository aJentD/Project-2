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

  // app.post("/api/cart/:cart_id/:product_id", function(req, res) {
  //   var myCartId, myParam1, myParam2;
  //   console.log(req.params.cart_id);
  //   console.log(req.params.product_id);
  //   myParam1 = parseInt(req.params.cart_id);
  //   myParam2 = parseInt(req.params.product_id);
  //   console.log(myParam1);
  //   console.log(myParam2);

  //   if (myParam1 === 0) {
  //     db.cart
  //       .create({
  //         customer_id: 0
  //       })
  //       .then(function(dbCart) {
  //         myCartId = dbCart.id; //TEST HERE TO SEE IF THIS GIVE YOU THE CART ID!!!
  //         console.log(myCartId);
  //         res.json(JSON.stringify(dbCart));
  //         //db.cart_contents.create()
  //       });
  //   }

    // db.Example.create(req.body).then(function(dbExample) {
    //   res.json(dbExample);
    // });
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
