const User = require("./User");
const Template = require("./Template");
const Form = require("./Form");
const Comment = require("./Comment");
const Like = require("./Like");

User.hasMany(Template);
Template.belongsTo(User);

Template.hasMany(Form);
Form.belongsTo(Template);

Template.hasMany(Comment);
Comment.belongsTo(Template);

Form.hasMany(Comment);
Comment.belongsTo(Form);

User.hasMany(Comment);
Comment.belongsTo(User);

User.hasMany(Like);
Like.belongsTo(User);

Template.hasMany(Like);
Like.belongsTo(Template);

module.exports = { User, Template, Form, Comment, Like };
