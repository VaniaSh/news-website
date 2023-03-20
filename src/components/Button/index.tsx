import React, {FC, useEffect, useState} from 'react';
import styles from './styles.module.scss'

interface ButtonProps {
    children: React.ReactNode
    onClick: () => void
    variant?:  'primary' | 'secondary';
    className?: string;
}


const Button:FC<ButtonProps> = ({children, onClick, variant, className}) => {
    const [btnStyles, setBtnStyle] = useState('');

    useEffect(() => {
        setBtnStyle(
            [
                styles.button,
                variant ? styles[variant] : styles.primary,
                className ? className : '',
            ].join(' ')
        );
    }, []);
    return (
        <button onClick={onClick} className={btnStyles}>
            {children}
        </button>
    );
};

export {Button};