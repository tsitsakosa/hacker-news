import React from 'react';
import { Markup } from 'interweave';

const CommentList = (props) => {
    const listOfComment = '';

    // const commentItem = (item) => {
    //     return <li id={item.id}> <Markup content={item.text} /></li>;
    // }

    const commentItem = (item) => {
        return (
            <li key={item.commentData.id} id={item.commentData.id}>
                <Markup content={item.commentData.text} />
                {(item.commentData.comments ? <ul>
                    {commentList(item.commentData.comments)}
                </ul> : null)}
            </li>
        );
    }

    const commentList = (story) => {
        if (story) {
            let html = "";
            html = story.map(item => {
                return commentItem(item);
            });
            return <ul>{html}</ul>;
        }
        return null;
    }

    return commentList(props.data);

}

export default CommentList;