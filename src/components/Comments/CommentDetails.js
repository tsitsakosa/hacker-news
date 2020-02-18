import React from 'react';
import { Markup } from 'interweave';
import styled from 'styled-components';
import Moment from 'react-moment';

const CommentDetails = (props) => {

    const Styles = styled.div`
    .username{
        font-size: 0.75rem;
    }
    .comment-text{
        font-size: 0.875rem;
    }
`;

    const commentDetails = (details) => {
        return (
            <>
                <Styles>
                    <div className="d-flex flex-row flex-wrap justify-content-between mb-2">
                        <div className="text-nowrap">
                            <span className="text-muted username">user: </span>
                            <strong className="username">{details.by}</strong>
                        </div>
                        <div>
                            <span className="text-nowrap text-info">Posted: <Moment fromNow unix>{details.time}</Moment></span>
                        </div>
                    </div>

                    <p className="comment-text">
                        <Markup content={details.text} />
                    </p>
                    <hr />
                </Styles>

            </>

        );
    }

    return commentDetails(props.data);

}

export default CommentDetails;