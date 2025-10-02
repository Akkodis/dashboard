import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavsearchService } from './navsearch.service';

@Component({
    selector: 'app-nav-search',
    templateUrl: './nav-search.component.html',
    styleUrls: ['./nav-search.component.scss'],
    standalone: false
})
export class NavSearchComponent implements OnInit {
  @ViewChild('searchbar') searchbar: ElementRef;
  searchText = '';
  toggleSearch: boolean = false;

  /**
   * L'utilisation d'un listner n'est pas considéré comme meilleur pratique,
   * c'est vrai qu'on terme de UX c'est plus intéréssante mais cela impacte
   * les performances de l'application quand elle devient volumineuse.
   */

  @HostListener('document:click', ['$event'])
  searchClose(event: { target: any; }) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      // this.searchText = '';
      this.toggleSearch = false
    }
  }

  constructor(private eRef: ElementRef, private navSearchData: NavsearchService) { }

  ngOnInit(): void {
    this.navSearchData.searchThis(this.searchText)
  }

  openSearch() {
    this.toggleSearch = true
    this.searchbar.nativeElement.focus()
  }

  searchCloseOnX() {
    this.searchText = ''
    this.toggleSearch = false
  }

  searchOnType(value: string) {
    this.navSearchData.searchThis(value)
  }
}
