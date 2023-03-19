import React, {FC} from 'react';
import styles from './styles.module.scss'

interface ButtonProps {
    children: React.ReactNode
    onClick: () => void
}
const Button:FC<ButtonProps> = ({children, onClick}) => {
    return (
        <button onClick={onClick} className={styles.button}>
            {children}
        </button>
    );
};

export {Button};