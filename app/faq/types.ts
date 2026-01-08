export interface FaqT {
    category: string
    questions: Question[]
}

export interface Question {
    id: number
    question: string
    answer: string
}
