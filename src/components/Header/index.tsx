import React from 'react';
import Link from "next/link";
import {Button, Checkbox} from "@/components";
import styles from './styles.module.scss'
import {useRouter} from "next/router";
const Header = () => {
    const router = useRouter()
    return (
        <div className={styles.header}>
            <div className={styles.group}>
                <div><Link href={'/'} className={styles.news}>NEWS</Link></div>
                <div className={styles.buttons}>
                    <div><Checkbox/></div>
                    <div>
                        <Button onClick={()=> router.push('/create-news')}>Create</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export {Header};