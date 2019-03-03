var db = require("../models");

module.exports = function(app, passport) {
  app.get("/", function(req, res) {
    res.render("index", {
      title: "ATW80 Home"
    });
  });
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
        res.render("products", {
          title: "ATW80 Products",
          products: dbProducts
        });
      });
  });
  //Display Cart Contents
  app.get("/cart/:cart_id", function(req, res) {
    // res.render("shoppingcart");
    // return;
    db.cart_contents
      .findAll({
        raw: true,
        attributes: ["id", "cart_id", "product_id", "quantity"],
        where: {
          cart_id: req.params.cart_id
        },
        include: db.products
      })
      .then(function(dbContents) {
        res.render("shoppingcart", {
          title: "ATW80 Shopping Cart",
          dbContents: dbContents
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
        res.render("products", {
          title: "ATW80 Product Details",
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
              quantity: myParam3
            })
            .then(function(dbContents) {
              console.log(dbContents);
              res.render("shoppingcart", {
                title: "ATW80 Shopping Cart",
                dbContents: dbContents
              });
            });
        });
    } else {
      db.cart_contents
        .create({
          cart_id: myParam1,
          product_id: myParam2,
          quantity: myParam3
        })
        .then(function(dbProducts) {
          res.render("products", {
            title: "ATW80 Product Details",
            products: dbProducts
          });
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
        res.redirect("/products", {
          title: "ATW80 Products"
        });
      });
  });

  app.get("/signup", function(req, res) {
    res.render("signup", {
      title: "ATW80 Signup"
    });
  });

  app.get("/signin", function(req, res) {
    res.render("signin", {
      title: "ATW80 Signin"
    });
  });

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/products",

      failureRedirect: "/signup"
    })
  );

  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/products",

      failureRedirect: "/signin"
    })
  );

  app.get("/dashboard", isLoggedIn, function(req, res) {
    res.render("dashboard");
  });
  app.get("/logout", function(req, res) {
    res.redirect("/products");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/signin");
  }
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
