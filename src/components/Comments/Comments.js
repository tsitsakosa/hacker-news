import React, { Component } from 'react';
import {  Alert } from 'react-bootstrap';
import axios from '../../axiosRequests'
import CommentList from './CommentList'

class Comments extends Component {

    //descendants counter
    counter = 1;

    state = {
        error: false,
        isLoading: true,
        story: this.props.parent,
    }

    fetchComments = (comment, descendants) => {
        if (comment.kids) {
            let promises = []
            comment.kids.forEach(kid => {
                let axiosPromise = axios.get('/v0/item/' + kid + '.json');
                promises.push(axiosPromise);

                //Last request should be track
                if (this.counter === descendants) {
                    axiosPromise.then(() => {
                        // Data fetched ready to be rendered
                        this.setState({ isLoading: false });
                        console.debug("Comments fetched", this.state.story);
                    });
                }
                this.counter++;
            });

            Promise.all(promises)
                .then(results => {
                    const comments = [];
                    results.forEach(response => {
                        const data = response.data;
                        comments.push({ id: data.id, commentData: data });
                    });
                    comment.comments = comments;


                    comment.comments.forEach(item => {
                        this.fetchComments(item.commentData, descendants);
                    });
                })
                .catch(error => {
                    this.setState({ error: true });
                });;
        }
    }

    componentDidMount() {
        // Fetch whole story with comments
        if (this.state.story.descendants > 0) {
            const topParent = this.state.story;
            const descendants = this.state.story.descendants;
            this.counter = 1;
            this.fetchComments(topParent, descendants);
        }
    }

    render() {
        let comments = {};
        if (this.state.isLoading) {
            comments = <div>isLoading...</div>
        }
        else {
            if (!this.state.error) {
                // console.debug("lololoolo", this.state.story['comments']);
                //debugger;
                const story = this.state.story
                if (story['comments']) {
                    comments = <CommentList data={story['comments']} />
                }
                else {
                    comments = <div>Comment first!</div>
                }
            }
            else {
                comments = <Alert variant="danger">Something went wrong! Try later..</Alert>;
            }
        }

        return (
            <React.Fragment>
                {comments}
            </React.Fragment>
        );
    }

}

export default Comments;