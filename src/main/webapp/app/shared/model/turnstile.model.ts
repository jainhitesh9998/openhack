import { Moment } from 'moment';
import { IZone } from 'app/shared/model/zone.model';
import { ICamera } from 'app/shared/model/camera.model';

export interface ITurnstile {
  id?: number;
  identifier?: string;
  turnstileId?: string;
  androidThingsInId?: string;
  androidThingsOutId?: string;
  created?: Moment;
  zoneIn?: IZone;
  zoneOut?: IZone;
  cameraIn?: ICamera;
  cameraOut?: ICamera;
}

export class Turnstile implements ITurnstile {
  constructor(
    public id?: number,
    public identifier?: string,
    public turnstileId?: string,
    public androidThingsInId?: string,
    public androidThingsOutId?: string,
    public created?: Moment,
    public zoneIn?: IZone,
    public zoneOut?: IZone,
    public cameraIn?: ICamera,
    public cameraOut?: ICamera
  ) {}
}
