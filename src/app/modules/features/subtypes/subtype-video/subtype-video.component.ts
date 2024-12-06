import { DataService } from './../data/data.services';
import { Component, OnInit } from '@angular/core';
import { SubtypeData } from '@shared/interfaces/subtype';
import { map, Observable } from 'rxjs';
import { SubtypeVideo } from './interfaces/subType-video';

@Component({
  selector: 'app-subtype-video',
  templateUrl: './subtype-video.component.html',
  styleUrls: ['./subtype-video.component.scss']
})
export class SubtypeVideoComponent implements OnInit {
  selected: SubtypeVideo;
  SubtypeVideos$: Observable<SubtypeVideo[]>;

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  onSelectCard (value: SubtypeVideo) {
    this.selected = value;
  }

  constructor (private dataService: DataService) {}

  ngOnInit (): void {
    this.SubtypeVideos$ = this.dataService.createDb().pipe(
      map((data: SubtypeData) => {
        return data.SubtypeVideos;
      })
    );
  }
}
