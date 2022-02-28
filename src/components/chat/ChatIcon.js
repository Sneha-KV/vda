import React from 'react';
import chatLogo from '../../assets/icons/chatLogo.png';

const ChatIcon = ({handleClick}) => {
  return (
  <>
    <button type="button" 
        id="chat-button" 
        className="chat-button" 
        aria-label="Chat with bot" 
        title="Chat with bot" 
        onClick={handleClick} 
        >
        <img className="button__icon" alt="" src={chatLogo}/>
    </button>
  </>);
};

export default ChatIcon;
