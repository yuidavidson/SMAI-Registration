export default class PartyInviteModel {
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