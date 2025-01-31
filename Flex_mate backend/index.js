const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;
const uri = "mongodb+srv://jagjeetdangarcg:jag1917jeet@cluster0.nq7xw.mongodb.net/";
const client = new MongoClient(uri);
const { ObjectId } = require("mongodb");
let db;

app.use(express.json());

(async function () {
  try {
    await client.connect();
    db = client.db("test");

    app.post("/projects", async (req, res) => {
      try {
        const result = await db.collection("projects").insertOne(req.body);
        res.json(result);
      } catch (error) {
        console.error("Error inserting document:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/projects", async (req, res) => {
      try {
        const userId = req.query.userId; 
        const filter = userId ? { userId: userId } : {}; 
        const users = await db.collection("projects").find(filter).toArray(); 
        res.json(users); 
      } catch (error) {
        console.error(error); 
        res.status(500).json({ error: "An error occurred while fetching likes." });
      }
    });

    app.patch("/projects/:id", async (req, res) => {
      try {
        const projectId = req.params.id; 
        const updateData = req.body; 
        const result = await db.collection("projects").updateOne(
          { _id: new ObjectId(projectId) }, 
          { $set: updateData } 
        );
        if (result.matchedCount === 0) {
          return res.status(404).json({ error: "Project not found" });
        }
        res.json(result);
      } catch (error) {
        console.error("Error updating document:", error);
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

app.get("/portfolio", async (req, res) => {
  try {
    const userId = req.query.userId; 
    const filter = userId ? { userId: userId } : {}; 
    const users = await db.collection("portfolio").find(filter).toArray(); 
    res.json(users); 
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: "An error occurred while fetching likes." });
  }
});

app.patch("/portfolio/:id", async (req, res) => {
  try {
    const portfolioId = req.params.id; 
    const updateData = req.body; 
    console.log("Request Body:", req.body);
    console.log("Updating Document in Collection: portfolio");
    const result = await db.collection("portfolio").updateOne(
      { _id: new ObjectId(portfolioId) }, 
      { $set: updateData }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Portfolio item not found" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error updating document:", error);
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

app.get("/resume", async (req, res) => {
  try {
    const userId = req.query.userId; 
    const filter = userId ? { userId: userId } : {}; 
    const users = await db.collection("resume").find(filter).toArray(); 
    res.json(users); 
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: "An error occurred while fetching likes." });
  }
});

app.patch("/resume/:id", async (req, res) => {
  try {
    const resumeId = req.params.id;
    const updateData = req.body;
    console.log("Request Body:", req.body); 
    console.log("Updating Document in Collection: resume");
    const result = await db.collection("resume").updateOne(
      { _id: new ObjectId(resumeId) }, 
      { $set: updateData }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Resume item not found" });
    }
    res.json(result); 
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/feedback", async (req,res) => {
  try{
    console.log("Request Body",req.body);
    console.log("Inserting into collection: feedback");

    const result = await db.collection("feedback").insertOne(req.body);
    res.json(result);
  } catch(error){
    console.error("Error inserting document:",error);
    res.status(500).json({error:"Internal server error"});
  }
});

app.get("/feedback", async (req, res) => {
  try {
    const userId = req.query.userId; 
    const filter = userId ? { userId: userId } : {}; 
    const users = await db.collection("feedback").find(filter).toArray(); 
    res.json(users); 
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: "An error occurred while fetching likes." });
  }
});

app.patch("/feedback/:id", async (req, res) => {
  try {
    console.log("Request Body", req.body);
    console.log("Updating document in collection: feedback");

    const { id } = req.params;
    const updateData = req.body;

    const result = await db.collection("feedback").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/projects/:id", async (req, res) => {
  try {
    const result = await db.collection("projects").deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/portfolio/:id", async (req, res) => {
  try {
    console.log("Deleting document from collection: portfolio");

    const result = await db.collection("portfolio").deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Portfolio entry not found" });
    }

    res.json({ message: "Portfolio entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/resume/:id", async (req, res) => {
  try {
    console.log("Deleting document from collection: resume");

    const result = await db.collection("resume").deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Resume entry not found" });
    }

    res.json({ message: "Resume entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/feedback/:id", async (req, res) => {
  try {
    console.log("Deleting document from collection: feedback");

    const result = await db.collection("feedback").deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Feedback entry not found" });
    }

    res.json({ message: "Feedback entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
  } catch (err) {
    console.error(err);
  }
})();