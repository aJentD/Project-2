module.exports = function(sequelize, DataTypes) {
  var Members = sequelize.define("members", {
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    address_1: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    address_2: {
      type: DataTypes.STRING(50),
      validate: {
        len: [0, 50]
      }
    },
    city: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    state: {
      type: DataTypes.STRING(2),
      allowNull: false,
      validate: {
        len: [2],
        is: ["^[a-z]+$", "i"]
      }
    },
    zip_code: {
      type: DataTypes.STRING(5),
      allowNull: false,
      validate: {
        len: [5],
        not: ["a-z", "i"]
      }
    }
  });

  return Members;
};
