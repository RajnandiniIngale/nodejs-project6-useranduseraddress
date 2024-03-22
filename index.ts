import { PrismaClient } from "@prisma/client";
import express from "express";
import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import userResolver from "./resolvers/userResolver";

const prisma = new PrismaClient();
const app = express();


const schema = buildSchema(
    `
        type User{
            id: ID!
            name: String!
            email: String!
            address: [UserAddress]
        }
    

        type UserAddress{
            id: ID!
            userId : ID!
            street : String!
            city: String!
            state: String!
            country: String!
            pincode: String!
            user: User
        }


        input UserAddressInput{
            street: String!
            city: String!
            state: String!
            country: String!
            pincode: String!
        
        }


        type Query{
            getUser(id: ID!) : User
            getUsers: [User]
            getAddressById(id: ID!): UserAddress
            getAddressesByUserId(userId: ID!): [UserAddress]
            getAllAddresses: [UserAddress]
        }


        type Mutation{
            createUser(name: String!,email: String!) : User
            updateUser(id:ID!, name: String, email: String) : User
            deleteUser(id:ID!): User


            createUserAddress(userId: ID!, address: UserAddressInput!) : UserAddress
            deleteUserAddressByAddressId(id: ID!): UserAddress
            deleteUserAddressesByUserId(userId: ID!): [UserAddress]
        }
    
    `
)


const root = userResolver;


app.use('/graphql',graphqlHTTP({schema, rootValue: root, graphiql: true}))

const port = process.env.PORT || 4001

app.listen(port,()=>{
    console.log(`Server listening on http://localhost:${port}/graphql`)
})

