interface IOption {
    index: number;
    content: string;
}

interface IQuestion {
    index: number;
    question: string;
    options: IOption[],
    hint: string[]
}
interface IAnswer {
    [key: string]: string
}