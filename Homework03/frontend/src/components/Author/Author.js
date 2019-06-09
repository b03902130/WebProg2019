import React, { Component } from 'react';
import { Collapse, Button, Card, CardHeader, CardBody } from 'reactstrap'
import Post from '../Post/Post'

class Author extends Component {
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
        <Card outline color='primary' style={{ margin: '30px auto', width: '400px' }}>
          <CardHeader>{this.props.name}</CardHeader>
          <CardBody>
            <p>{this.props.posts.length} posts</p>
            <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>{this.state.collapse ? 'hide posts' : 'show posts'}</Button>
          </CardBody>
        </Card>
        <Collapse isOpen={this.state.collapse}>
          {
            this.props.posts.map(post => (
              <Post post={post} />
            ))  
          }
        </Collapse>
      </div>
    )
  }
}

export default Author
