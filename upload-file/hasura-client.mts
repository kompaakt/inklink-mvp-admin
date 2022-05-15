import { GraphQLClient } from 'graphql-request'

const graphql_host = `http://${process.env.HOST}/hasura/v1/graphql`
const hasuraAccessKey = process.env.HASURA_GRAPHQL_ADMIN_SECRET

export const hasuraClient = new GraphQLClient(graphql_host, {
    headers: { 'x-hasura-admin-secret': hasuraAccessKey }
})


