import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import Article from './Article';
import axios from '../../axiosRequests';


class NewsFeed extends Component {
    state = {

    }

    render() {
        return (
            <Row>
               <Article/>
               <Article/>
               <Article/>
               <Article/>
               <Article/>
               <Article/>
            </Row>
        );
    }

}

export default NewsFeed;