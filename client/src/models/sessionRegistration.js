export default class SessionRegistrationModel {
  static config = {
    "registrationId": {
        "required": true
    },
    "sessionId": {
        "required": true
    },
    "mealId": {
        "required": true
    },
    "foodPreferenceId": {
        "required": true
    },
    "crewId": {
        "required": true
    }
}; 
  /**
   * @param {SessionRegistrationModel} from 
   */
  constructor(from) {
    this.id = from.id; // default ID field
    this.registrationId = from.registrationId;
    this.sessionId = from.sessionId;
    this.mealId = from.mealId;
    this.foodPreferenceId = from.foodPreferenceId;
    this.crewId = from.crewId;

  }
}
/**
{
    "registrationId": null,
    "sessionId": null,
    "mealId": null,
    "foodPreferenceId": null,
    "crewId": null
}
 */