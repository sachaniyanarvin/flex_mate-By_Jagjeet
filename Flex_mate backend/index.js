const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();
const port = 3000;
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
let db;

app.use(cors());
app.use(express.json());

(async function () {
  try {
    await client.connect();
    db = client.db("test");

    // Existing endpoints (unchanged)
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
        res.status(500).json({ error: "An error occurred while fetching projects." });
      }
    });

    app.get('/portfolio/:id', async (req, res) => {
      try {
        const projectId = req.params.id;
        if (!ObjectId.isValid(projectId)) {
          return res.status(400).json({ message: 'Invalid project ID' });
        }
        const objectId = new ObjectId(projectId);
        const project = await db.collection("portfolio").findOne({ _id: objectId });
        if (!project) {
          return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
      } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ message: 'Internal server error' });
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
        res.status(500).json({ error: "An error occurred while fetching portfolio." });
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

    app.post("/resume", async (req, res) => {
      try {
        console.log("Request Body", req.body);
        console.log("Inserting into Collection: resume");
        const result = await db.collection("resume").insertOne(req.body);
        res.json(result);
      } catch (error) {
        console.error("Error inserting document:", error);
        res.status(500).json({ error: "Internal Server Error" });
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
        res.status(500).json({ error: "An error occurred while fetching resumes." });
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

    app.post("/feedback", async (req, res) => {
      try {
        console.log("Request Body", req.body);
        console.log("Inserting into collection: feedback");
        const result = await db.collection("feedback").insertOne(req.body);
        res.json(result);
      } catch (error) {
        console.error("Error inserting document:", error);
        res.status(500).json({ error: "Internal Server Error" });
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
        res.status(500).json({ error: "An error occurred while fetching feedback." });
      }
    });

    app.delete("/feedback/:id", async (req, res) => {
      try {
        const result = await db.collection("feedback").deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) {
          return res.status(404).json({ error: "Feedback not found" });
        }
        res.json({ message: "Feedback deleted successfully" });
      } catch (error) {
        console.error("Error deleting document:", error);
        res.status(500).json({ error: "Internal Server Error" });
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

    app.post("/profiles", async (req, res) => {
      try {
        const { profilePhoto, name, location, categories, images } = req.body;
        if (!name || !location || !categories || !Array.isArray(categories) || categories.length === 0) {
          return res.status(400).json({ error: "Name, location, and at least one category are required" });
        }
        const result = await db.collection("profiles").insertOne({
          profilePhoto,
          name,
          location,
          categories,
          images,
        });
        res.json(result);
      } catch (error) {
        console.error("Error inserting document:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/profiles", async (req, res) => {
      try {
        const userId = req.query.userId;
        const filter = userId ? { userId: userId } : {};
        const users = await db.collection("profiles").find(filter).toArray();
        res.json(users);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching profiles." });
      }
    });

    app.get("/profiles/:category?", async (req, res) => {
      try {
        const { category } = req.params;
        const filter = category ? { categories: { $in: [category] } } : {};
        const profiles = await db.collection("profiles").find(filter).toArray();
        res.json(profiles);
      } catch (error) {
        console.error("Error fetching profiles:", error);
        res.status(500).json({ error: "An error occurred while fetching profiles." });
      }
    });

    // New endpoint: Get messages between two users
    app.get("/messages", async (req, res) => {
      try {
        const userId1 = req.query.userId1; // Current user's ID
        const userId2 = req.query.userId2; // Selected user's ID
        if (!userId1 || !userId2) {
          return res.status(400).json({ error: "Both userId1 and userId2 are required" });
        }
        const messages = await db.collection("messages").find({
          $or: [
            { senderId: userId1, receiverId: userId2 },
            { senderId: userId2, receiverId: userId1 }
          ]
        }).sort({ timestamp: 1 }).toArray();
        res.json(messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // New endpoint: Send a new message
    app.post("/messages", async (req, res) => {
      try {
        const { senderId, receiverId, text } = req.body;
        if (!senderId || !receiverId || !text) {
          return res.status(400).json({ error: "senderId, receiverId, and text are required" });
        }
        const message = {
          senderId,
          receiverId,
          text,
          timestamp: new Date()
        };
        const result = await db.collection("messages").insertOne(message);
        const insertedMessage = await db.collection("messages").findOne({ _id: result.insertedId });
        res.json(insertedMessage);
      } catch (error) {
        console.error("Error inserting message:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
  } catch (err) {
    console.error(err);
  }
})();