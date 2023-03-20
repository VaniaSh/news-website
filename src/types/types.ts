declare global{
    export type News ={
        id: string,
        title: string,
        body: NBody[]
        image_url: string;
        created: string
        updated: string
        tags: string[]
        description: string

    }
    interface NBody{
        type: 'plain' | 'bold' | 'italic' | 'subTitle'
        content: string;
    }

}
export default undefined;

