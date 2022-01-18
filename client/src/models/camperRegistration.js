export default class CamperRegistrationModel {
  static config = {
    "partyId": {
        "required": true,
        "type": "text",
        "min": 0,
        "max": 4
    },
    "camperId": {
        "required": true
    },
    "campId": {
        "required": true
    },
    "neighborhood": {
        "required": true,
        "type": "text",
        "min": 0,
        "max": 4
    }
}; 
  /**
   * @param {CamperRegistrationModel} from 
   */
  constructor(from) {
    this.id = from.id; // default ID field
    this.partyId = from.partyId;
    this.camperId = from.camperId;
    this.campId = from.campId;
    this.neighborhood = from.neighborhood;

  }
}
/**
{
    "partyId": null,
    "camperId": null,
    "campId": null,
    "neighborhood": null
}
 */