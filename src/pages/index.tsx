import styles from '../styles/Home.module.scss'
import React, {createContext, useEffect, useState} from "react";
import {process} from "@/helpers/request";
import {NewsCard} from "@/components";

interface MyContextType {
    dataType: string;
    setDataType: React.Dispatch<React.SetStateAction<string>>;
}

export default function Home() {
    const MyContext = createContext<MyContextType>({
        dataType: 'application/xml',
        setDataType: () => {
        },
    });
    const [dataType, setDataType] = useState<string>('application/xml');
    const [news, setNews] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/',
            {headers: {'Accept': dataType,}})
            .then(res => process(res))
            .then(res => setNews(res.news))
            .catch(err => console.log(err))
    }, [])
    console.log(news, typeof (news))
    return (
        <MyContext.Provider value={{dataType, setDataType}}>
            <div className={styles.container}>
                {
                    news?.map((el: any) => (
                        <NewsCard id={el.ID} title={el.title}/>
                    ))
                }
            </div>
        </MyContext.Provider>

    )
}
