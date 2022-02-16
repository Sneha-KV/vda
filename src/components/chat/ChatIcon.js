import React from 'react';

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
        <img className="button__icon" alt="" src="https://primepixel.net/MIBot/images/ChatW.svg"/>
    </button>
  </>);
};

export default ChatIcon;
