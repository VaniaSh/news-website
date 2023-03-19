import React, {useContext} from 'react';
import Link from "next/link";
import {Checkbox} from "@/components";
import {StringContext} from "@/context/changeType";

const Header = () => {
    const {method} = useContext(StringContext);
    return (
        <div>
            <div>
                Logo
                <h2>{method}</h2>
            </div>
            <div>
                {/*Search/*/}
                <div>
                    <Link href={'/create-news'}>Create</Link>
                </div>
                <div>
                    <Checkbox/>
                </div>
            </div>
        </div>
    );
};

export {Header};