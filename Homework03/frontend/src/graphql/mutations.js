import { gql } from 'apollo-boost'

export const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $title: String!
    $body: String!
    $published: Boolean!
    $authorId: ID!
  ) {
    createPost(
      data: {
        title: $title
        body: $body
        published: $published
        author: $authorId
      }
    ) {
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

export const UPDATE_POST_MUTATION = gql`
  mutation updatePost(
    $id: ID!
    $like: Int!
  ) {
    updatePost(
      id: $id
      data: {
        like: $like
      }
    ) {
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

export const CREATE_USER_MUTATION = gql`
  mutation createUser(
    $name: String!
    $email: String!
  ) {
    createUser(
      data: {
        name: $name
        email: $email
      }
    ) {
      id
      name
    }
  }
`
