import { Pokemon } from './../../interfaces/pokemon';
import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { ApiServiceService } from '../../services/api-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public pokemons: Pokemon[]= [];
  public colors: [] = []
  private _offset: number = 0;
  private _limit: number = 200;

  constructor(private apiService: ApiServiceService){

  }

  async ngOnInit() {
    await this.getPokemonByid();
    this.getColorType();
  }

  async getPokemonByid(){
    for (let index = this._offset; index <= this._limit + this._offset; index++) {
      this.apiService.getPokemoById(`pokemon/${index}`).subscribe(async (res) => {
        const pokemon:Pokemon = {
          name: res.name,
          id: res.id,
          image: res.sprites.front_default,
          type: res.types
        }
        this.pokemons.push(pokemon);
      });
    }
  }

  public async getColorType(){
    this.apiService.getColorByType().subscribe(res => {
      this.colors = res;
      console.log(this.colors);
    })
  }

}
