export interface ICamera {
  id?: number;
  identifier?: string;
  location?: string;
}

export class Camera implements ICamera {
  constructor(public id?: number, public identifier?: string, public location?: string) {}
}
