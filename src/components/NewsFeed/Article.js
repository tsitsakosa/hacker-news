import React, { Component } from 'react';
import { Col, Card } from 'react-bootstrap';
import Moment from 'react-moment';

const article = (props) => (
    <Col xs={12}>
        <Card className="mb-4">
            <Card.Header>
                <div className="d-flex flex-row justify-content-between align-items-start">
                    <h2 className="h5">
                        <span className="align-middle">{props.title}</span>

                    </h2>
                    <small className="badge badge-pill badge-success ml-1 align-middle">{props.score}</small>
                </div>
            </Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-0">

                    <footer className="blockquote-footer">
                        Post By: {props.by} in <Card.Link href={props.url}>{new URL(props.url).host.replace('www.', '')}</Card.Link>
                    </footer>
                </blockquote>
            </Card.Body>
            <Card.Footer className="text-muted d-flex flex-row">
                <span>Posted: <Moment fromNow unix>{props.time}</Moment></span>
                <span className="mx-1">-</span>
                <span>{props.descendants} {props.descendants === 1 ? "comment" : "comments"}</span>
            </Card.Footer>
        </Card>
    </Col >
);

export default article;