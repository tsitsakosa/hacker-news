import React from 'react';
import CommentDetails from './CommentDetails';
import styled from 'styled-components';

const CommentList = (props) => {
    
    const Styles = styled.div`
    .comments-list-wrapper ul{
        padding-left: 1rem;
    }

    .comments-list-wrapper > ul{
        padding-left: 0px;
    }
`;
    const commentItem = (item) => {
        return item.commentData.text ?
            <li key={item.commentData.id} id={item.commentData.id}>
                <CommentDetails data={item.commentData} />
                {/* <Markup content={item.commentData.text} /> */}
                {(item.commentData.comments
                    ? commentList(item.commentData.comments)
                    : null)}
            </li>
            : null;
    }

    const commentList = (story) => {
        if (story) {
            let html = "";
            html = story.map(item => {
                return commentItem(item);
            });
            return <ul className="list-unstyled" >{html}</ul>;
        }
        return null;
    }

    return (
        <Styles>
            <div className="comments-list-wrapper">
                {commentList(props.data)}
            </div>
        </Styles>
    );
}

export default CommentList;