const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const { ObjectId } = require("mongodb");
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
    
    app.get("/likes", async (req, res) => {
      try {
        const userId = req.query.userId; 
        const filter = userId ? { userId: userId } : {}; 
        const users = await db.collection("likes").find(filter).toArray(); 
        res.json(users); 
      } catch (error) {
        console.error(error); 
        res.status(500).json({ error: "An error occurred while fetching likes." });
      }
    });

    

app.patch("/projects/:id/like", async (req, res) => {
  try {
    const projectId = req.params.id; 
    const incrementValue = req.body.increment || 1; 
    const result = await db.collection("likes").updateOne(
      { _id: new ObjectId(projectId) },
      { $inc: { likes: incrementValue } },
      { upsert: true } 
    );

    res.json({ message: "Like added successfully", result });
  } catch (error) {
    console.error("Error updating likes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/portfolio", async (req, res) => {
  try {
    console.log("Request Body:", req.body); 
    console.log("Inserting into Collection: portfolio"); 

    const result = await db.collection("portfolio").insertOne(req.body);
    res.json(result);
  } catch (error) {
    console.error("Error inserting document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/resume", async (req,res) => {
  try{
    console.log("Request Body", req.body);
    console.log("Inserting into Collection: resume");

    const result = await db.collection("resume").insertOne(req.body);
    res.json(result);
  } catch(error){
    console.error("Error insreting document:",error);
    res.status(500).json({error:"Internal server error"});
  }
});


    
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
  } catch (err) {
    console.error(err);
  }
})();