import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./news.css";
import news from "../components/news.json"
import { useParams } from 'react-router-dom';


export default function News() {

    const { newsId } = useParams();
    const [newsDetails, setNewsDetails] = useState(null);

    useEffect(() => {
        const fetchNewsDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/pages/detail?url=${newsId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch article details');
                }
                const data = await response.json();
                setNewsDetails(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchNewsDetails();
    }, [newsId]);

    const isIgnoredContent = (content) => {
        const ignoredWords = ['Поделиться', 'Курс валют', 'Погода', 'Наши новости теперь в WhatsApp! Подписывайтесь на наш канал в самом популярном мессенджере'];
        return ignoredWords.some(word => content.includes(word));
    };


    return (
        <div className="container">
            <div className="header">


                <div className='left'>
                    <ul className="header-ul">
                        <li><a href="">News</a></li>
                        <li><a href="">Life</a></li>
                        <li><a href="">Sport</a></li>
                        <li><a href="">Travel</a></li>
                        <li><a href="">Guide</a></li>
                        <li><a href="">Edu</a></li>
                        <li><a href="">Auto</a></li>
                    </ul>
                </div>
            </div>


            <div className="menu">
                <div className="mini-menu">
                    <div className="burger"><img src="https://tengrinews.kz/edu/img/burger.svg" alt="" /></div>
                    <div className="logo"><img src="https://tengrinews.kz/tengri_new/img/logo.svg" alt="" /></div>
                    <a className='news' >Новости</a>
                    <a className='articles'>Статьи</a>
                    <a className='info'> Что будет с Казахстаном?</a>
                    <div className="language"><img src="https://tengrinews.kz/tengri_new/img/menu-lang.svg" alt="" /></div>
                    <div className="search"><img src="https://tengrinews.kz/tengri_new/img/menu-search.svg" alt="" /></div>
                </div>
            </div>

            <div className="whatsapp">
                <div className="line">Подписывайтесь на канал Tengrinews.kz в WhatsApp  </div>
            </div>
            {newsDetails && (
                <div className='main_news'>

                    <div className="time_container">
                        <div className="time">
                            <p>{newsDetails.date_time}</p>
                        </div>
                    </div>

                    <div className="main_title">
                        <p>{newsDetails.headline}</p>
                    </div>

                    <div className='statistics'>
                        <div className="view">
                            <img className='img' src="https://tengrinews.kz/tengri_new/img/circle-viewings.svg" alt="" />
                            <p className="number_of_view">{news.news[0].amount_of_view}</p>
                            <img src="https://tengrinews.kz/tengri_new/img/circle-comments.svg" alt="" className="img_comment" />
                            <p className="number_of_comment">4</p>
                            <img src="https://tengrinews.kz/tengri_new/img/circle-share.svg" alt="" className="img_repost" />
                        </div>
                    </div>

                    <div className="im_news">
                        <img src={`https://tengrinews.kz/${newsDetails.image_url}`} alt="" />
                    </div>

                    <div className="content">
                        {Object.values(newsDetails.text2_dict)
                            .filter(paragraph => !isIgnoredContent(paragraph))
                            .slice(3)
                            .map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                    </div>

                </div>)}


        </div>)
}
