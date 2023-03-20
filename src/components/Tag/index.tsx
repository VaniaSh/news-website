import React from 'react';
import styles from './styles.module.scss'
const Tag = ({name}:{name:string}) => {
    return (
        <div className={styles.container}>
            {name}
        </div>
    );
};

export {Tag};