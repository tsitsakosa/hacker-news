import React, { Component } from 'react';
import { Row, Alert } from 'react-bootstrap';
import Article from './Article';
import axios from '../../axiosRequests';
import MyLoader from '../Loader/Loader';
import MyPager from '../Pager/Pager'


class NewsFeed extends Component {
    offset = 6;
    allArticleIds = []
    state = {

        currentArticlesIds: [],
        latestArticles: [],
        currentPage: 1,
        currentArticles: [],
        error: false,
        isLoading: true
    }

    numberOfPages = () => {
        const totalItems = this.allArticleIds.length;
        return Math.ceil(totalItems / this.offset);
    }

    previousPageHandler = () => {
        if (this.state.currentPage > 1) {
            this.fetchLatestArticles(this.state.currentPage - 1)
        }
    }

    nextPageHandler = () => {
        if (this.state.currentPage < this.numberOfPages()) {
            this.fetchLatestArticles(this.state.currentPage + 1)
        }
    }

    fetchFirstPageLatestNews = () => {
        axios.get('/v0/topstories.json')
            .then(response => {
                const allIds = response.data;
                const articles = response.data.slice(0, this.offset);
                this.allArticleIds = allIds;
                this.setState({ currentArticlesIds: articles });
                this.fetchLatestArticles(1);
            })
            .catch(error => {
                this.setState({ error: true });
            });
    }

    fetchLatestArticles = (pageNumber) => {
        this.setState({ isLoading: true });

        const currentPage = pageNumber;
        const firstItem = currentPage * this.offset - this.offset;
        const lastItem = currentPage * this.offset;
        const articlesIdsToFetch = this.allArticleIds;
        const currentPageArticlesIds = articlesIdsToFetch.slice(firstItem, lastItem);
        let promises = [];
        
        currentPageArticlesIds.forEach(id => {
            promises.push(axios.get('/v0/item/' + id + '.json'));
        });

        Promise.all(promises).then(results => {
            let currentArticles = [];
            results.forEach(response => {
                const data = response.data;
                currentArticles.push(data);
            });
            this.setState({ currentPage: pageNumber, currentArticles, isLoading: false });
        });
    }

    componentDidMount() {
        this.fetchFirstPageLatestNews();
    }

    render() {
        let articles = {};
        if (this.state.isLoading) {
            articles = <MyLoader />
        }
        else if (!this.state.error) {

            articles = this.state.currentArticles.map(article => {
                return <Article
                    story={article}
                    key={article.id}
                />;
            });
            articles =
                <React.Fragment>
                    <Row>{articles}</Row>
                    <MyPager
                        totalPages={this.numberOfPages}
                        currentPage={this.state.currentPage}
                        offset={this.offset}
                        previousPageHandler={this.previousPageHandler}
                        nextPageHandler={this.nextPageHandler}
                    />
                </React.Fragment>


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