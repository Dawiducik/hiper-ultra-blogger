module.exports = (sequelize, dataTypes) => {
  const Post = sequelize.define("Post", {
    id: {
      type: dataTypes.UUID,
      primaryKey: true,
      defaultValue: dataTypes.UUIDV4
    },
    title: {
      type: dataTypes.STRING,
      required: true
    },
    body: {
      type: dataTypes.STRING(2500),
      required: true
    },
    friendlyUrl: {
      type: dataTypes.STRING,
      required: true,
      unique: true
    }
  }, {
    tableName: 'post',
    timestamps: true
  });
  return Post;
}