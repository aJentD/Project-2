module.exports = function(sequelize, DataTypes) {
  var Cart = sequelize.define("cart", {
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date_purchased: {
      type: DataTypes.DATE
    }
  });
  // Cart.hasOne(Member);
  return Cart;
};
