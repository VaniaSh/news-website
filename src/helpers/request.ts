import {XMLParser} from "fast-xml-parser";

export const process = (response: Response) => {
    switch (response.headers.get("content-type")?.split(';')[0]) {
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