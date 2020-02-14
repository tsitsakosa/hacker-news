import React from 'react';
import { Container } from 'react-bootstrap';
import Jumbotron from '../Jumbotron/Jumbotron';
import hackImage from '../../assets/hacking.jpeg';

export const Layout = (props) => (
    <React.Fragment>
        <Jumbotron title="Hacker news" description="Read all latest hacker news!" image={hackImage} />
        <Container>
            {props.children}
        </Container>
    </React.Fragment>
)