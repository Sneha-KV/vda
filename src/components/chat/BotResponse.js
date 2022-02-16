import Categories from './Messages/Categories';
import PlainText from './Messages/PlainText';
import TextBubbles from './Messages/TextBubbles';

const BotResponse = ({messageType, displayData, sendHandler}) => {
  const messages = messageType !== "loader" ? displayData.messages: null;

  return (
    <div className="chat-response-row">
        {
          messages && 
          <span className="chat-response-message message-text">
          <>
            {
              messages.map((message, index) => {
                let msg = <></>;
                // console.log(message);
                if(message.contentType === "PlainText")
                  msg =(<span  key={index}>
                        <PlainText  message={message}/>
                      </span>) ;
                if (message.contentType === "CustomPayload")
                    msg = <Categories key={index} messages={message} sendHandler={sendHandler}/>
                if(message.contentType === "ImageResponseCard" && !!message.imageResponseCard.buttons)
                    msg = <TextBubbles key={index} message={message} sendHandler={sendHandler}/>
                return msg
              })
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
