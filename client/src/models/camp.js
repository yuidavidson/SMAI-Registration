export default class CampModel {
  /**
   * @param {CampModel} from 
   */
  constructor(from) {
    this.name = from.name;
    this.organizer = from.organizer;
    this.startDate = from.startDate;
    this.endDate = from.endDate;
    this.regStartDate = from.regStartDate;
    this.regEndDate = from.regEndDate;
    this.minQuota = from.minQuota;
    this.maxQuota = from.maxQuota;
    this.notes = from.notes;
    this.lateRegFee = from.lateRegFee;

  }
}
/**
{
    "name": null,
    "organizer": null,
    "startDate": null,
    "endDate": null,
    "regStartDate": null,
    "regEndDate": null,
    "minQuota": null,
    "maxQuota": null,
    "notes": null,
    "lateRegFee": null
}
 */