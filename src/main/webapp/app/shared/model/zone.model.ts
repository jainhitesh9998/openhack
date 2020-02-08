import { ICamera } from 'app/shared/model/camera.model';

export interface IZone {
  id?: number;
  identifier?: string;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  camera?: ICamera;
}

export class Zone implements IZone {
  constructor(
    public id?: number,
    public identifier?: string,
    public x1?: number,
    public y1?: number,
    public x2?: number,
    public y2?: number,
    public camera?: ICamera
  ) {}
}
