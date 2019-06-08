import { gql } from 'apollo-boost'

export const POSTS_SUBSCRIPTION = gql`
  subscription {
    post {
      mutation
      data {
        title
        body
        author {
          name
        }
        published
      }
    }
  }
`

export const USERS_SUBSCRIPTION = gql`
  subscription {
    user {
      mutation
      data {
        id
        name
      }
    }
  }
`
