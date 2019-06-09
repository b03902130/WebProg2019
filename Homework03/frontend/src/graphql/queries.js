import { gql } from 'apollo-boost'

export const POSTS_QUERY = gql`
  query {
    posts {
      id
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
`

export const USERS_QUERY = gql`
  query {
    users {
      id
      name
    }
  }
`
