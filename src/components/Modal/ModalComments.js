import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Comments from '../Comments/Comments'

const modalComments = (props) => {
    return (
        <>
            <Modal show={props.show}
                size="xl"
                onHide={props.closeHandler}
                aria-labelledby={"modal-comments-title-" + props.story.id}>
                <Modal.Header closeButton>
                    <Modal.Title id={"modal-comments-title-" + props.story.id}>{props.story.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        props.story.descendants >= 1 ? <Comments parent={props.story} kids={props.story.kids} /> : null
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.closeHandler}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
};

export default modalComments;