const { gql } = require("apollo-server-express");

const typeDefs = gql `
type User {
    _id: ID 
    username: String
    email: String
    savedRounds: [Round] 
}
type Round {
    distance: String
    puttsMade:  String
    firstIn: Boolean
    lastIn: Boolean
    allMade: Boolean
    roundId: String
}
type Auth{
    token: ID!
    user: User
}
type Query{
    getAllUsers: [User]
    getUser(_id: String, username: String): User
    currentUser: User
}
type Mutation{
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addRound(distance: String!, puttsMade: String, firstIn: Boolean, lastIn: Boolean, allMade: Boolean, roundId: String!): User
    deleteRound(roundId: String): User
}
    `
module.exports = typeDefs;

