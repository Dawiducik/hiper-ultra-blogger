module.exports = (sequelize, dataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: dataTypes.UUID,
      primaryKey: true,
      defaultValue: dataTypes.UUIDV4
    },
    username: {
      type: dataTypes.STRING,
      required: true,
      unique: true
    },
    password: {
      type: dataTypes.STRING,
      required: true
    },
  }, {
    tableName: 'user',
    timestamps: true
  });
  return User;
}