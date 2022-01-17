export default class CampModel {
  static config = {
    "name": {
        "required": true,
        "type": "text",
        "min": 0,
        "max": 100
    },
    "organizer": {
        "required": true,
        "type": "text",
        "min": 0,
        "max": 100
    },
    "startDate": {
        "required": true
    },
    "endDate": {
        "required": true
    },
    "regStartDate": {
        "required": null
    },
    "regEndDate": {
        "required": null
    },
    "minQuota": {
        "required": true
    },
    "maxQuota": {
        "required": true
    },
    "notes": {
        "required": null,
        "type": "text",
        "multiple": true,
        "min": 0,
        "max": 4096
    },
    "lateRegFee": {
        "required": true
    }
}; 
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