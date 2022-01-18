export default class PartyRegistrationModel {
  static config = {
    "campId": {
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
    "owed": {
        "required": true
    },
    "paid": {
        "required": true
    },
    "customPricesRequests": {
        "required": null,
        "type": "text",
        "multiple": true,
        "min": 0,
        "max": 4096
    },
    "isPaymentPlanRequested": {
        "required": true,
        "type": "bool"
    },
    "status": {
        "required": true,
        "type": "text",
        "dict": {
            "edit": "editing",
            "subm": "submitted",
            "revi": "reviewing",
            "conf": "confirmed",
            "canc": "cancelled"
        }
    },
    "notes": {
        "required": null,
        "type": "text",
        "multiple": true,
        "min": 0,
        "max": 4096
    }
}; 
  /**
   * @param {PartyRegistrationModel} from 
   */
  constructor(from) {
    this.id = from.id; // default ID field
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