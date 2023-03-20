import React, {FC} from 'react';
import styles from './styles.module.scss'
interface RenderProps{
    type: string
    content: string
}
const Render:FC<RenderProps> = ({type, content}) => {
    return (
        <p className={styles[type]}>
            {content}
        </p>
    );
};

export default Render;