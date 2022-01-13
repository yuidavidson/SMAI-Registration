export default class PartyRegistrationModel {
  /**
   * @param {PartyRegistrationModel} from 
   */
  constructor(from) {
    this.campId = from.campId;
    this.partyId = from.partyId;
    this.camperId = from.camperId;
    this.owed = from.owed;
    this.paid = from.paid;
    this.customPricesRequests = from.customPricesRequests;
    this.isPaymentPlanRequested = from.isPaymentPlanRequested;
    this.status = from.status;
    this.notes = from.notes;

  }
}
/**
{
    "campId": null,
    "partyId": null,
    "camperId": null,
    "owed": null,
    "paid": null,
    "customPricesRequests": null,
    "isPaymentPlanRequested": null,
    "status": null,
    "notes": null
}
 */