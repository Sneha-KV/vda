import { useState } from 'react'

const ReadMore = ({ children }) => {
  const text = children;
  const isReadMoreNeeded = text.length > 150;
  const [isReadMore, setIsReadMore] = useState(isReadMoreNeeded);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const textMessage = <span dangerouslySetInnerHTML={{__html: isReadMore ? text.slice(0, 150) : text}}></span>
  return (
    <>
   
    <p className="text" >
      {textMessage}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? "...read more" : isReadMoreNeeded ? "...show less" : ""}
      </span>
    </p>
    {/* </span> */}
    </>
    
  );
};

const PlainText = ({message}) => {
  return (
    // <span className={`chat-response-message message-text `}>
      <ReadMore dangerously>
        {message.content}
      </ReadMore>
    // </span>
  )
}

export default PlainText;