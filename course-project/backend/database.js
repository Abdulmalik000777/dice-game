const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "course_project_db",
  "your_username",
  "your_password",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
