import React, { useState } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import Moment from 'react-moment';

const Pager = (props) => {

    const renderPager = (props) => {
        const disablePrevious = props.currentPage <= 1;
        const nextPrevious = props.currentPage >= props.numberOfPages;

        return (
            <React.Fragment>
                {

                    (true
                        ? null

                        : <h1>null</h1>)
                }

                <div className="d-flex flex-row justify-content-center mb-3">

                    <Button
                        disabled={disablePrevious}
                        variant="outline-primary"
                        className="mx-2"
                        onClick={props.previousPageHandler}>Previous</Button>
                    <Button
                        disabled={nextPrevious}
                        variant="outline-primary"
                        className="mx-2"
                        onClick={props.nextPageHandler}>Next</Button>
                </div>
            </React.Fragment>
        );
    }

    return renderPager(props);
};

export default Pager;