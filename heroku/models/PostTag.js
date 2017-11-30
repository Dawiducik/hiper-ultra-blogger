module.exports = (sequelize, dataTypes) => {
  const PostTags = sequelize.define("PostTags", {
    postId: {
      type: dataTypes.UUID,
      primaryKey: true,
    },
    tagName: {
      type: dataTypes.STRING,
      primaryKey: true,
    },

  }, {
    // tableName: 'post_tags',
    timestamps: false
  });
  return PostTags;
}