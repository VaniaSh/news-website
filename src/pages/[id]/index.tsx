import React, {useContext, useEffect, useState} from 'react';
import {process} from "@/helpers/request";
import {StringContext} from "@/context/changeType";
import {useRouter} from "next/router";
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

    console.info(id, method, news)
    return (
        <div>
            {news?.title}
        </div>
    );
};

export default OneNews;