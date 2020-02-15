import React, { Component } from 'react';
import { Row, Alert } from 'react-bootstrap';
import Article from './Article';
import axios from '../../axiosRequests';
import MyLoader from '../Loader/Loader'


class NewsFeed extends Component {
    offset = 6;
    state = {
        latestArticlesIds: [],
        latestArticles: [],
        currentPage: 1,
        currentArticles: [],
        error: false,
        isLoading: true
    }

    fetchLatestArticlesIds = () => {
        axios.get('/v0/topstories.json')
            .then(response => {
                const articles = response.data.slice(0, this.offset);
                this.setState({ latestArticlesIds: articles });
                console.debug(this.state.latestArticlesIds);
                this.fetchLatestArticles();
            })
            .catch(error => {
                console.debug("fetchLatestArticlesIds :", error);
                this.setState({ error: true });
            });
    }

    fetchLatestArticles = () => {
       
        const currentPage = this.state.currentPage;
        const firstItem = currentPage * this.offset - this.offset;
        const lastItem = currentPage * this.offset;
        const currentPageArticlesIds = this.state.latestArticlesIds.slice(firstItem, lastItem);
        const currentArticles = [];
        let promises = [];

        currentPageArticlesIds.forEach(id => {
            console.debug(id);
            promises.push(axios.get('/v0/item/' + id + '.json'));
        });

        Promise.all(promises).then(results => {
            results.forEach(response => {
                const data = response.data;
                currentArticles.push(data);
                console.debug(response.data);
            });
            this.setState({ currentArticles: currentArticles, isLoading: false }
            );
        });
    }

    componentDidMount() {
        this.fetchLatestArticlesIds();
    }

    render() {
        let articles = <Alert variant="danger">Something went wrong! Try later..</Alert>;
        if (this.state.isLoading) {
            articles = <MyLoader />
        }
        else if (!this.state.error) {
            articles = this.state.currentArticles.map(article => {
                return <Article
                    key={article.id}
                    id={article.id}
                    title={article.title}
                    by={article.by}
                    time={article.time}
                    url={article.url}
                    score={article.score}
                    descendants={article.descendants}
                />;
            });
            articles = <Row>{articles}</Row>
        }
        else {
            articles = <Alert variant="danger">Something went wrong! Try later..</Alert>;
        }

        return (
            <React.Fragment>
                {articles}
            </React.Fragment>
        );
    }

}

export default NewsFeed;