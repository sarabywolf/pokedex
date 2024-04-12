import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }
   searchTextSubject = new BehaviorSubject<Event>({} as Event);
   searchTypeSubject = new BehaviorSubject<string>('');

  setSearchText(e : Event): void {
    this.searchTextSubject.next(e);
  }
}
