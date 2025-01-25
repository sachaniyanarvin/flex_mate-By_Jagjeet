const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
let db;

app.use(express.json());

(async function () {
  try {
    await client.connect();
    db = client.db("landingpaage");

    app.post("/projects", async (req, res) => {
      try {
        const result = await db.collection("projects").insertOne(req.body);
        res.json(result);
      } catch (error) {
        console.error("Error inserting document:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
    

    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
  } catch (err) {
    console.error(err);
  }
})();