import React, {FC} from 'react';
import styles from './styles.module.scss'
import Link from "next/link";
import {Tag} from "@/components";

interface NewsCardProps {
    title: string
    id: string
}
const NewsCard:FC<NewsCardProps> = ({title,id }) => {
    return (
           <div className={styles.block}>
               <Link href={`/${id}`}>
                   <div className={styles.container}>
                       <div className={styles.content}>
                           <div className={styles.contentT}>
                               <div className={styles.title}>{title}</div>
                               <div className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem consequuntur eveniet odio repellendus! Accusamus, iusto nam numquam provident similique ut!
                               </div>
                           </div>
                           <div className={styles.info}>
                               <div>Saturday 18, March</div>
                               <Tag name={'Sport'}/>
                           </div>
                       </div>
                       <div className={styles.imageContainer}>
                           <img alt={'photo'} src={'data:image/jpeg;base64,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'}/>
                       </div>
                   </div>
               </Link>
           </div>
    );
};

export {NewsCard};