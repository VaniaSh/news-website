import React, {FC, useContext, useEffect, useState} from 'react';
import styles from './styles.module.scss'
import {StringContext} from "@/context/changeType";

interface CheckBoxProps {
}

const Checkbox: FC<CheckBoxProps> = () => {
    const [check, setCheck] = useState(false)
    const { updateString } = useContext(StringContext);

    useEffect(() => {
        updateString(check ? 'application/json' : 'application/xml')
    }, [check])
    return (
        <>
            <div className={styles.checkbox}>
                <input className={styles.yep} id="checkVariant" type="checkbox" checked={check} onChange={() => setCheck(!check)}/>
                <label htmlFor="checkVariant"></label>
            </div>
        </>
    );
};

export {Checkbox};