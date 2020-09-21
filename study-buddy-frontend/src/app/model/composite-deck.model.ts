import { CompositeCard } from './composite-card.model';
import { FlashcardDeck } from './flashcard-deck';

export class CompositeDeck {
    compDeckId: string;
    deckIds: string[];
    compCards: CompositeCard[];

    constructor(decks: FlashcardDeck[], compDeckId?: string) {
        this.deckIds = [];
        this.compCards = [];
        for (let deck of decks) {
            this.deckIds.push(deck.deckId);
            for (let card of deck.cards) {
                this.compCards.push(new CompositeCard(card.question, card.answer, deck.title, deck.color, deck.deckId));
            }
        }
        if (compDeckId) this.compDeckId = compDeckId;
        else {
            this.compDeckId = this.hashCode(this.deckIds.join()) + "" + new Date().getTime();
        }
    }

    hashCode(str: string): number {
        let hash = 0;
        if (str.length == 0) return hash;
        for (let i = 0; i < str.length; i++) {
            let c = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + c;
            hash = hash & hash;
        }
        return hash;
    }
}
