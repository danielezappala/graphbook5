const typeDefinitions = `
  directive @auth on QUERY | FIELD_DEFINITION | FIELD

  type User {
    id: Int
    avatar: String
    username: String
    firstName: String
    lastName: String
    fullName: String
    abbreviation: String
  }
  type File {
    filename: String!
    url: String!
  }
  scalar Date
  type MyType {
   created: Date
  }

  type Season {
    id: Int
    name: String!
    startDate: Date!
  }

  input UserInput {
    username: String!
    avatar: String!
  }

  type Response {
    success: Boolean
  }

  type UsersSearch {
    users: [User]
  }

  type Auth {
    token: String
  }
  
  type RootMutation {
    login (
      email: String!
      password: String!
    ): Auth
    signup (
      username: String!
      email: String!
      password: String!
    ): Auth
    addSeason (
      name: String!
      startDate: Date!
    ): Season
  }

  type RootQuery {
    usersSearch(page: Int, limit: Int, text: String!): UsersSearch 
    currentUser: User @auth
    season(id: ID!): Season 
    seasons: [Season]
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

export default [typeDefinitions];