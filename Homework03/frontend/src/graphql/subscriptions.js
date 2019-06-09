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
        comments {
          text
          author {
            name
          }
        }
        like
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
