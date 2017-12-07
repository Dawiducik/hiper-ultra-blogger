module.exports = (sequelize, dataTypes) => {
  const Profile = sequelize.define("Profile", {
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
    timestamps: true
  });
  return Profile;
}