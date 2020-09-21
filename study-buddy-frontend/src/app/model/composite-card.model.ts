export class CompositeCard {
    question: string;
    answer: string;
    title: string;
    deckId: string;
    color: string;

    constructor(question: string, answer: string, title: string, color: string, deckId: string) {
        this.question = question;
        this.answer = answer;
        this.title = title;
        this.color = color;
        this.deckId = deckId;
    }
}
