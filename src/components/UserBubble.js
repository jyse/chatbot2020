import React from 'react';
import { Form } from 'reactstrap';

const UserBubble = ({
    finished,
    finishedAnswer,
    liveAnswer,
    hasButton,
    onCurrentAnswerChange,
    onAnswer,
}) => {
    return (
        <div>
        { finished &&
            <div className="ui message" style={{ marginTop: '10px', textAlign: 'right' }}>
                <div className="header">
                    JustJessy888s
                </div>
                <p> Answer: {finishedAnswer}</p>
            </div>
        }
        { !finished && 
            <Form className="card p-2" onSubmit={onAnswer} style={{ marginTop: '10px' }}>
                <div className="input-group" style={{ marginTop: '10px' }}>
                    <input
                        value={liveAnswer}
                        onChange={onCurrentAnswerChange}
                        type="text"
                        className="form-control"
                        placeholder="Your Answer"
                    />
                    <div className="input-group-append" style={{ marginTop: '10px' }}>
                        <button type="submit" className="btn btn-secondary">Submit</button>
                    </div>
                    { hasButton && 
                        <p>I have a button</p>
                    }
                </div>
            </Form>
        }
        </div>
    );
};

export default UserBubble;

