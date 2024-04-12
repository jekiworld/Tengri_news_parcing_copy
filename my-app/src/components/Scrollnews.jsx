import React from 'react';

const Scrollnews = ({ title, meta, handleClick, news}) => {
  return (
    <div className='scrollnews'  onClick={() => handleClick(news.news_url)}>
        <div className="title_scrollnews">
            {title}
        </div>

        <div className='scrolltimenews'> 
            {meta}
        </div>
    </div>
  );
}

export default Scrollnews;
