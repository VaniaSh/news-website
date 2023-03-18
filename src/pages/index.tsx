import styles from '../styles/Home.module.scss'
import {createContext, useEffect, useState} from "react";
import {XMLParser} from 'fast-xml-parser';

interface MyContextType {
    dataType: string;
    setDataType: React.Dispatch<React.SetStateAction<string>>;
}

export default function Home() {
    const MyContext = createContext<MyContextType>({
        dataType: 'application/xml',
        setDataType: () => {
        },
    });
    const [dataType, setDataType] = useState<string>('application/xml');

    const process = (response: Response) => {
        switch (response.headers.get("content-type")?.split(';')[1]) {
            case 'application/json': {
                return response.json()
            }
            case 'application/xml': {
                return response.text()
                    .then(data => {
                        const parser = new XMLParser();
                        const bookObj = parser.parse(data);
                        return bookObj.Envelope.Body;
                    })
            }
            default: {
                throw new Error('could not parse response, please specify response content type');
            }
        }
    }

    useEffect(() => {
        fetch('http://localhost:8080/',
            {headers: {'Accept': dataType,}})
            .then(process)
            .then(res => console.log(res, '<< res'))
            .catch(err => console.log(err))
    }, [])


    return (
        <MyContext.Provider value={{dataType, setDataType}}>
            <div className={styles.container}>
                <h1 className={styles.title}><p>

                </p></h1>
                <h1 className={styles.title}>Home page</h1>
            </div>
        </MyContext.Provider>

    )
}
