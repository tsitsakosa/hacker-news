import React, { Component } from 'react';
import { Layout } from './Layouts/Layout';
import { useParams } from "react-router-dom";
import axios from '../axiosRequests';
import MyLoader from './Loader/Loader';
import Comments from './Comments/Comments';

class CommentsPage extends Component {
    state = {
        parent: {},
        isLoading: true,
        isNotRequested: true
    }

    fetchItem = () => {
        let { id } = useParams();
        this.setState({ isNotRequested: false });
        axios.get('/v0/item/' + id + '.json')
            .then(results => {
                this.setState({ parent: results.data, isLoading: false });
            });
    }

    BlogPost = () => {
        this.fetchItem();
        return <></>;
    }

    render() {
        let view = null;
        if (this.state.isLoading && this.state.isNotRequested) {
            view = <div><MyLoader /><this.BlogPost /></div>
        }
        else if (this.state.isLoading) {
            view = <MyLoader />
        }
        else {
            const parent = this.state.parent;
            view =
                <div>
                    <h2 className="mb-4 h4">
                        <small className="badge badge-pill badge-success mr-3 align-middle" title="Story reputation">{parent.score}</small>
                        <span>{parent.title}</span>
                    </h2>

                    <Comments parent={parent} />
                </div>
        }
        return (
            <Layout>
                {view}
            </Layout>
        );
    }

}

export default CommentsPage;