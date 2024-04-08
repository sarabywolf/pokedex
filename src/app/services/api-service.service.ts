import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonResults } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(
    private httpClient: HttpClient,
  ) {}

  getPokemoById(id: string):Observable<any> {
    return this.httpClient.get<any>(`https://pokeapi.co/api/v2/${id}`);
  }

  public getColorByType() {
    return this.httpClient.get<any>('assets/types-colors.json');
  }

}
