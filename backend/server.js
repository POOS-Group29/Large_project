const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const url =
  "mongodb+srv://COP4331_29:COP4331@cop4331-29.fxkjmbg.mongodb.net/?retryWrites=true&w=majority&appName=COP4331-29";
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(url);
client.connect(console.log("mongodb connected"));

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/addUser", async (req, res) => {
  const { username, password, email, favSpot, visitedSpots } = req.body;

  try {
    const client = await connectToMongoDB();
    const db = client.db();
    const usersCollection = db.collection("Users");

    const newUser = {
      username,
      password,
      email,
      favSpot,
      visitedSpots
    };

    const result = await usersCollection.insertOne(newUser);

    res.status(201).json({ message: "User added successfully", userId: result.insertedId });
  } catch (error) {
    console.error("Failed to add user", error);
    res.status(500).json({ message: "Failed to add user" });
  } finally {
    client.close();
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const client = await connectToMongoDB();
    const db = client.db();
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ username, password });

    if (user) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Failed to authenticate user", error);
    res.status(500).json({ message: "Failed to authenticate user" });
  } finally {
    client.close();
  }
});

app.listen(3000);
