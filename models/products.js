module.exports = function(sequelize, DataTypes) {
  var Products = sequelize.define(
    "products",
    {
      sku: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          len: [1, 10]
        }
      },
      product_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          len: [1, 100]
        }
      },
      product_desc: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          len: [1, 200]
        }
      },
      country: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: [1, 50]
        }
      },
      product_image: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          len: [1, 200]
        }
      },
      price: {
        type: DataTypes.FLOAT(5, 2),
        allowNull: false
      }
    },
    { timestamps: false }
  );

  return Products;
};
