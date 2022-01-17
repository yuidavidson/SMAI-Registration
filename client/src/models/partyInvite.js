export default class PartyInviteModel {
  static config = {
    "partyRegId": {
        "required": true
    },
    "partyId": {
        "required": true,
        "type": "text",
        "min": 0,
        "max": 4
    },
    "camperId": {
        "required": true
    },
    "dateCreated": {
        "required": true
    }
}; 
  /**
   * @param {PartyInviteModel} from 
   */
  constructor(from) {
    this.partyRegId = from.partyRegId;
    this.partyId = from.partyId;
    this.camperId = from.camperId;
    this.dateCreated = from.dateCreated;

  }
}
/**
{
    "partyRegId": null,
    "partyId": null,
    "camperId": null,
    "dateCreated": null
}
 */