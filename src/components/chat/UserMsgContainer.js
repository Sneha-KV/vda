import React from 'react';

const UserMsgContainer = ({messageText}) => {
  return (
    <>
        <div className ="chat-request-msg user-message message-text">
          <div className={'user-text'}>
            {messageText}
          </div>
        </div>
    </>);
};

export default UserMsgContainer;
