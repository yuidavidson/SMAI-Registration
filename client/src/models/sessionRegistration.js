export default class SessionRegistrationModel {
  /**
   * @param {SessionRegistrationModel} from 
   */
  constructor(from) {
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