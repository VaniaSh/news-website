import React, {FC, useEffect, useState} from 'react';
import styles from './styles.module.scss'
import {BiSearch} from "react-icons/bi";
import {RxCross2} from "react-icons/rx";

const TextInput: FC<TextInputProps> = ({deleteItem, type, variant, value, placeholder, onChange, name}) => {
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
            {type !== 'text' ? (<input
                className={styles.input}
                placeholder={placeholder}
                type={"text"}
                name={name}
                value={value}
                onChange={onChange}
            />) : (
                <textarea
                    className={styles.input}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}/>
            )}
            <span className={styles.inputBorder}/>
            {
                variant === 'form' ? <BiSearch size={28}/> : ''
            }
            {
                deleteItem ? <RxCross2 className={styles.deleteIcon} size={28} onClick={deleteItem}/> : ''
            }
        </div>
    );
};

export {TextInput};