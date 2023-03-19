import React, {useState} from 'react';
import styles from './index.module.scss'

const Create = () => {
    const [state, setState] = useState({
        title: '',
        imgUrl: '',
        tags: ['news', ''],
    })
    const [body, setBody] = useState([
        {
            type: 'plain',
            content: '',
        }
    ])
    return (
        <div className={styles.container}>
            <h1>create</h1>
            {body.map(((item, idx) =>
                <input type="text"
                       value={item.content}
                       onChange={(e) => {
                           let tmp = [...body]
                           tmp[idx].content = e.target.value
                           setBody(tmp)
                       }}/>)
            )}
            <button onClick={() => setBody((prevState) => [...prevState, {
                type: 'plain',
                content: '',
            }])}>Add new block
            </button>
        </div>
    );
};

export default Create;