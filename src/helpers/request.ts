import {XMLParser} from "fast-xml-parser";

export const MIME = {xml: 'application/xml', json: 'application/json'}
export const process = (response: Response) => {
    switch (response.headers.get("content-type")?.split(';')[0]) {
        case MIME.json: {
            return response.json()
        }
        case MIME.xml: {
            return response.text()
                .then(data => {
                    const parser = new XMLParser();
                    const bookObj = parser.parse(data);
                    return bookObj.Envelope.Body;
                })
        }
        default: {
            throw new Error('could not parse response, please specify response content [type]');
        }
    }
}