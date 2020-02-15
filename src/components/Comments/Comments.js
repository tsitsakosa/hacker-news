import React, { Component } from 'react';
import { Row, Alert } from 'react-bootstrap';
import axios from '../../axiosRequests'


class Comments extends Component {

    state = {
        comments: [],
        error: false,
        isLoading: true,
        parent: this.props.parent
    }

    fetchComments = (item) => {

        if (item.kids) {

            let promises = [];
            item.kids.forEach(id => {
                debugger;
                promises.push(axios.get('/v0/item/' + id + '.json'));
            });

            return Promise.all(promises).then(results => {
                const comments = [];
                results.forEach(response => {
                    const data = response.data;
                    comments.push(data);
                    //console.debug(response.data);
                });
                item.kids = comments;

                item.kids.forEach(kid => {
                    
                    this.fetchComments(kid);
                    
                });
                //this.setState({ comments: comments, isLoading: false });
                // console.debug(this.state);
                //

            });
        }
        else {
            return true;
        }
        // else {
        //     this.setState({ comments: null, isLoading: false });
        // }

    }

    componentDidMount() {
        this.fetchComments(this.state.parent)
            .then(() => {
                console.debug("final call", this.state);
            });
    }

    render() {
        // let comments = {};
        // if (this.state.isLoading) {
        //     comments = <div>isLoading...</div>
        // }
        // else if (!this.state.error) {

        //     if (this.state.comments !== null) {
        //         comments = this.state.comments.map(comment => {
        //             //console.log("<---------COMMENT--------->", comment);

        //             return <li key={comment.id}><Comments parent={comment}/></li>;
        //         });
        //         comments = <ul>{comments}</ul>
        //     }
        // }
        // else {
        //     comments = <Alert variant="danger">Something went wrong! Try later..</Alert>;
        // }

        return (
            <React.Fragment>
                {/* {comments} */}
            </React.Fragment>
        );
    }

}

export default Comments;