import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor () {}
  createDb (): Observable<any> {
    return of({
      SubtypeCits: [
        {
          name: 'CAM',
          icon: 'camera_enhance'
        },
        {
          name: 'CPM',
          icon: 'account_box'
        },
        {
          name: 'DENM',
          icon: 'account_box'
        },
        {
          name: 'MAPEM',
          icon: 'map'
        },
        {
          name: 'SPATEM',
          icon: 'account_box'
        },
        {
          name: 'SREM',
          icon: 'account_box'
        },
        {
          name: 'SSEM',
          icon: 'account_box'
        }
      ],
      quickAccessItems: [
        {
          label: 'Data Catalogue',
          icon: 'notes',
          url: '/datacatalogue',
          showOnMobile: false,
          showOnTablet: false,
          showOnDesktop: true
        },
        // {
        //   label: 'Sign Up',
        //   icon: 'login',
        //   showOnMobile: false,
        //   showOnTablet: false,
        //   showOnDesktop: true
        // },
        // {
        //   label: 'About',
        //   icon: 'help',
        //   showOnMobile: false,
        //   showOnTablet: false,
        //   showOnDesktop: true
        // },
        // {
        //   label: 'Pricing',
        //   icon: 'attach_money',
        //   showOnMobile: false,
        //   showOnTablet: false,
        //   showOnDesktop: true
        // },
        // {
        //   label: 'Docs',
        //   icon: 'notes',
        //   showOnMobile: false,
        //   showOnTablet: false,
        //   showOnDesktop: true
        // },
        // {
        //   label: 'Showcase',
        //   icon: 'slideshow',
        //   showOnMobile: false,
        //   showOnTablet: false,
        //   showOnDesktop: true
        // },
        // {
        //   label: 'Blog',
        //   icon: 'rss_feed',
        //   showOnMobile: false,
        //   showOnTablet: false,
        //   showOnDesktop: true
        // }
      ],
      SubtypeVideos: [
        {
          name: 'cam',
          video: 'http://static.videogular.com/assets/videos/videogular.mp4',
        },
        {
          name: 'cpm',
          video: '../../../../assets/images/AdobeStock_308828335.jpeg',
        },
        {
          name: 'denm',
          video: '../../../../assets/images/AdobeStock_337763612.jpeg',
        },
        {
          name: 'mapem',
          video: '../../../../assets/images/AdobeStock_314960143.jpeg',
        },
        {
          name: 'spatem',
          video: '../../../../assets/images/AdobeStock_224231490.jpeg',
        }
      ],
      DataType: [
        {
          name: 'Application',
          subtitle: ' most viewed apps',
          description:
            'in this category, there are several Application of different themes, which you can consult',
          icon: 'get_app',
          information: 'Info Application',
          descriptionInfo: 'Description',
        },
        {
          name: 'video',
          subtitle: ' most viewed Video',
          description:
            'in this category, there are several videos of different themes, which you can consult',
          icon: 'featured_video',
          information: 'Info Vidéo',
          descriptionInfo: 'Description',
        },
        {
          name: 'Image',
          subtitle: ' most viewed Image',
          description:
            'in this category, there are several Image of different themes, which you can consult',
          icon: 'image',
          information: 'Info Image',
          descriptionInfo: 'Description',
        },

        {
          name: 'Audio',
          subtitle: ' most viewed apps',
          description:
            'in this category, there are several Application of different themes, which you can consult',
          icon: 'mic',
          information: 'Info Audio',
          descriptionInfo: 'Description',
        },
        {
          name: 'Text',
          subtitle: ' most viewed apps',
          description:
            'in this category, there are several Application of different themes, which you can consult',
          icon: 'text_format',
          information: 'Info Text',
          descriptionInfo: 'Description ',
        },
        {
          name: 'Cits',
          subtitle: ' most viewed cits',
          description:
            'in this category, there are several Application of different themes, which you can consult',
          icon: 'directions_car',
          information: 'Info Cits',
          descriptionInfo: 'Description',
        }
      ]
    });
  }
}
