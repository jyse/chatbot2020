import React from 'react';

const UserBubble = (props) => {
    console.log(props, 'is user getting any props here?');
    return (
        <div className="ui message">
        <div className="header">
            Corgi2083
        </div>
        <p> {props.message} </p>
        </div>
    );
};

export default UserBubble;