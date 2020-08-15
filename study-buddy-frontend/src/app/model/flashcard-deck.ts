import { Flashcard } from './flashcard';
import { SpreadsheetInfo } from './spreadsheet-info';
import { GoogleApiService } from '../google-api.service';

export class FlashcardDeck {
    deckId: string;
    spreadsheetInfo: SpreadsheetInfo;
    title: string;
    cards: Flashcard[];

    constructor(spreadsheetId: string, title: string, queCol: string, ansCol: string, private gserv: GoogleApiService, headerRows?: number, deckId?: string) {
        if (deckId) {
            this.deckId = deckId;
        } else {
            this.deckId = this.hashCode("") + "" + new Date().getTime();
        }
        this.spreadsheetInfo = {
            spreadsheetId: spreadsheetId,
            queCol: queCol,
            ansCol: ansCol,
            sheetTitles: [],
            headerRows: headerRows ? headerRows : 0
        };
        this.title = title;
        this.cards = [];
    }

    populateCards(overwrite?: boolean) {
        this.gserv.getValues(this.spreadsheetInfo.spreadsheetId,
            `'${this.title}'!${this.spreadsheetInfo.queCol}:${this.spreadsheetInfo.ansCol}`).subscribe(response => {
                if (overwrite) this.cards = [];
                if (this.spreadsheetInfo.queCol < this.spreadsheetInfo.ansCol) {
                    for (let value of response.result.values.slice(this.spreadsheetInfo.headerRows)) {
                        this.cards.push(new Flashcard(value[0], value[value.length - 1]));
                    }
                } else {
                    for (let value of response.result.values.slice(this.spreadsheetInfo.headerRows)) {
                        this.cards.push(new Flashcard(value[value.length - 1], value[0]));
                    }
                }
            })
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
