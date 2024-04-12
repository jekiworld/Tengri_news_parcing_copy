import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import "./home.css";
import news from '../components/news.json'
import MiniNewsComponent from '../components/Mininews';
import Scrollnews from '../components/Scrollnews';


export default function Home() {

    const [mainNews, setMainNews] = useState(null);
    const [miniNews, setMiniNews] = useState([]);
    const [scrollNewsData, setScrollNewsData] = useState({});
    const [url, setUrl] = useState("");

    useEffect(() => {
        fetchMainNews();
    }, []);

    const fetchMainNews = async () => {
        try {
            // Получаем все данные
            const response = await fetch('http://localhost:8000/pages');
            if (!response.ok) {
                throw new Error('Failed to fetch articles');
            }
            const data = await response.json();
            if (data.length > 0) {
                setMainNews(data[0]);
                setMiniNews(data.slice(1, 7));
                // Устанавливаем остальные данные как scrollNewsData
                setScrollNewsData(data.slice(7));
            }
        } catch (error) {
            console.error(error);
        }
    };

    let navigate = useNavigate();

    const handleClick = async (newsUrl) => {
        try {
            const response = await fetch(`http://localhost:8000/pages/detail?url=${newsUrl}`);
            if (!response.ok) {
                throw new Error('Failed to fetch article details');
            }
            const data = await response.json();
            navigate("/news");

        } catch (error) {
            console.error(error);
        }
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

            <div className='main'>

                {mainNews && (
                    <div className="main-news">
                        <div onClick={() => handleClick(mainNews.news_url)}>
                            <img src={mainNews.image_url} alt="" className='img_main' />
                        </div>
                        <div className="title-overlay">
                            <p className="title-text">{mainNews.title}</p>
                            <div className="stat">
                                <p className="time_main">{mainNews.meta}</p>
                            </div>
                        </div>
                        <div className="mini_news">
                            <div className="cont_mini">
                                {miniNews.slice(0, 3).map((news, index) => (
                                    <MiniNewsComponent key={index} news={news} handleClick={handleClick} />
                                ))}
                            </div>
                            <div className="cont_mini">
                                {miniNews.slice(3, 6).map((news, index) => (
                                    <MiniNewsComponent key={index} news={news} handleClick={handleClick} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {mainNews && (<div className="scroll_menu">
                    {scrollNewsData.map((news, index) => (
                        <Scrollnews key={index} title={news.title} meta={news.meta} news={news} handleClick={handleClick} />
                    ))}
                </div>)}


            </div>


        </div>
    )
};

