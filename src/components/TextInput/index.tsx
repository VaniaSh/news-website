import React, {FC, useEffect, useState} from 'react';
import styles from './styles.module.scss'
import {BiSearch} from "react-icons/bi";

const TextInput: FC<TextInputProps> = ({variant, value, placeholder, onChange, name}) => {
    const [inputStyle, setInputStyle] = useState('');

    useEffect(() => {
        setInputStyle(
            [
                styles.form,
                variant ? styles[variant] : styles.search,
            ].join(' ')
        );
    }, []);

    return (
        <div className={inputStyle}>
            <input
                className={styles.input}
                placeholder={placeholder}
                type="text"
                name={name}
                value={value}
                onChange={onChange}
            />
            <span className={styles.inputBorder}/>
            {
                variant === 'form' ? <BiSearch size={28}/> : ''
            }
        </div>
    );
};

export {TextInput};