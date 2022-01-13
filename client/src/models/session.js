export default class SessionModel {
  /**
   * @param {SessionModel} from 
   */
  constructor(from) {
    this.name = from.name;
    this.organizer = from.organizer;
    this.campId = from.campId;
    this.startDate = from.startDate;
    this.endDate = from.endDate;
    this.minQuota = from.minQuota;
    this.maxQuota = from.maxQuota;
    this.notes = from.notes;
    this.internalName = from.internalName;

  }
}
/**
{
    "name": null,
    "organizer": null,
    "campId": null,
    "startDate": null,
    "endDate": null,
    "minQuota": null,
    "maxQuota": null,
    "notes": null,
    "internalName": null
}
 */