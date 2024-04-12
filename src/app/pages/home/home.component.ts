import { Pokemon } from './../../interfaces/pokemon';
import { Component, HostListener } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { ApiServiceService } from '../../services/api-service.service';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search.service';
import { ColorType, color_by_types } from '../../../common/types';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, CommonModule, InfiniteScrollModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  public pokemons: Pokemon[] = [];
  public filteredPokemons: Pokemon[] = [];
  public _limit: number = 20;
  private _page = 0;
  private _isCloseToEnd = false;
  private _search: string = "";
  private _type: string = "";
  constructor(
    private apiService: ApiServiceService,
    private searchService: SearchService,
  ) {
  }

  async ngOnInit() {
    await this.getPokemonByid();
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer!.addEventListener("scroll", this.onScrollEvent)

    this._suscribeSubjects()
  }

  private _suscribeSubjects () {
    this.searchService.searchTextSubject.subscribe((text) => {
      const searchText = ((text.target) as HTMLInputElement)?.value;
      if(searchText === undefined) return;
      this._search = searchText;
      this.handleFilter();
    });
    this.searchService.searchTypeSubject.subscribe((selectedType)=>{
      if(selectedType === undefined) return;
      this._type = selectedType;
      this.handleFilter();
    })
  }

  handleFilter() {
    if(this._search === "" && this._type === "") {this.filteredPokemons = this.pokemons; return;}
    let pokemonsByType: Pokemon[] = this.pokemons;

    if(this._type.length > 0) {
      pokemonsByType = this.pokemons.filter((pokemon) => {
        return pokemon.types.some((type) => {
          return type.type.name === this._type;
        })
      })
    }

    if(this._search.length > 0) {
      pokemonsByType = pokemonsByType.filter((pokemon) =>
        pokemon.name?.toLowerCase().includes(this._search?.toString().toLowerCase()) || pokemon.id.toString().includes(this._search?.toString())
      );
    }

    this.filteredPokemons = pokemonsByType;
  }

  public getColorType(color: ColorType): string {
    return color_by_types[color]
  }

  private async getPokemonByid() {
    for (
      let index = (this._page * 20);
      index < this._limit;
      index++
    ) {
      this.apiService
        .getPokemoById(`pokemon/${index+1}`)
        .subscribe(async (res) => {
          const pokemon: Pokemon = {
            name: res.name,
            id: res.id,
            image: res.sprites.front_default,
            types: res.types,
          };
          this.pokemons.push(pokemon);
        });
       if(index % 20 === 0) {
        this._isCloseToEnd = false;
       }
    }
    if(!this._isCloseToEnd) {
      this._page += 1;
      this.filteredPokemons = this.pokemons;
    }
  }

  onScrollEvent =() => {
    const cardsContainer = document.getElementById("cards-container");
    const scrollTop = cardsContainer!.scrollTop;
    const scrollHeight = cardsContainer!.scrollHeight;
    const clientHeight = cardsContainer!.clientHeight;

    const closeToEnd = scrollTop + clientHeight - scrollHeight + 1000;

    if (closeToEnd > 0 && !this._isCloseToEnd && this._type === "" && this._search === "") {
      this._limit += 20;
      this._isCloseToEnd = true;
      this.getPokemonByid()
    }
  }
}
