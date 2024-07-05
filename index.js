import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import connectDB from "./_db.js"; // Corrected the import statement
import { typeDefs } from "./schema.js";

const resolvers = {
  Query: {
    async games() {
      const db = await connectDB();
      return db.collection("games").find().toArray();
    },
    async game(_, args) {
      const db = await connectDB();
      return db.collection("games").findOne({ id: args.id });
    },
    async authors() {
      const db = await connectDB();
      return db.collection("authors").find().toArray();
    },
    async author(_, args) {
      const db = await connectDB();
      return db.collection("authors").findOne({ id: args.id });
    },
    async reviews() {
      const db = await connectDB();
      return db.collection("reviews").find().toArray();
    },
    async review(_, args) {
      const db = await connectDB();
      return db.collection("reviews").findOne({ id: args.id });
    },
  },
  Game: {
    async reviews(parent) {
      const db = await connectDB();
      return db.collection("reviews").find({ game_id: parent.id }).toArray();
    },
  },
  Author: {
    async reviews(parent) {
      const db = await connectDB();
      return db.collection("reviews").find({ author_id: parent.id }).toArray();
    },
  },
  Review: {
    async author(parent) {
      const db = await connectDB();
      return db.collection("authors").findOne({ id: parent.author_id });
    },
    async game(parent) {
      const db = await connectDB();
      return db.collection("games").findOne({ id: parent.game_id });
    },
  },
  Mutation: {
    async deleteGame(_, args) {
      const db = await connectDB();
      await db.collection("games").deleteOne({ id: args.id });
      return db.collection("games").find().toArray();
    },
    async addGame(_, args) {
      const db = await connectDB();
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 10000).toString(),
      };
      await db.collection("games").insertOne(game);
      return game;
    },
    async updateGame(_, args) {
      const db = await connectDB();
      await db
        .collection("games")
        .updateOne({ id: args.id }, { $set: args.edits });
      // update operation, $set operator to apply the edits provided in the args to the matching document.

      return db.collection("games").findOne({ id: args.id });
      // retrieves the updated document
    },
  },
};

// server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`Server ready at: ${url}`);
};

startServer();
