import styles from '../styles/Home.module.scss'
import React, {useContext, useEffect, useState} from "react";
import {process} from "@/helpers/request";
import {NewsCard, TextInput} from "@/components";
import {StringContext} from "@/context/changeType";

export default function Home() {

    const [news, setNews] = useState<News[]>([])
    const {method} = useContext(StringContext);


    useEffect(() => {
        fetch('http://localhost:8080/',
            {headers: {'Accept': method,}})
            .then(res => process(res))
            .then(res => {
                if (res.news?.length > 0) {
                    setNews(res.news)
                } else {
                    setNews([res.news as News])
                }
            })
            .catch(err => console.log(err))
    }, [method])
    if (news.length === 0) return <div>Loading</div>
    return (
        <div className={styles.container}>
            <div className={styles.searchContainer}>
                <TextInput/>
            </div>

            {
                news.map((el, key) => (
                    <NewsCard key={key} id={el.id} title={el.title}/>
                ))
            }
        </div>

    )
}
