import { Pokemon } from './../../interfaces/pokemon';
import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { ApiServiceService } from '../../services/api-service.service';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search.service';

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
  public colors: [] = [];
  private _offset: number = 0;
  private _limit: number = 200;

  constructor(
    private apiService: ApiServiceService,
    private searchService: SearchService,
  ) {}

  async ngOnInit() {
    await this.getPokemonByid();
    this.getColorType();
    this.searchService.searchText$.subscribe((text) => {
      this.searcher = text;
      this.searcher = this.searcher.target?.value;
      this.search();
    });
  }

  public search() {
    console.log(this.searcher);
    if (this.searcher === '' || !this.searcher) {
      this.filteredPokemons = this.pokemons;
    } else {
      this.filteredPokemons = this.pokemons.filter((f: any) =>
        f.name?.toLowerCase().includes(this.searcher.toString().toLowerCase()),
      );
    }
  }

  public async getColorType() {
    this.apiService.getColorByType().subscribe((res) => {
      this.colors = res;
    });
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
