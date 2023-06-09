import styles from '../styles/Home.module.scss'
import React, {useContext, useEffect, useState} from "react";
import {process} from "@/helpers/request";
import {NewsCard, Spinner, TextInput} from "@/components";
import {StringContext} from "@/context/changeType";
import {useRouter} from "next/router";
import Link from "next/link";
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";

export default function Home() {
    const {query} = useRouter()

    const [news, setNews] = useState<News[]>([])
    const {method} = useContext(StringContext);
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    console.log(query)
    useEffect(() => {
        setError('')
        setLoading(true)
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
                    throw new Error('Something went wrong...(')
                }
                if (res.news?.length > 0) {
                    setNews(res.news)
                    setLoading(false)
                } else {
                    setNews([res.news as News])
                    setLoading(false)
                }
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                setError(err)
            })
    }, [method, search, query])


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
                loading
                    ? <Spinner/>
                    : error ? <div style={{fontSize: 30, textAlign: "center", color: "red"}}>Dont have any article</div> : (
                    <div>
                        {
                            news ?
                                news.map((el, key) => (
                                    <NewsCard key={key} id={el.id} title={el.title} description={el.description} created={el.created} tags={el.tags} image_url={el.image_url}/>
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
            {/*{*/}
            {/*    news.length === 0 ? <div><Spinner/></div> : null*/}
            {/*}*/}

        </div>

    )
}
