import React, { Component } from 'react';
import { Row, Alert } from 'react-bootstrap';
import Article from './Article';
import axios from '../../axiosRequests';


class NewsFeed extends Component {
    state = {
        latestArticles: [],
        error: false
    }

    componentDidMount() {
        axios.get('/v0/topstories.json')
            .then(response => {
                const articles = response.data.slice(0, 6);

                this.setState({ latestArticles: articles });
                console.log(this.state.latestArticles);
            })
            .catch(error => {
                // console.log(error);
                this.setState({ error: true });
            });
    }

    render() {
        let articles = <Alert variant="danger">Something went wrong! Try later..</Alert>;
        if (!this.state.error) {
            articles = this.state.latestArticles.map(article => {
                return <Article
                    key={article.id}
                    id={article.id} />;
            });
            articles = <Row>{articles}</Row>
        }
        return (
            <React.Fragment>
                {articles}
            </React.Fragment>
        );
    }

}

export default NewsFeed;