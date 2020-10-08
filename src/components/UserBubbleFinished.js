import React from 'react';
import faker from 'faker';
import userIcon from './userIcon.png';

const dateMessage = new Date().toLocaleString();

const UserBubbleFinished = ({
    finishedAnswer,
}) => {
    return (
        <div className="ui small compact message" style={{background: 'white', marginTop: '10px', borderColor: 'black' }}> 
        <div class="ui comments">
            <div class="comment">
                <a class="avatar">
                <img src={userIcon} alt="userIcon" />
                </a>
                <div class="content">
                    <a class="author">Jason</a>
                </div>
            </div>
            <div class="text" style={{fontSize: '10px'}}>
                {finishedAnswer}
            </div>
        </div>
    </div>
    );
};

export default UserBubbleFinished;

