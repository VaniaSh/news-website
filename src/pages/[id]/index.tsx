import React, {useContext, useEffect, useState} from 'react';
import {process} from "@/helpers/request";
import {StringContext} from "@/context/changeType";
import {useRouter} from "next/router";
import styles from './styles.module.scss'
import {Spinner, Tag} from "@/components";
import Render from "@/components/Render";
import {AiFillEdit} from "react-icons/ai";

const OneNews = () => {
    const {method} = useContext(StringContext)
    const [news, setNews] = useState<News>()
    const {query: {id}, push} = useRouter()

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8080/${id}`,
                {headers: {'Accept': method}})
                .then(res => process(res))
                .then(res => {
                        setNews({...res.news,
                            body: res.news.body.length > 0 ? res.news.body : [res.news.body],
                            tags: typeof res.news.tags === 'string' ? [res.news.tags] : res.news.tags
                        })
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
                <div className={styles.editIcon}><AiFillEdit onClick={() => push(`/edit/${news?.id}`) } size={34}/></div>
            </div>
            <div className={styles.createdAt}>
                {formatDateTime(news?.created ? news?.created : '2023-03-20T12:29:31.401Z')}
            </div>
            <hr style={{width: '27rem'}}/>
            {news?.body.map(({content, type}) => (
                <Render type={type} content={content}/>
            ))}
            <div className={styles.tags}>
                {news?.tags.map((el) => (
                    <Tag name={el}></Tag>
                ))}
            </div>

        </div>

    );
};

export default OneNews;