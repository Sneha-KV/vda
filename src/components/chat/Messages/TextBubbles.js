import React from 'react'

const TextBubbles = ({message, sendHandler}) => {
  const displayMessage = message.imageResponseCard;
  const optionClick = (text) => {
    sendHandler(text);
  }
  return (
    // <span className="chat-response-message message-text">
      <div className={`imageResponseCard message-details`}>
      <div className={'message-title'}>
        { displayMessage.title}
      </div>
      <div>
        {
          displayMessage.buttons.map((button, index) => {
            return (
            <div className={'display-bubble'} key={index}>
              <button className = {'button-bubble'} onClick={() => optionClick(button.text)}>{button.text}</button>
            </div>)
          })
        }
      </div>
    </div>
    // </span>
    
  )
}

export default TextBubbles;