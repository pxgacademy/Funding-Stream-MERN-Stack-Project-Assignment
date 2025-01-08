const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.toicd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// const uri = `mongodb://localhost:27017`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const userCollection = client.db("FundingStreamDB").collection("users");
    const campaignCollection = client
      .db("FundingStreamDB")
      .collection("campaigns");
    const userPerkCollection = client
      .db("FundingStreamDB")
      .collection("userPerks");

    // User DB
    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await userCollection.findOne(query);
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const newUser = req.body;
      const result = await userCollection.insertOne(newUser);
      res.status(201).send(result);
    });

    app.put("/goggle-users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const updatedInfo = req.body;
      const reqToUpdate = {
        $set: updatedInfo,
      };
      const options = { upsert: true };
      const result = await userCollection.updateOne(
        query,
        reqToUpdate,
        options
      );
      res.send(result);
    });

    app.put("/update-profile/:id", async (req, res) => {
      const userId = req.params.id;
      const updatedInfo = req.body;
      const query = { _id: new ObjectId(userId) };
      const reqToUpdate = {
        $set: updatedInfo,
      };
      const result = await userCollection.updateOne(query, reqToUpdate);
      res.send(result);
    });

    app.patch("/users", async (req, res) => {
      const updatedInfo = req.body;
      email = updatedInfo?.email;
      lastSignInTime = updatedInfo?.lastSignInTime;
      const query = { email };
      const reqToUpdate = {
        $set: {
          lastSignInTime,
        },
      };
      const result = await userCollection.updateOne(query, reqToUpdate);
      res.send(result);
    });

    // Campaign DB

    const date = new Date();
    function formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    app.get("/campaigns/running", async (req, res) => {
      try {
        const currentDate = formatDate(date);
        const runningCampaigns = await campaignCollection
          .find({ campaignEndDate: { $gt: currentDate } })
          .sort({ campaignEndDate: 1 })
          .limit(6)
          .toArray();
        res.send(runningCampaigns);
      } catch (error) {
        res.status(500).send("Failed to fetch running campaigns");
      }
    });

    app.get("/campaigns/:id", async (req, res) => {
      const id = req.params.id;
      const query = { campaignCategoryId: id };
      let result = "Campaign not found";
      if (id === "all") {
        result = await campaignCollection.find().toArray();
      } else result = await campaignCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/sorting-campaigns/:id", async (req, res) => {
      const id = req.params.id;
      const query = { campaignCategoryId: id };
      let result = "Campaign not found";
      if (id === "all") {
        result = await campaignCollection
          .find()
          .sort({ campaignGoal: 1 })
          .toArray();
      } else
        result = await campaignCollection
          .find(query)
          .sort({ campaignGoal: 1 })
          .toArray();
      res.send(result);
    });

    app.get("/campaign-details/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await campaignCollection.findOne(query);
      res.send(result);
    });

    app.post("/campaigns", async (req, res) => {
      const newCampaign = req.body;
      const result = await campaignCollection.insertOne(newCampaign);
      res.send(result);
    });

    app.put("/campaign-update/:id", async (req, res) => {
      const id = req.params.id;
      const updatedInfo = req.body;
      const query = { _id: new ObjectId(id) };
      const result = await campaignCollection.updateOne(query, {
        $set: updatedInfo,
      });
      res.send(result);
    });

    app.patch("/campaign-update-backers/:id", async (req, res) => {
      const id = req.params.id;
      const updatedInfo = req.body;
      const query = { _id: new ObjectId(id) };
      const result = await campaignCollection.updateOne(query, {
        $inc: updatedInfo,
      });
      res.send(result);
    });

    app.delete("/delete-campaign/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await campaignCollection.deleteOne(query);
      res.send(result);
    });

    // user perks

    app.get("/my-donations/:email", async (req, res) => {
      const email = req.params.email;
      const query = { clientEmail: email };
      result = await userPerkCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/my-campaigns/:email", async (req, res) => {
      const email = req.params.email;
      const query = { creatorEmail: email };
      result = await campaignCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/my-donation-campaign/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      result = await campaignCollection.findOne(query);
      res.send(result);
    });

    app.post("/user-perks", async (req, res) => {
      const newCampaign = req.body;
      const result = await userPerkCollection.insertOne(newCampaign);
      res.send(result);
    });

    app.put("/update-perks/:id", async (req, res) => {
      const id = req.params.id;
      const updatedInfo = req.body;
      const query = { _id: new ObjectId(id) };
      const result = await userPerkCollection.updateOne(query, {
        $set: updatedInfo,
      });
      res.send(result);
    });

    app.delete("/delete-donation/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userPerkCollection.deleteOne(query);
      res.send(result);
    });

    //
  } finally {
  }
}
run().catch(console.dir);

//

app.get("/", (req, res) => {
  res.send("The server is successfully running!");
});

app.listen(port, () => {
  // console.log(`Server is running on port ${port}`);
});
