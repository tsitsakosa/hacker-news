import React, { Component } from 'react';
import { Row, Alert } from 'react-bootstrap';


class Comments extends Component {
    
    state = {
        error: true,
    }

    componentDidMount() {
       
    }

    render() {
        let comments = <Alert variant="danger">Something went wrong! Try later..</Alert>;
       
       if (!this.state.error) {
        comments = this.state.currentArticles.map(article => {
                return <div>{this.props.text}</div>;
            });
           
        }

        return (
            <React.Fragment>
                {comments}
            </React.Fragment>
        );
    }

}

export default Comments;