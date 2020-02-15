import React, { useState } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import Moment from 'react-moment';
import Comments from '../Modal/ModalComments';

const Article = (props) => {
    const [commentsShowState, setCommentsShowState] = useState(false);
    const handleCloseComment = () => setCommentsShowState(false);
    const handleShowComments = () => setCommentsShowState(true);

    return (
        <Col xs={12}>
            <Card className="mb-4">
                <Card.Header className="bg-primary" >
                    <div className="d-flex flex-row justify-content-between align-items-start">
                        <h2 className="h5">
                            <span className="align-middle">{props.story.title}</span>
                        </h2>
                        <small className="badge badge-pill badge-success ml-1 align-middle">{props.story.score}</small>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className="d-flex flex-row justify-content-between flex-wrap">
                        <blockquote className="blockquote mb-0">
                            <footer className="blockquote-footer">
                                <span>Post By: {props.story.by}</span>
                                {
                                    props.story.url
                                        ? <span> in <Card.Link href={props.story.url}>{new URL(props.story.url).host.replace('www.', '')}</Card.Link></span>
                                        : null
                                }
                            </footer>
                        </blockquote>
                        <div className="text-muted d-flex flex-row">
                            <span className="text-nowrap">Posted: <Moment fromNow unix>{props.story.time}</Moment></span>
                            <span className="mx-1">-</span>
                            <Button variant="link" className="text-muted p-0"
                                onClick={handleShowComments}>{props.story.descendants} {props.story.descendants === 1 ? "comment" : "comments"}</Button>
                            <Comments show={commentsShowState}
                                closeHandler={handleCloseComment}
                                story={props.story} />
                        </div>
                    </div>

                </Card.Body>

            </Card>
        </Col >
    )
};

export default Article;