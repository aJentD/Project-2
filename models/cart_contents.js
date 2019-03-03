module.exports = function(sequelize, DataTypes) {
  var Cart_Contents = sequelize.define(
    "cart_contents",
    {
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    { timestamps: false, underscored: true }
  );
  return Cart_Contents;
};
