import styles from '../styles/Home.module.scss'
import React, {useContext, useEffect, useState} from "react";
import {process} from "@/helpers/request";
import {NewsCard, TextInput} from "@/components";
import {StringContext} from "@/context/changeType";
import {useRouter} from "next/router";
import Link from "next/link";
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";

export default function Home() {
    const {query} = useRouter()

    const [news, setNews] = useState<News[]>([])
    const {method} = useContext(StringContext);
    const [search, setSearch] = useState('')

    console.log(query)
    useEffect(() => {
        fetch(`http://localhost:8080/?${new URLSearchParams({
                ...(search ? {search: search} : {}),
                ...(query.page ? {skip: `${(parseInt(query.page as string) - 1) * 10}`} : {}),
                ...(query.tag ? {tag: query.tag as string} : {}),
            })}`,
            {headers: {'Accept': method,}})
            .then(res => process(res))
            .then(res => {
                if (!res.news) {
                    setNews([])
                    throw new Error()
                }
                if (res.news?.length > 0) {
                    setNews(res.news)
                } else {
                    setNews([res.news as News])
                }
            })
            .catch(err => console.log(err))
    }, [method, search, query])

    console.log(news)

    return (
        <div className={styles.container}>
            <div className={styles.searchContainer}>
                <TextInput
                    placeholder={'Search'}
                    value={search}
                    onChange={(e: any) => setSearch(e.target.value)}
                    name={'search'}
                    variant={'form'}
                />
            </div>
            {
                news.length === 0 ? <div>Loading</div> : null
            }
            {
                news ?
                    news.map((el, key) => (
                        <NewsCard key={key} id={el.id} title={el.title} description={el.description}/>
                    )) : null
            }
            <div className={styles.containerLinks}>
                <Link className={styles.link} href={`?${new URLSearchParams({
                    page: (() => {
                        let page = parseInt(query.page as string)
                        if (page > 1) {
                            page -= 1
                        } else {
                            page = 1
                        }
                        return `${page}`
                    })()
                })}`}><AiOutlineArrowLeft/></Link>
                <Link className={styles.link} href={`?${new URLSearchParams({
                    page: `${query.page ? parseInt(query.page as string) + 1 : 2}`
                })}`}><AiOutlineArrowRight/></Link>
            </div>
        </div>

    )
}
