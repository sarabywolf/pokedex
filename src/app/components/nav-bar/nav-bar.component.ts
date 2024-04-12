import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Pokemon } from '../../interfaces/pokemon';
import { ApiServiceService } from '../../services/api-service.service';
import { CommonModule } from '@angular/common';
import { ColorType, color_by_types } from '../../../common/types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  public type:any = [];
  public pokemonType: string = '';

  constructor(
    private _searchService: SearchService,
    private _apiService: ApiServiceService
  ) {}

  async ngOnInit() {
    this.getType();
  }

  public getType() {
    this.type = Object.keys(color_by_types)
  }

  public selectType(type: any){
    this._searchService.searchTypeSubject.next(type.target.value);
  }

  setSearchText(text: any): void {
    this._searchService.setSearchText(text);
  }
}
