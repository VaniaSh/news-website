interface FormFields {
    title: string
    image_url: string
    tags: string[]
    description: string
}

interface CustomBlock {
    type: 'plain' | 'bold' | 'italic' | 'subTitle'
    content: string;
}