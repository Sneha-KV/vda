import { useState, useEffect } from 'react';
import { Loading } from 'react-loading-dot';

import Categories from './Messages/Categories';
import PlainText from './Messages/PlainText';
import TextBubbles from './Messages/TextBubbles';
import CarouselComponent from './Messages/CarouselComponent';
import botLogo from '../../assets/icons/chatmiicon.svg';
const BotResponse = ({messageType, displayData, sendHandler}) => {
  const messages = messageType !== "loader" ? displayData.messages: null;
  const isBubbles = messages ? (displayData.requestAttributes?.button === "bubble" ? true : false) : false;
  const [carouselElements, setCarouselElements] = useState([]);
  const [showCarousel, setShowCarousel] = useState({show: 0, start: messages.length});
  let carouselStartIndex = messages.length;
  const [postCarousel, setPostCarousel] = useState([]);
  let carouselMessages = [];

  const handleCarousel = () => {
    carouselMessages = messages.filter((message, index) => { 
      let isCarouselElement = message.contentType === "ImageResponseCard" && !!message.imageResponseCard.subtitle;
      if(carouselStartIndex === messages.length && isCarouselElement) {carouselStartIndex = index; setShowCarousel({...showCarousel, start : index})};
      return isCarouselElement;
    });
    setCarouselElements(carouselMessages);
    console.log(messages.slice(parseInt(carouselStartIndex + carouselMessages.length)))
    setPostCarousel(messages.slice(parseInt(carouselStartIndex + carouselMessages.length)));
  }

  useEffect(()=> {
    if(messages) handleCarousel();
  }, []);


  const botavatar = (<div className='bot-avatar-section'>
                      <span className="chat-chat-bot-avatar">
                      <img className={'bot-avatar'} alt ="bot-icon" src={botLogo} />
                      </span>
                    </div>);
  const formatMessages = (displayMessages) => {
    let formattedMessages = (
    <span className={`chat-response-message message-text ${displayMessages[0].contentType.toLowerCase()}`}>
      <>
        { displayMessages && 
          displayMessages.map((message, index) => {
            let msg = <></>;
                if(message.contentType === "PlainText")
                  msg =(<span  key={index}>
                    <PlainText  message={message}/>
                  </span>) ;
                if (message.contentType === "CustomPayload" && !isBubbles)
                    msg = <Categories key={index} messages={message} sendHandler={sendHandler}/>
                if(message.contentType === "CustomPayload" && isBubbles)
                    msg = <TextBubbles key={index} message={message} sendHandler={sendHandler} isBubbles={true}/>
                if(message.contentType === "ImageResponseCard" && !!message.imageResponseCard.buttons)
                    msg = <TextBubbles key={index} message={message} sendHandler={sendHandler}/>
            return msg;
          })
        }
      </>
    </span>);
   return formattedMessages;
  }

  return (
    <>
      <div className="chat-response-row">
        {botavatar}
          {
            messages && 
              formatMessages(messages.slice(0, showCarousel.start))
          }
          
          {
            // messageType === "loader" &&
            // <span className="chat-response-message message-text">
            //  <Loading size={'0.5rem'} margin={'0.25rem'}/>
            // </span>
          }
      </div>
      {
                carouselElements.length > 0 &&
                <span className={`chat-response-message message-text carousel-elements`}>
                <CarouselComponent carouselElements = {carouselElements} />
                </span>
      }
      {
        postCarousel.length > 0 &&

        (<div className="chat-response-row test">
          {botavatar}
          {
            formatMessages(postCarousel)
          }
        </div>)
      }
    </>
  );
};

export default BotResponse;
