import React from 'react';
import styles from "./styles.module.scss";

const Spinner = () => {
    return (
        <div className={styles.loading}>
            <div className={styles.wrapper}>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <div className={styles.shadow}></div>
                <div className={styles.shadow}></div>
                <div className={styles.shadow}></div>
            </div>
        </div>
    );
};

export {Spinner};