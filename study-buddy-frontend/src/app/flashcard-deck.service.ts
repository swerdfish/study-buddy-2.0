import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FlashcardDeck } from './model/flashcard-deck';

@Injectable({
  providedIn: 'root'
})
export class FlashcardDeckService {

  private readonly baseUrl = "http://localhost:9000";

  constructor(private http: HttpClient) { }

  // CREATE

  createFlashcardDeck(deck: FlashcardDeck, token: string): Observable<HttpResponse<FlashcardDeck>> {
    return this.http.post<FlashcardDeck>(
      this.baseUrl + "/flashcardDeck",
      deck,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        observe: 'response'
      }
    );
  }

  createFlashcardDecks(decks: FlashcardDeck[], token: string): Observable<HttpResponse<FlashcardDeck[]>> {
    return this.http.post<FlashcardDeck[]>(
      this.baseUrl + "/flashcardDecks",
      decks,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        observe: 'response'
      }
    );
  }

  // READ

  getFlashcardDeckById(deckId: number, token: string): Observable<HttpResponse<FlashcardDeck>> {
    return this.http.get<FlashcardDeck>(
      this.baseUrl + `/flashcardDeck/${deckId}`,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        observe: 'response'
      }
    );
  }

  getFlashcardDecksBySpreadsheetIdOwnedByUser(ssId: number, token: string): Observable<HttpResponse<FlashcardDeck[]>> {
    return this.http.get<FlashcardDeck[]>(
      this.baseUrl + `/flashcardDecks/${ssId}`,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        observe: 'response'
      }
    );
  }

  getFlashcardDecksOwnedByUser(token: string): Observable<HttpResponse<FlashcardDeck[]>> {
    return this.http.get<FlashcardDeck[]>(
      this.baseUrl + `/flashcardDecks`,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        observe: 'response'
      }
    );
  }

  // UPDATE

  updateFlashcardDeck(deck: FlashcardDeck, token: string): Observable<HttpResponse<FlashcardDeck>> {
    return this.http.put<FlashcardDeck>(
      this.baseUrl + "/flashcardDeck",
      deck,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        observe: 'response'
      }
    );
  }

  updateFlashcardDecks(decks: FlashcardDeck[], token: string): Observable<HttpResponse<FlashcardDeck[]>> {
    return this.http.put<FlashcardDeck[]>(
      this.baseUrl + "/flashcardDecks",
      decks,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        observe: 'response'
      }
    );
  }

  // DELETE

  deleteFlashcardDeckById(deckId: number, token: string): Observable<HttpResponse<void>> {
    console.log(deckId);
    return this.http.delete<void>(
      this.baseUrl + `flashcardDeck/${deckId}`,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        observe: 'response'
      }
    );
  }

  deleteFlashcardDecksByIds(deckIds: number[], token: string): Observable<HttpResponse<void>> {
    return this.http.request<void>(
      'delete',
      this.baseUrl + `/flashcardDecks`,
      {
        body: deckIds,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        observe: 'response'
      }
    );
  }

  deleteFlashcardDecksOwnedByUser(token: string): Observable<HttpResponse<void>> {
    return this.http.delete<void>(
      this.baseUrl + `/flashcardDecks/user`,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        observe: 'response'
      }
    );
  }

}
