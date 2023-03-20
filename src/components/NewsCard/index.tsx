import React, {FC} from 'react';
import styles from './styles.module.scss'
import Link from "next/link";
import {Tag} from "@/components";
import {formatDateTime} from '@/helpers/changeDate'
interface NewsCardProps {
    title: string
    id: string
    description: string
    tags: string[]
    created: string
    image_url: string
}
const NewsCard:FC<NewsCardProps> = ({title,id ,description,tags,created,image_url}) => {

    return (
           <div className={styles.block}>
               <Link href={`/${id}`}>
                   <div className={styles.container}>
                       <div className={styles.content}>
                           <div className={styles.contentT}>
                               <div className={styles.title}>{title}</div>
                               <div className={styles.description}>{description}
                               </div>
                           </div>
                           <div className={styles.info}>
                               <div>{formatDateTime(created)}</div>
                               <Tag name={tags}/>
                           </div>
                       </div>
                       <div className={styles.imageContainer}>
                           <img alt={'photo'} src={image_url}/>
                       </div>
                   </div>
               </Link>
           </div>
    );
};

export {NewsCard};