import { Time } from '@angular/common';

export class Obra{
  public key: string;
  public edificioId: string;
  public description: string;
  public startDate: Date;
  public endDate: Date;
  public startTime: Time;
  public endTime: Time;
  public userCreatedId: string;
  public dateCreated: any;
}
