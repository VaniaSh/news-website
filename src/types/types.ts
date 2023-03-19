declare global{
    export type News ={
        id: string,
        title: string,
        body: NBody

    }
    interface NBody{
        type: 'plain' | 'bold' | 'italic' | 'subTitle'
        content: string;
    }

}
export default undefined;

