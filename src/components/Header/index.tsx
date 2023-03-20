import React from 'react';
import Link from "next/link";
import {Button, Checkbox, TextInput} from "@/components";
// import {StringContext} from "@/context/changeType";
import styles from './styles.module.scss'
import {useRouter} from "next/router";
const Header = () => {
    // const {method} = useContext(StringContext);
    const router = useRouter()
    return (
        <div className={styles.header}>
            <div className={styles.group}>
                <div><Link href={'/'} className={styles.news}>NEWS</Link></div>
                <div className={styles.buttons}>
                    <div><TextInput/></div>
                    <div><Checkbox/></div>
                    {/*<h2>{method}</h2>*/}
                    <div>
                        <Button onClick={()=> router.push('/create-news')}>Create</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export {Header};