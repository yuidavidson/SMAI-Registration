export default class SessionModel {
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
    "campId": {
        "required": true
    },
    "startDate": {
        "required": true
    },
    "endDate": {
        "required": true
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
    "internalName": {
        "required": null,
        "type": "text",
        "min": 0,
        "max": 100
    }
}; 
  /**
   * @param {SessionModel} from 
   */
  constructor(from) {
    this.id = from.id; // default ID field
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