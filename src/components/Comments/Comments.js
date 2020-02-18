import React, { Component } from 'react';
import { Alert, Button } from 'react-bootstrap';
import axios from '../../axiosRequests'
import CommentList from './CommentList'
import MyLoader from '../Loader/Loader';

class Comments extends Component {

    state = {
        error: false,
        isLoading: true,
        story: this.props.parent,
    }

    counter = 1;
    topParent = this.state.story;

    goBack = () => {
        window.history.back();
    }

    fetchComments = async (comment, depth) => {
        if (comment.kids) {
            let promises = []
            comment.kids.forEach(kid => {
                let axiosPromise = axios.get('/v0/item/' + kid + '.json');
                promises.push(axiosPromise);
            });

            try {
                let results = await Promise.all(promises)
                const comments = [];
                results.forEach(response => {
                    const data = response.data;
                    comments.push({ id: data.id, commentData: data });
                });

                console.debug(depth, "start")
                comment.comments = comments;
                promises = [];
                comment.comments.forEach((item, index) => {
                    console.debug(depth, index)
                    promises.push(this.fetchComments(item.commentData, depth + 1))
                });
                await Promise.all(promises);
                console.debug(depth, "end")
            }
            catch (error) {
                this.setState({ error: true });
            }
        }
    }

    componentDidMount() {
        // Fetch whole story with comments
        const descendants = this.state.story.descendants;

        console.debug("story start", this.topParent);
        if (descendants > 0) {
            this.counter = 1;
            this.fetchComments(this.topParent, 0)
                .then(() => {
                    console.debug("story end", this.topParent);
                    this.setState({ isLoading: false, story: this.topParent })
                });

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
                <div className="mb-3 d-flex flex-row justify-content-center">
                    <Button variant="outline-primary" onClick={this.goBack}>Go Back</Button>
                </div>
            </React.Fragment>
        );
    }
}

export default Comments;