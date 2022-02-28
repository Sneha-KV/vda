import {useState, useEffect, useRef} from 'react';
import { connect} from "react-redux";


import { userMessage, sendMessage } from '../../actions/lexbot';

import BotResponse from './BotResponse';
import ChatHeader from './ChatHeader';
import GlobalProperties from '../../properties/GlobalProperties';
import UserMsgContainer from './UserMsgContainer';
import ChatIcon from './ChatIcon';
import botLogo from '../../assets/icons/chatmiicon.svg';
// import Categories from './Categories';


const Chat = ({chat, userMessage, sendMessage}) => {
    const [message, setMessage] = useState("");
    const lastMessage = useRef(null);
    const [openChat, setOpenChat] = useState(false);
    const [welcomeMsg, setWelcomeMsg] = useState(window.propertyDetails.brandMessages.welcome_msg || window.propertyDetails.welcomeMessage);
    const [loader, setLoader] = useState(false);
    const scrollToBottom = () => {
            lastMessage.current.addEventListener('DOMNodeInserted', event => {
              const { currentTarget: target } = event;
              target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
    }

    const getDateandTime = () => {
        var today = new Date();
        const lang = document.documentElement.lang || 'en-US';
        const time =   today.toLocaleString(lang, { hour: 'numeric', minute: 'numeric', hour12: true })
        const dayName =  today.toLocaleDateString( lang, { weekday: 'long' });
        return `${dayName} ${time}`;
    }

    // User message handler
    const handleClick = async (e) => {
        const code = e.keyCode || e.which;
        if(code !== 13) return;
        e.target.disabled = true;
        userRequest();
        e.target.disabled = false;  
    }

    const handleSendButtonClick = () => {
        if(!message) return;
        userRequest(message);
    }

    const requestMessage = (requestMessage, messageValue ='') => {
        setMessage(requestMessage);
        setLoader(true);
        userRequest(requestMessage, messageValue);
    }

    const userRequest = (userText = message, messageVal = '' ) => {
        userMessage(userText);
        sendMessage(messageVal || userText);
        setMessage("");
    }
    
    const openCloseChat = () => {
        setOpenChat(!openChat);
    }

    useEffect(()=> {
       sendMessage('welcome', true);
    }, [])
    
    useEffect( scrollToBottom, [chat]);
   
  return (
    <>
        <div className={`chat-open-icon ${openChat ? 'is-closed' : ''}`}>
            <ChatIcon handleClick={openCloseChat}/>
        </div>
        <div className={`message-container chat ${window.propertyDetails.propertyBrandCode.toLowerCase()} ${openChat ? 'is-open' : 'is-closed'}`} >
            <ChatHeader minimizeChat={openCloseChat}/>
            <main className="conversation-container">
                <div className='conversation-box'>
                    <div className='conversation' id="conversation" ref={lastMessage}>
                        <p className = "chat-header-chat-start-time date-time">{getDateandTime()}</p>
            
                        <div className="chat-response-row">
                        <div className='bot-avatar-section'>
                            <span className="chat-chat-bot-avatar">
                                <img className={'bot-avatar'} alt ="bot-icon" src={botLogo} />
                            </span>
                        </div>
                        <span className="chat-response-message message-text">
                                {welcomeMsg}
                            </span>
                            
                        </div>
                        { 
                            chat.length > 0 ? chat.map((msg, index) => {
                                return (
                                    msg.type === "user" ? 
                                    <UserMsgContainer key={index} messageText={msg.message} sendHandler={requestMessage}/> :
                                    <BotResponse key={index} className={'bot-response'} displayData={msg.message}  sendHandler={requestMessage}/>
                                    )}): ""
                        }
                        {/* { loader && 
                            <BotResponse  className={'bot-response'} messageType={'loader'} sendHandler={requestMessage}/>
                        } */}
                        
                    </div>
                    {/* user input section */}
                    <div className={'chat-input-form'}>
                        <span className={'more-info icon-more'}></span>
                        <input 
                        id="chatbox-message" 
                        onChange={(e) => setMessage(e.target.value)} 
                        onKeyPress={handleClick} 
                        value={message || ""}
                        placeholder='Type a message...'/>
                        <button type="submit" className="chat-submit" onClick={handleSendButtonClick}>
                            <span className="right-forward-arrow icon-forward-arrow" ></span>
                        </button>
                    </div>
                </div>
            </main>
        </div>
  </>
  );
};

const mapStateToProps = (state) => ({
    chat : state.lexbot.messages
})
export default connect(mapStateToProps, {userMessage, sendMessage})(Chat);
