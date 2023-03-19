import React from 'react';
import styles from './styles.module.scss'
import Link from "next/link";

const NewsCard = ({title, id}: { title: string, id: string }) => {
    return (
           <Link href={`/${id}`}>
               <div className={styles.container}>
                   {title}
               </div>
           </Link>
    );
};

export {NewsCard};