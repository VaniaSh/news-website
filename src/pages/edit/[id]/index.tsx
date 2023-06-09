import React from 'react';
import Create from "@/pages/create-news";
import {useRouter} from "next/router";

const EditPage = () => {
    const {query: {id}} = useRouter()
    return (
            <Create id={id} methodReq={'PATCH'} title={'Edit Form'} description={'Form Editor. Here you can edit your existing article'}/>
    );
};

export default EditPage;