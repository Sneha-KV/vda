import { useState } from 'react'

const ReadMore = ({ children }) => {
  const text = children;
  const isReadMoreNeeded = text.length > 150;
  const [isReadMore, setIsReadMore] = useState(isReadMoreNeeded);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 150) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? "...read more" : isReadMoreNeeded ? " show less" : ""}
      </span>
    </p>
  );
};

const PlainText = ({message}) => {
  return (
    // <span className='chat-response-message message-text'>
      <ReadMore>
      {message.content}
    </ReadMore>
    // </span>
  )
}

export default PlainText;