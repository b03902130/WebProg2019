import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import {
  POSTS_QUERY,
  USERS_QUERY,
  CREATE_POST_MUTATION,
  CREATE_USER_MUTATION,
  POSTS_SUBSCRIPTION,
  USERS_SUBSCRIPTION,
} from '../../graphql'
import Author from '../../components/Author/Author'
import classes from './App.module.css'

let unsubscribe = null
let unsubscribe_user = null

class App extends Component {
  state = {
    formTitle: '',
    formBody: '',
    formAuthorName: 'Select Author',
    formAuthorId: '',
    
    inputName: '',
    inputEmail: '',

    dropdownOpen: false
  }

  handleFormSubmit = e => {
    e.preventDefault()

    const { formTitle, formBody, formAuthorId } = this.state

    if (!formTitle || !formBody || !formAuthorId) return

    this.createPost({
      variables: {
        title: formTitle,
        body: formBody,
        published: true,
        authorId: formAuthorId,
      }
    })

    this.setState({
      formTitle: '',
      formBody: '',
      formAuthorId: '',
      formAuthorName: 'Select Author'
    })
  }
  
  toggle = (err) => {
    if ('dropdown-item' === err.target.className) {
      let name = err.target.innerText
      let id = err.target.id
      this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen,
        formAuthorName: name,
        formAuthorId: id,
      }));
    }
    else {
      this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen,
      }));
    }
  }

  change = (e, select) => {
    let value = e.target.value
    this.setState(state => {
      state[select] = value
      return state
    })
  }

  addUser = e => {
    e.preventDefault()
    let {inputName, inputEmail} = this.state
    this.createUser({
      variables: {
        name: inputName,
        email: inputEmail,
      }
    }).catch(err => {
      alert(err.message)
    })
    this.setState({
      inputName: '',
      inputEmail: '',
    })
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1 className={classes.title}>Modern GraphQL Tutorial</h1>
          </Col>
        </Row>
        <Row>
          <Col xs="6" className={classes.form}>
            <h3 style={{marginBottom: '30px'}}>Regist new user</h3>
            <Mutation mutation={CREATE_USER_MUTATION}>
              {
                createUser => {
                  this.createUser = createUser
                  return (
                    <Form inline>
                      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="new-name" className="mr-sm-2">Name</Label>
                        <Input name="name" id="new-name" value={this.state.inputName} onChange={e => {this.change(e, 'inputName')}} />
                      </FormGroup>
                      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="new-email" className="mr-sm-2">Email</Label>
                        <Input name="email" id="new-email" value={this.state.inputEmail} onChange={e => {this.change(e, 'inputEmail')}} />
                      </FormGroup>
                      <Button onClick={this.addUser}>Submit</Button>
                    </Form>
                  )  
                }
              }
            </Mutation>
            <h3 style={{marginTop: '30px'}}>Create new post</h3>
            <Mutation mutation={CREATE_POST_MUTATION}>
              {createPost => {
                this.createPost = createPost

                return (
                  <Form onSubmit={this.handleFormSubmit}>
                    <Query query={USERS_QUERY}>
                      {({ loading, error, data, subscribeToMore }) => {
                        if (loading) return <p>Loading...</p>
                        if (error) return <p>Error :(((</p>

                        const users = (
                          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle id='toggle_button' caret>
                              {this.state.formAuthorName}
                            </DropdownToggle>
                            <DropdownMenu>
                            {
                              data.users.map((user, id) => (
                                <DropdownItem id={user.id} key={user.id}>{user.name}</DropdownItem>
                              ))
                            }
                            </DropdownMenu>
                          </Dropdown>
                        )
                        if (!unsubscribe_user)
                          unsubscribe_user = subscribeToMore({
                            document: USERS_SUBSCRIPTION,
                            updateQuery: (prev, { subscriptionData }) => {
                              if (!subscriptionData.data) return prev
                              const newUser = subscriptionData.data.user.data

                              return {
                                ...prev,
                                users: [newUser, ...prev.users]
                              }
                            }
                          })

                        return <div style={{margin: '30px 0'}}>{users}</div>
                      }}
                    </Query>
                    <FormGroup row>
                      <Label for="title" sm={2}>
                        Title
                      </Label>
                      <Col sm={10}>
                        <Input
                          name="title"
                          value={this.state.formTitle}
                          id="title"
                          placeholder="Post title..."
                          onChange={e =>
                            this.setState({ formTitle: e.target.value })
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Label for="body">Body</Label>
                      <Input
                        type="textarea"
                        name="body"
                        value={this.state.formBody}
                        id="body"
                        placeholder="Post body..."
                        onChange={e =>
                          this.setState({ formBody: e.target.value })
                        }
                      />
                    </FormGroup>
                    <Button type="submit" color="primary">
                      Post!
                    </Button>
                  </Form>
                )
              }}
            </Mutation>
          </Col>
          <Col xs="6">
            <Query query={POSTS_QUERY}>
              {({ loading, error, data, subscribeToMore }) => {
                if (loading) return <p>Loading...</p>
                if (error) return <p>Error :(((</p>
                
                let posts = data.posts
                let authors = {}
                for (let post of posts) {
                  let authorname = post.author.name
                  if (authorname in authors) {
                    authors[authorname].push(post)
                  }
                  else {
                    authors[authorname] = [post]
                  }
                }

                let author_cards = Object.keys(authors).map((name) => (
                  <Author name={name} posts={authors[name]} />
                ))
                if (!unsubscribe)
                  unsubscribe = subscribeToMore({
                    document: POSTS_SUBSCRIPTION,
                    updateQuery: (prev, { subscriptionData }) => {
                      if (!subscriptionData.data) return prev
                      const newPost = subscriptionData.data.post.data
                      const mutation = subscriptionData.data.post.mutation
                      if (mutation === 'CREATED') {
                        return {
                          ...prev,
                          posts: [newPost, ...prev.posts]
                        }
                      }
                      else if (mutation === 'UPDATED') {
                        let postRef = prev.posts.find(post => post.id === newPost.id)
                        for (let key in newPost) {
                          postRef[key] = newPost[key]
                        }
                        return {
                          ...prev,
                          posts: prev.posts
                        }
                      }
                    }
                  })

                return <div>{author_cards}</div>
              }}
            </Query>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App
