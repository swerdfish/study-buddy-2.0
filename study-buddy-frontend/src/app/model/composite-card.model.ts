export class CompositeCard {
    question: string;
    answer: string;
    title: string;
    deckId: string;

    constructor(question: string, answer: string, title: string, deckId: string) {
        this.question = question;
        this.answer = answer;
        this.title = title;
        this.deckId = deckId;
    }
}
