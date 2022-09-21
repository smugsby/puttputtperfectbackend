const { AuthicationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { User } = require("../models");

const resolvers = {
    Query: {
        getAllUsers: async () => {
            return User.find({});

        },
        getUser: async (parent, arguement) => {
            return User.findOne({ arguement });

        },
        currentUser: async (parent, arguement, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id })
            }
            else {
                throw new AuthicationError("996")
            }
        }
    },
    //add mutations
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user)
            return { token, user };
        },
        addRound: async (parent, round, context) => {
            //debug
            console.log("add Round");
            if (context.user) {
                const roundAdd = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedRounds: round } }
                );
                return roundAdd;
            }
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            const token = signToken(user)
            return {
                token, user
            };
        },
        deleteRound: async (parent, { id }, context) => {
            if (context.user) {
                const roundGone = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedRound: { id } } }
                );
                return roundGone;
            }
        },
    }
}

module.exports = resolvers