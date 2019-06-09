import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import { Collapse, Button, Card, CardHeader, CardFooter, CardBody } from 'reactstrap'

import {
  UPDATE_POST_MUTATION,
} from '../../graphql'

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      collapse: false 
    };
  }

  toggle = () => {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  handleLike = (event) => {
    event.preventDefault()
    let postid = event.target.id
    this.updatePost({
      variables: {
        id: postid,
        like: 1,
      }
    })
  }

  render() {
    return (
      <div>
        <Card outline color='info' style={{ margin: '30px auto', width: '400px' }}>
          <CardHeader>{this.props.post.title}</CardHeader>
          <CardBody>
            <p>{this.props.post.body}</p>
          </CardBody>
          <CardFooter>
            <Mutation mutation={UPDATE_POST_MUTATION}>
              {
                updatePost => {
                  this.updatePost = updatePost
                  return <Button id={this.props.post.id} style={{marginRight: '15px'}} size='sm' color='primary' onClick={this.handleLike}>Like</Button>
                }
              }
            </Mutation>
            {
              this.props.post.comments.length > 0 && 
                <Button style={{marginRight: '15px'}} size='sm' color='info' onClick={this.toggle}>{this.state.collapse ? 'hide comments' : 'show comments'}</Button>
            }
            <span style={{display: 'inline-box'}}>{this.props.post.comments.length} comments, {this.props.post.like} like</span>
          </CardFooter>
        </Card>
        <Collapse isOpen={this.state.collapse}>
          {
            this.props.post.comments.map(comment => (
              <Card style={{ margin: '0px auto', width: '400px' }}>
                <CardBody>{comment.text}</CardBody>
                <CardFooter>
                  <span>{comment.author.name}</span>
                </CardFooter>
              </Card>
            ))  
          }
        </Collapse>
      </div>
    )
  }
}

export default Post
