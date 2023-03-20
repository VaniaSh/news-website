import React, {useContext, useEffect, useState} from 'react';
import styles from './index.module.scss'
import {Button, TextInput} from "@/components";
import {StringContext} from "@/context/changeType";
import {MIME, process} from "@/helpers/request";
import {XMLBuilder} from "fast-xml-parser";


const Create = ({
                    title,
                    description,
                    methodReq,
                    id
                }: { title: string, description: string, methodReq: string, id?: string | string[] | undefined }) => {
    const {method} = useContext(StringContext);
    const [state, setState] = useState<FormFields>({
        title: '',
        image_url: '',
        tags: ['news'],
        description: '',
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
        fetch(`http://localhost:8080/${id?id:''}`, {
            method: methodReq !== undefined ? 'PATCH' : 'POST',
            headers: {
                "Content-Type": method,
                "Accept": method,
            },
            body: (() => {
                let bodyOBJ = {...state, body: body}
                switch (method) {
                    case MIME.xml:
                        const builder = new XMLBuilder({});
                        return builder.build({Envelope: {Body: {news: bodyOBJ}}});
                    case MIME.json:
                    default:
                        return JSON.stringify(bodyOBJ)
                }
            })()
        }).then(process).then((res) => console.info(res))
    }
    useEffect(() => {
        if (methodReq === 'PATCH') {
            fetch(`http://localhost:8080/${id}`,
                {
                    headers: {'Accept': method}
                })
                .then(res => process(res))
                .then(res => {
                    setState({
                        ...res.news,
                        tags: typeof res.news.tags === 'string' ? [res.news.tags] : res.news.tags
                    })
                    setBody(res.news.body.length > 0 ? res.news.body : [res.news.body],)
                })
                .catch(err => console.log(err))
        }
    }, [methodReq])
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setState({...state, [name]: value});
    };
    console.log(body.length)
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <h1 style={{textTransform: 'uppercase'}}>
                    {title || 'news creation form'}
                </h1>
                <p>{description || 'Here you can create a new awesome new. And tell about<br/> something what happend in the world! :3'}
                </p>
            </div>
            <div className={styles.right}>
                <div className={styles.row}>
                    <TextInput placeholder={'Title'}
                               name={'title'}
                               value={state.title}
                               onChange={handleInputChange}
                               variant={'create'}

                    />

                    <TextInput placeholder={'Image url'}
                               name={'image_url'}
                               value={state.image_url}
                               onChange={handleInputChange}
                               variant={'create'}
                    />
                </div>
                <TextInput
                    placeholder={'Short description'}
                    name={'description'}
                    onChange={handleInputChange}
                    variant={"create"}
                    value={state.description}
                    type={'text'}
                />
                <hr style={{marginTop: '2rem', marginBottom: '4rem'}}/>
                {body.map(((item, idx,t) =>
                            <div style={{marginBottom: '1rem'}} key={idx}>
                                <TextInput
                                    type={'textarea'}
                                    value={item.content}
                                    onChange={(e: any) => {
                                        let tmp = [...body]
                                        tmp[idx].content = e.target.value
                                        setBody(tmp)
                                    }}
                                    variant={"create"}
                                    {...(
                                        t.length < 2 ?
                                            {} : {deleteItem: () => deleteBlock(item)}
                                    )}

                                />
                            </div>
                    )
                )}
                <Button variant={"secondary"} onClick={() => setBody((prevState) => [...prevState, {
                    type: 'plain',
                    content: '',
                }])}>Add new block
                </Button>
                <Button className={styles.addNewsButton}
                        onClick={createNews}>{methodReq == 'PATCH' ? 'Update' : 'Add'} news</Button>
            </div>


        </div>
    );
};

export default Create;