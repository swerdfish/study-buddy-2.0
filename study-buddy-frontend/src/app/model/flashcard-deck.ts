import { Flashcard } from './flashcard';
import { SpreadsheetInfo } from './spreadsheet-info';
import { GoogleApiService } from '../google-api.service';

export class FlashcardDeck {
    spreadsheetInfo: SpreadsheetInfo;
    title: string;
    cards: Flashcard[];

    constructor(spreadsheetId: string, title: string, queCol: string, ansCol: string, private gserv: GoogleApiService, headerRows?: number) {
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
}
