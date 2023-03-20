import React from 'react';
import styles from './styles.module.scss'
import {BiSearch} from "react-icons/bi";
const TextInput = () => {
    return (
        <div className={styles.form}>
            <input className={styles.input} placeholder="Search the article..."  type="text"/>
                <span className={styles.inputborder}></span>
            <BiSearch size={28}/>
        </div>
    );
};

export {TextInput};