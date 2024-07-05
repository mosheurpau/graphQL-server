# GraphQL Server

This is a GraphQL server built using Apollo Server. The server provides an API for managing games, reviews, and authors.

## Live API

You can access the live GraphQL API at: [https://graphql-server-dph9.onrender.com/](https://graphql-server-dph9.onrender.com/)

## Features

- **Query games, authors, and reviews**: Fetch data on games, authors, and reviews.
- **Add new games**: Add new games to the database.
- **Delete games**: Delete games from the database.
- **Update game details**: Update details of existing games.

## Queries

- games: Returns a list of all games.
- game(id: ID!): Returns a single game by ID.
- authors: Returns a list of all authors.
- author(id: ID!): Returns a single author by ID.
- reviews: Returns a list of all reviews.
- review(id: ID!): Returns a single review by ID.

## Mutations

- addGame(game: AddGameInput!): Adds a new game.
- deleteGame(id: ID!): Deletes a game by ID.
- updateGame(id: ID!, edits: EditGameInput!): Updates a game by ID.

## Resolver functions for Game, Author, and Review in your GraphQL server:

- The Game type resolver defines how to fetch related reviews for a given game.
- The Author type resolver defines how to fetch related reviews for a given author.
- The Review type resolver defines how to fetch the related author and game for a given review.

## Example Queries and Mutations

- Query: Fetch All Games
  {
  games {
  id
  title
  platform
  }
  }

- Query: Fetch a Single Game by ID
  {
  game(id: "1") {
  id
  title
  platform
  reviews {
  id
  content
  rating
  }
  }
  }

- Mutation: Add a New Game
  mutation {
  addGame(game: { title: "New Game", platform: ["PC", "PS5"] }) {
  id
  title
  platform
  }
  }

- Mutation: Update an Existing Game
  mutation {
  updateGame(id: "1", edits: { title: "Updated Game Title" }) {
  id
  title
  platform
  }
  }

- Mutation: Delete a Game
  mutation {
  deleteGame(id: "1") {
  id
  title
  platform
  }
  }
