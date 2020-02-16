import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import axios from '../../axiosRequests'
import CommentList from './CommentList'
import MyLoader from '../Loader/Loader';

class Comments extends Component {

    //descendants counter

    state = {
        error: false,
        isLoading: true,
        story: this.props.parent,
    }

    counter = 1;
    topParent = this.state.story;

    fetchComments = (comment, descendants) => {
        if (comment.kids) {
            let promises = []
            comment.kids.forEach(kid => {
                let axiosPromise = axios.get('/v0/item/' + kid + '.json');
                promises.push(axiosPromise);

                //Last request should be track
                if (this.counter === descendants) {
                    axiosPromise.then(() => {
                        Promise.all(promises).then(() => {
                            // Data fetched ready to be rendered
                            this.setState({ isLoading: false, story: this.topParent });
                        });
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
        const descendants = this.state.story.descendants;

        if (descendants > 0) {
            this.counter = 1;
            this.fetchComments(this.topParent, descendants);
        }
    }

    render() {
        let comments = {};
        if (this.state.isLoading) {
            comments = <MyLoader />
        }
        else {
            if (!this.state.error) {
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