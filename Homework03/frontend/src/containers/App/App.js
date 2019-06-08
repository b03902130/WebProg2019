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
  POSTS_SUBSCRIPTION
} from '../../graphql'
import Post from '../../components/Post/Post'
import classes from './App.module.css'

let unsubscribe = null
let unsubscribe_user = null

class App extends Component {
  state = {
    formTitle: '',
    formBody: '',
    formAuthorName: 'Select Author',
    formAuthorId: '',

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
        authorId: parseInt(formAuthorId),
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
    if (err.target.id !== 'toggle_button') {
      let name = err.target.innerHTML
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
            <Mutation mutation={CREATE_POST_MUTATION}>
              {createPost => {
                this.createPost = createPost

                return (
                  <Form onSubmit={this.handleFormSubmit}>
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
                                <DropdownItem id={user.id}>{user.name}</DropdownItem>
                              ))
                            }
                            </DropdownMenu>
                          </Dropdown>
                        )
                        {/* if (!unsubscribe) */}
                        {/*   unsubscribe = subscribeToMore({ */}
                        {/*     document: POSTS_SUBSCRIPTION, */}
                        {/*     updateQuery: (prev, { subscriptionData }) => { */}
                        {/*       if (!subscriptionData.data) return prev */}
                        {/*       const newPost = subscriptionData.data.post.data */}

                        {/*       return { */}
                        {/*         ...prev, */}
                        {/*         posts: [newPost, ...prev.posts] */}
                        {/*       } */}
                        {/*     } */}
                        {/*   }) */}

                        return <div>{users}</div>
                      }}
                    </Query>
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

                const posts = data.posts.map((post, id) => (
                  <Post data={post} key={id} />
                ))
                if (!unsubscribe)
                  unsubscribe = subscribeToMore({
                    document: POSTS_SUBSCRIPTION,
                    updateQuery: (prev, { subscriptionData }) => {
                      if (!subscriptionData.data) return prev
                      const newPost = subscriptionData.data.post.data

                      return {
                        ...prev,
                        posts: [newPost, ...prev.posts]
                      }
                    }
                  })

                return <div>{posts}</div>
              }}
            </Query>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App
