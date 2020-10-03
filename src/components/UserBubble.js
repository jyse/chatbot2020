import React from 'react';
import { Form } from 'reactstrap';

// const UserBubble = (props) => {
//     console.log(props, 'is user getting any props here?');
//     return (
//         <div className="ui message">
//         <div className="header">
//             Corgi2083
//         </div>
//         <p> {props.message} </p>
//         </div>
//     );
// };

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
            <div className="ui message">
                <div className="header">
                    Chatbot2020
                </div>
                <p> Answer: {finishedAnswer}</p>
            </div>
        }
        { !finished && 
            <Form className="card p-2" onSubmit={onAnswer}>
                <div className="input-group">
                    <input
                        value={liveAnswer}
                        onChange={onCurrentAnswerChange}
                        type="text"
                        className="form-control"
                        placeholder="Your Answer"
                    />
                    <div className="input-group-append">
                        <button type="submit" className="btn btn-secondary">Redeem</button>
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

