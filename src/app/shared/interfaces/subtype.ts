import { DataType } from '@shared/interfaces/DataType';
import { SubtypeCits } from 'app/modules/features/subtypes/subtype-cits/interfaces/subtype-city';
import { SubtypeVideo } from 'app/modules/features/subtypes/subtype-video/interfaces/subType-video';
import { QuickAccessItem } from './quick-access-item';

export interface SubtypeData {
  SubtypeCits: SubtypeCits[];
  quickAccessItems: QuickAccessItem[];
  SubtypeVideos: SubtypeVideo[];
  DataType: DataType[];
}
