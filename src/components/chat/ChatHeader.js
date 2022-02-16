import React from 'react';

const ChatHeader = ({minimizeChat}) => {
  return (
  <div className='chat-header'>
    <div className ="header-controls">
       <span aria-hidden="true" className ="chat-header-logo">
       </span>
   <div className ="action-controls">
      <div className ="control-icons">
         <div className ="minimize-action ">
            <button type="button" aria-label="Minimize Chat" 
            className ="min-close-icon min-icon"
            onClick={minimizeChat}
            >
               <span className={'icon-minus'}></span>
            </button>
         </div>
         {/* <div className =" icon-action">
            <button data-testid="CloseButton" type="button" aria-label="Close" className ="min-close-icon close-icon">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path>
               </svg>
            </button>
         </div> */}
      </div>
   </div>
</div>
      <div className='chat-title'>
          <span className='bot-name'>VIRTUAL CONCEIRGE</span>
      </div>
  </div>
  );
};

export default ChatHeader;
