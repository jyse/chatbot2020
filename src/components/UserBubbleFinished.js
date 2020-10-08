import React from 'react';
import { Form } from 'reactstrap';

const UserBubbleFinished = ({
    finishedAnswer,
}) => {
    return (
        <div>
            <div className="ui message" style={{ marginTop: '10px', textAlign: 'right' }}>
                <div className="header">
                    JustJessy888s
                </div>
                <p> Answer: {finishedAnswer}</p>
            </div>
        </div>
    );
};

export default UserBubbleFinished;

