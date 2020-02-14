import React from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components';


const jumbotron = (props) => {
    const Styles = styled.div`
    .jumbotron{
        background: url(${props.image});
        background-size: cover;
        color: #ccc;
        height: 200px;
        position: relative;
        z-index: -2;
    }
    .overlay{
        background-color: #000;
        opacity: 0.6;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
    }
`;
   return (
        <Styles>
            <Jumbo className="jumbo" fluid>
                <div className="overlay"></div>
                <Container>
                    <h1 className="text-capitalize">{props.title}</h1>
                    {props.description
                        ? <p>{props.description}</p>
                        : null
                    }
                </Container>
            </Jumbo>
        </Styles>
    )
}
export default jumbotron;