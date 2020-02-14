import React, { Component } from 'react';
import { Col, Card, Button } from 'react-bootstrap';

const article = (props) => (
    <Col xs={12} md={6} lg={4}>
        <Card className="mb-4">
            <Card.Header>Featured</Card.Header>
            <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    </Col>
);

export default article;