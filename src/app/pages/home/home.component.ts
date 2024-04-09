import { Pokemon } from './../../interfaces/pokemon';
import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { ApiServiceService } from '../../services/api-service.service';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search.service';
import { ColorType, color_by_types } from '../../../common/types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public pokemons: Pokemon[] = [];
  public filteredPokemons: Pokemon[] = [];
  public searcher: any;
  public typeSelect: string = '';
  private _offset: number = 1;
  private _limit: number = 200;

  constructor(
    private apiService: ApiServiceService,
    private searchService: SearchService,
  ) {}

  async ngOnInit() {
    await this.getPokemonByid();
    this.getSelectedType();

    this.searchService.searchText$.subscribe((text) => {
      this.searcher = text;
      this.searcher = this.searcher.target?.value;
      this.search();
    });
  }

  public getSelectedType() {
    this.searchService.filterType.subscribe((res)=>{
      this.typeSelect = res
      this.filterByType(this.typeSelect);
    })
  }

  public filterByType(type: string) {
    if (type === '' || !type) {
      // Si el tipo está vacío o no está definido, mostrar todos los Pokémon
      this.filteredPokemons = this.pokemons;
    } else {
      // Filtrar los Pokémon por el tipo especificado
      this.filteredPokemons = this.pokemons.filter((pokemon: any) => {
        // Verificar si el tipo especificado está presente en el array de tipos del Pokémon
        return pokemon.type.some((pokemonType: any) => pokemonType.type.name === type);
      });
    }
  }

  public search() {
    if (this.searcher === '' || !this.searcher) {
      this.filteredPokemons = this.pokemons;
    } else {
      this.filteredPokemons = this.pokemons.filter((f: any) =>
        f.name?.toLowerCase().includes(this.searcher.toString().toLowerCase()) || f.id.toString().includes(this.searcher.toString())
      );
    }
  }

  public getColorType(color: ColorType): string {
    return color_by_types[color]
  }

  private async getPokemonByid() {
    for (
      let index = this._offset;
      index <= this._limit + this._offset;
      index++
    ) {
      this.apiService
        .getPokemoById(`pokemon/${index}`)
        .subscribe(async (res) => {
          const pokemon: Pokemon = {
            name: res.name,
            id: res.id,
            image: res.sprites.front_default,
            type: res.types,
          };
          this.pokemons.push(pokemon);
        });
    }
  }
}
