import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }
  private searchTextSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  searchText$: Observable<string> = this.searchTextSubject.asObservable();

  setSearchText(text: string): void {
    this.searchTextSubject.next(text);
  }
}
