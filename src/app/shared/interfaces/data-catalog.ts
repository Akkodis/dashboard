import { Observable } from 'rxjs';
import { Sla } from './sla';

export interface DataDialog{
  listSla: Observable<Sla[]>;
  idReservation: any;
  idMec: any;
}
