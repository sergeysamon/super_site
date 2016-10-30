module.exports = function (sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
      title: DataTypes.STRING,
      text : DataTypes.TEXT
    }, {
      classMethods: {
        associate: function (models) {
          // example on how to add relations
          // Article.hasMany(models.Comments);
        }
      }
    }
  );
  return Post;
};
