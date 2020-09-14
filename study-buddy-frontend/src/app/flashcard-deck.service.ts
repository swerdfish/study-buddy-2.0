import { HttpClient } from '@angular/common/http';
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

  createFlashcardDeck(deck: FlashcardDeck, token: string): Observable<FlashcardDeck> {
    return this.http.post<FlashcardDeck>(
      this.baseUrl + "/flashcardDeck",
      deck,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
  }

  createFlashcardDecks(decks: FlashcardDeck[], token: string): Observable<FlashcardDeck[]> {
    return this.http.post<FlashcardDeck[]>(
      this.baseUrl + "/flashcardDecks",
      decks,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
  }

  // READ

  getFlashcardDeckById(deckId: number, token: string): Observable<FlashcardDeck> {
    return this.http.get<FlashcardDeck>(
      this.baseUrl + `/flashcardDeck/${deckId}`,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
  }

  getFlashcardDecksBySpreadsheetIdOwnedByUser(ssId: number, token: string): Observable<FlashcardDeck[]> {
    return this.http.get<FlashcardDeck[]>(
      this.baseUrl + `/flashcardDecks/${ssId}`,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
  }

  getFlashcardDecksOwnedByUser(token: string): Observable<FlashcardDeck[]> {
    return this.http.get<FlashcardDeck[]>(
      this.baseUrl + `/flashcardDecks`,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
  }

  // UPDATE

  updateFlashcardDeck(deck: FlashcardDeck, token: string): Observable<FlashcardDeck> {
    return this.http.put<FlashcardDeck>(
      this.baseUrl + "/flashcardDeck",
      deck,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
  }

  updateFlashcardDecks(decks: FlashcardDeck[], token: string): Observable<FlashcardDeck[]> {
    return this.http.put<FlashcardDeck[]>(
      this.baseUrl + "/flashcardDecks",
      decks,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
  }

  // DELETE

  deleteFlashcardDeckById(deckId: number, token: string): Observable<void> {
    return this.http.delete<void>(
      this.baseUrl + `flashcardDeck/${deckId}`,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
  }

  deleteFlashcardDecksByIds(deckIds: number[], token: string): Observable<void> {
    return this.http.request<void>(
      'delete',
      this.baseUrl + `/flashcardDecks`,
      {
        body: deckIds,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
  }

  deleteFlashcardDecksOwnedByUser(token: string): Observable<void> {
    return this.http.delete<void>(
      this.baseUrl + `/flashcardDecks/user`,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
  }

}
