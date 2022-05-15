const { GraphQLClient } = require('graphql-request')

const graphql_host = 'http://65.108.254.138:8080/v1/graphql'
const hasuraAccessKey = 'hello123'

const hasuraClient = new GraphQLClient(graphql_host, {
  headers: { 'x-hasura-admin-secret': hasuraAccessKey }
})


module.exports = {
  hasuraClient
}