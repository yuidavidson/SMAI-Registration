export default class CamperRegistrationModel {
  /**
   * @param {CamperRegistrationModel} from 
   */
  constructor(from) {
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