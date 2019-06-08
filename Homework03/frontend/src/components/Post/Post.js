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
      <Card style={{ margin: '30px auto', width: '400px' }}>
        <CardHeader>{this.props.name}</CardHeader>
        <CardBody>
          <p>{this.props.posts.length} posts</p>
          <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>{this.state.collapse ? 'less' : 'more'}</Button>
          <Collapse isOpen={this.state.collapse}>
            {
              this.props.posts.map(post => (
                <Card style={{ margin: '30px auto', width: '100%' }}>
                  <CardHeader>{post.title}</CardHeader>
                  <CardBody>{post.body}</CardBody>
                  <CardFooter>
                    <span>{`3 Like`}</span>
                    <button>like</button>
                  </CardFooter>
                </Card>
              ))  
            }
          </Collapse>
        </CardBody>
      </Card>
    )
  }
}

export default Post
