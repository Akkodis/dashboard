import { Component, OnInit } from '@angular/core';

export interface SubtypeImage {
  name: string;
  image: string;
}

@Component({
  selector: 'app-subtype-image',
  templateUrl: './subtype-image.component.html',
  styleUrls: ['./subtype-image.component.scss']
})
export class SubtypeImageComponent implements OnInit {
  selected: SubtypeImage;

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  onSelectCard(value: SubtypeImage) {
    this.selected = value;
  }
  SubtypeCits: SubtypeImage[] = [
    {
      name: 'cam',
      image: '../../../../assets/images/AdobeStock_228814723.jpeg'
    },
    {
      name: 'cpm',
      image: '../../../../assets/images/AdobeStock_308828335.jpeg'
    },
    {
      name: 'denm',
      image: '../../../../assets/images/AdobeStock_337763612.jpeg'
    },
    {
      name: 'mapem',
      image: '../../../../assets/images/AdobeStock_314960143.jpeg'
    },
    {
      name: 'spatem',
      image: '../../../../assets/images/AdobeStock_224231490.jpeg'
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
