import React from 'react';

const MiniNewsComponent = ({ news, handleClick }) => {
  return (
    <div className="news_mini" onClick={() => handleClick(news.news_url)}>
      <div className="img_mini"><img src={news.image_url} alt="" className='im_im'/></div>
      <div className="title_mini">{news.title}</div>
      <div className="static_mini">
        <p>{news.meta}</p>
      </div>
    </div>
  );
}

export default MiniNewsComponent;
