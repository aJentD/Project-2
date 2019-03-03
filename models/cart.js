module.exports = function(sequelize, DataTypes) {
  var Carts = sequelize.define(
    "carts",
    {
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      date_purchased: {
        type: DataTypes.DATE
      }
    },
    { timestamps: false, underscored: true }
  );
  return Carts;
};
