export class Flashcard {
    question: string;
    answer: string;

    constructor(question: string, answer: string) {
        if (question) this.question = question;
        if (answer) this.answer = answer;
    }
}
