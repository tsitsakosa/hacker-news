import React, { Component } from 'react';
import { Row, Alert } from 'react-bootstrap';
import axios from '../../axiosRequests'


class Comments extends Component {

    state = {
        comments: [],
        error: false,
        isLoading: true,
        story: this.props.parent
    }

    counter = 0;

    fetchComments = (item, descendants) => {
        if (item.kids) {
            let promises = []
            item.kids.forEach(id => {
                const axiosPromise = axios.get('/v0/item/' + id + '.json');
                promises.push(axiosPromise);
                this.counter++;
                console.log("Counter!!!!", descendants, this.counter);
                //Last request
                
                if (this.counter == descendants) {
                    axiosPromise.then(() => {
                        console.log("Comments fetched", this.state);
                    });
                }
            });

            Promise.all(promises).then(results => {
                const comments = [];
                results.forEach(response => {
                    const data = response.data;
                    comments.push(data);
                    //console.debug(response.data);
                });
                item.kids = comments;

                item.kids.forEach(kid => {

                    this.fetchComments(kid, descendants);

                });
                //this.setState({ comments: comments, isLoading: false });
                // console.debug(this.state);
                //

            });
        }
        // else {
        //     this.setState({ comments: null, isLoading: false });
        // }

    }

    componentDidMount() {
        console.log(this.state);
        if (this.state.story.descendants > 0) {
            const topParent = this.state.story;
            const descendants = this.state.story.descendants;
            this.counter = 0;
            this.fetchComments(topParent, descendants);
        }


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