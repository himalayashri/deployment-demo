const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

dotenv.config();

mongoose
  .connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoDB is connected...");
  })
  .catch((err) => {
    console.error("Could not connect to mongoDB", err);
  });

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("user", userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const users = [
  {
    username: "shree",
    password: "shree123",
  },
];

app.get("/signup", (req, res) => {
  res.send(`
  <style>
      form {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        flex-direction: column;
      }
      input {
        width: 300px;
        margin: 10px;
        padding: 20px;
        font-size: 20px;
        border-radius: 5px;
      }
      button {
        font-size: 20px;
        margin: 10px;
        padding: 10px 30px;
        cursor: pointer;
        background-color: rgb(134, 134, 197);
        border-radius: 5px;
      }
    </style>
  <form action="/signup" method="post">
  <input id="username" type="text" placeholder="put username" name="username" />
  <input id="password" type="password" placeholder="put password" name="password" />
  <button id="submit" type="submit">Sign Up</button>
</form>
  `);
});

app.post("/signup", async (req, res) => {
  let item = req.body;

  if (!item.username) {
    return res.send(`<h2 id="error">Username is required</h2>`);
  }
  if (!item.password) {
    return res.send(`<h2 id="error">Password is required</h2>`);
  }
  users.push(item);
  res.send(`<h2 id="success">User signed Up successfully!!</h2>`);

  const user = new User({
    username: item.username,
    password: item.password,
  });

  try {
    await user.save();
  } catch (error) {
    console.error(error);
    return res.send(`<h2>Something went wrong, Please try later!</h2>`);
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;

// jest is used for unit and integration testing
// puppeteer is used for end-to-end testing
// jest-puppeteer is used for work with both of them in combine
