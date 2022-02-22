import { useState, useEffect } from 'react';
import Categories from './Messages/Categories';
import PlainText from './Messages/PlainText';
import TextBubbles from './Messages/TextBubbles';
import CarouselComponent from './Messages/CarouselComponent';

const BotResponse = ({messageType, displayData, sendHandler}) => {
  const messages = messageType !== "loader" ? displayData.messages: null;
  const isBubbles = displayData.requestAttributes?.button === "bubble" ? true : false;
  const [carouselElements, setCarouselElements] = useState([]);
  let carouselMessages = [];

  const handleCarousel = () => {
    carouselMessages = messages.filter((message) => message.contentType === "ImageResponseCard" && !!message.imageResponseCard.subtitle);
    setCarouselElements(carouselMessages)
  }

  useEffect(()=> {
    handleCarousel();
  }, [])
  return (
    <div className="chat-response-row">
        {
          messages && 
          <span className={`chat-response-message message-text ${messages[0].contentType.toLowerCase()}`}>
          <>
            {
              messages.map((message, index) => {
                let msg = <></>;
                // console.log(message);
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
                // if(message.contentType === "ImageResponseCard" && !!message.imageResponseCard.subtitle) {
                //   setCarouselElements([...carouselElements, message])
                // }
                return msg
              })
            }
            {
              carouselElements &&
              <CarouselComponent carouselElements = {carouselMessages} />
            }
            </>
            </span>
        }
        {
          messageType === "loader" &&
          <span className="chat-response-message message-text">
           loader
          </span>
        }
        <span className="chat-chat-bot-avatar">
          <img className={'bot-avatar'} alt ="bot-icon" src="https://www.primepixel.net/MIBot/images/chatmiicon.svg" />
        </span>
    </div>
  );
};

export default BotResponse;
