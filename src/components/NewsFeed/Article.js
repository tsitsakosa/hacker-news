import React, { Component } from 'react';
import { Col, Card, Button } from 'react-bootstrap';

const article = (props) => (
    <Col xs={12}>
        <Card className="mb-4">
            <Card.Body>
                <Card.Title><h2>{props.title}</h2></Card.Title>
                <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    </Col>
);

export default article;