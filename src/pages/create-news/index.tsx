import React, {useContext, useState} from 'react';
import styles from './index.module.scss'
import {Button} from "@/components";
import {StringContext} from "@/context/changeType";
import {MIME} from "@/helpers/request";
import {XMLBuilder} from "fast-xml-parser";
import {process} from "@/helpers/request";


const Create = () => {
    const {method} = useContext(StringContext);
    const [state, setState] = useState<FormFields>({
        title: '',
        image_url: '',
        tags: ['news', ''],
    })
    const [body, setBody] = useState<CustomBlock[]>([
        {
            type: 'plain',
            content: '',
        }
    ])
    const deleteBlock = (itemToDelete: any) => {
        setBody(prevItems => prevItems.filter(item => item !== itemToDelete));

    }

    const createNews = () => {
        fetch('http://localhost:8080/', {
            method: 'POST',
            headers: {
                "Content-Type": method,
                "Accept": method,
            },
            body: (()=>{
                let bodyOBJ = {...state, body: body}
                switch (method){
                    case MIME.xml:
                        const builder = new XMLBuilder({});
                        return builder.build({Envelope: {Body: {news: bodyOBJ}}});
                    case MIME.json:
                    default:
                        return JSON.stringify(bodyOBJ)
                }
            })()
        } ).then(process).then((res)=>console.info(res))
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setState({...state, [name]: value});
    };
    return (
        <div className={styles.container}>
            <h1>create</h1>
            <input type="text" placeholder={'title'} name={'title'} value={state.title} onChange={handleInputChange}/>
            <input type="text" placeholder={'image url'} name={'image_url'} value={state.image_url} onChange={handleInputChange}/>
            {body.map(((item, idx) =>
                <>
                    <input type="text"
                           value={item.content}
                           onChange={(e) => {
                               let tmp = [...body]
                               tmp[idx].content = e.target.value
                               setBody(tmp)
                           }}/>
                    <h1 onClick={() => deleteBlock(item)}>delete</h1>
                </>
                )
            )}
            <button onClick={() => setBody((prevState) => [...prevState, {
                type: 'plain',
                content: '',
            }])}>Add new block
            </button>
            <Button onClick={createNews}>add news</Button>
        </div>
    );
};

export default Create;