import { useState } from "react";

const Categories = ({messages, sendHandler}) => {    
    const buttonsList = JSON.parse(messages.content);
    const [loadMore, setLoadMore] = useState(false);
    const categoriesLength = buttonsList.buttons.length;
    const showCount = loadMore && categoriesLength > 4 ? categoriesLength : 4;
    const categoryClickHandler = (text) => {
        sendHandler(text);
    }

    const showMore = () => {
        setLoadMore(!loadMore);
    }
  return (
    //   <span className="chat-response-message message-text">
        <div className={'category-list'}>
            <button className = {'list-header category'} >{buttonsList.title}</button>
                {   
                    buttonsList.buttons.slice(0, showCount).map((btn, index) => {
                    return (
                        <button  key = {index} className={'category'} onClick={() => categoryClickHandler(btn.title)}>
                            <span className={`icon-${btn.title.replace(" ","-").toLowerCase()}`}></span>{btn.title}
                        </button>
                    )
                    })
                } 
                {
                    categoriesLength > 4 && 
                    <button className={'category'} onClick={() => showMore()}>
                            <span className={`icon-more`}></span>{showCount > 4 ? "Less" : "More"}
                    </button>
                }
        </div>
    // </span>
  );
};

export default Categories;
