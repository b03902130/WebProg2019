import React, { Component } from 'react';
import { Collapse, Button, Card, CardHeader, CardFooter, CardBody } from 'reactstrap'

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
  
  render() {
    return (
      <div>
        <Card outline color='info' style={{ margin: '30px auto', width: '400px' }}>
          <CardHeader>{this.props.post.title}</CardHeader>
          <CardBody>
            <p>{this.props.post.body}</p>
          </CardBody>
          <CardFooter>
            {
              this.props.post.comments.length > 0 && 
                <Button size='sm' color='info' onClick={this.toggle} style={{ marginBottom: '1rem' }}>{this.state.collapse ? 'hide comments' : 'show comments'}</Button>
            }
            <span style={{display: 'inline-box', marginLeft: '15px'}}>{this.props.post.comments.length} comments, {this.props.post.like} like</span>
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
