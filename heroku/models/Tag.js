module.exports = (sequelize, dataTypes) => {
  const Tag = sequelize.define("Tag", {
    id: {
      type: dataTypes.UUID,
      primaryKey: true,
      defaultValue: dataTypes.UUIDV4
    },
    name: {
      // primaryKey: true,
      type: dataTypes.STRING,
    }
  }, {
    // tableName: 'tag',
    timestamps: false
  });
  return Tag;
}