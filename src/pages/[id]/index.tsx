import React, {useContext, useEffect, useState} from 'react';
import {process} from "@/helpers/request";
import {StringContext} from "@/context/changeType";
import {useRouter} from "next/router";
import styles from './styles.module.scss'
import {Spinner} from "@/components";
import Render from "@/components/Render";
import {AiFillEdit} from "react-icons/ai";

const OneNews = () => {
    const {method} = useContext(StringContext)
    const [news, setNews] = useState<News>()
    const {query: {id}} = useRouter()

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8080/${id}`,
                {headers: {'Accept': method}})
                .then(res => process(res))
                .then(res => {
                    setNews(res.news)
                })
                .catch(err => console.log(err))
        }
    }, [method, id])
    console.log(news, '<< news');

    function formatDateTime(dateTimeStr: string): string {
        const date = new Date(dateTimeStr);
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    const dateTimeStr = '2023-03-20T12:29:31.401Z';
    const formattedDateTime: string = formatDateTime(dateTimeStr);
    console.log(formattedDateTime);


    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                {news?.image_url ?
                    <img alt={'titleImg'} src={news.image_url}/>
                    :
                    <Spinner/>
                }
            </div>
            <div className={styles.titleBlock}>
                <h1>{news?.title}</h1>
                <div className={styles.editIcon}><AiFillEdit size={34}/></div>
            </div>
            <div className={styles.createdAt}>
                {formatDateTime(news?.created ? news?.created : '2023-03-20T12:29:31.401Z')}
            </div>
            <hr style={{width:'27rem'}}/>
            {news?.body.map(({content, type}) => (
                <Render type={type} content={content}/>
            ))}
        </div>

    );
};

export default OneNews;