import {deepFreeze} from '../utils';

/**
 * @type {{id: string, label: string, fields: string[]}}
 */
const camperSectionModel = {
  id: 'sampleId',
  label: 'Sample Label',
  fields: ['']
};

/**
 * @type {Object<string, camperSectionModel>}
 */
const camperSections = {
  personal: {
    id: 'personal',
    label: 'Personal Info',
    fields: [
      'firstName',
      'lastName',
      'birthyear',
      'foodPreference',
      'neighborhood',
    ]
  },
  contact: {
    id: 'contact',
    label: "Contact Information",
    fields: [
      'address',
      'city',
      'region',
      'postalCode',
      'country',
      'phone1',
      'phone2',
      'email',
    ]
  },
  vehicle: {
    id: 'vehicle',
    label: "Vehicle Information",
    fields: [
      'vehicle1Model',
      'vehicle1Plate',
      'vehicle1State',
      'vehicle2Model',
      'vehicle2Plate',
      'vehicle2State',
    ]
  },
  emergency: {
    id: 'emergency',
    label: "Emergency Contacts",
    fields: [
      'emergency1FirstName',
      'emergency1LastName',
      'emergency1Relationship',
      'emergency1Phone',
      'emergency1Location',
      'emergency2FirstName',
      'emergency2LastName',
      'emergency2Relationship',
      'emergency2Phone',
      'emergency2Location',
      'emergencyLastUpdated',
    ]
  },
  medical: {
    id: 'medical',
    label: 'Medical Information',
    fields: [
      'medicalCondition',
      'medicalHasAllergy',
      'medicalHasAsthma',
      'medicalPlan',
      'medicalDoctor',
      'medicalHospital',
      'medicalSpecialNeeds',
      'medicalLastUpdated'
    ]
  }
};
deepFreeze(camperSections);

class camperSectionUtils {
  /**
   *
   * @param {CamperModel} camper
   * @returns {string[]}
   */
  static getAllIds(camper) {
    return Object.keys(camperSections);
  }

  /**
   * Get all the values of camper for this step only
   * @param {CamperModel} camper
   * @param {string} sectionId
   * @returns {object}
   */
  static get(camper, sectionId) {
    return Object.fromEntries(camperSections[sectionId].fields.map(f => [f, camper[f]]));
  }

  static update(camper, sectionId, values) {
    const camperCopy = new CamperModel(camper);
    camperSections[sectionId].fields.forEach(f => camperCopy[f] = values[f]);
    return camperCopy;
  }

  static getConfig(sectionId) {
    return camperSections[sectionId];
  }
}

class CamperModel {
  static config = {
    "oldId": {
      "required": null
    },
    "partyId": {
      "required": true,
      "type": "text",
      "min": 0,
      "max": 4
    },
    "isPartyHead": {
      "required": true,
      "type": "bool"
    },
    "joomlaId": {
      "required": null
    },
    "notes": {
      "required": null,
      "type": "text",
      "multiple": true,
      "min": 0,
      "max": 4096
    },
    "hasRedFlag": {
      "required": true,
      "type": "bool"
    },
    "isActive": {
      "required": true,
      "type": "bool"
    },
    "firstYear": {
      "required": null
    },
    "lastYear": {
      "required": null
    },
    "sponsorName": {
      "required": null,
      "type": "text",
      "min": 0,
      "max": 100
    },
    "sponsorId": {
      "required": null
    },
    "stripeCustomerId": {
      "required": null,
      "type": "text",
      "min": 0,
      "max": 30
    },
    "firstName": {
      "required": true,
      "type": "text",
      "min": 0,
      "max": 50
    },
    "lastName": {
      "required": true,
      "type": "text",
      "min": 0,
      "max": 50
    },
    "birthyear": {
      "required": null
    },
    "foodPreference": {
      "required": null,
      "type": "text",
      "dict": {
        "omni": "Omni-vore",
        "vege": "Vegetarian",
        "vega": "Vegam"
      }
    },
    "neighborhood": {
      "required": null,
      "type": "text",
      "dict": {
        "amer": "American Hill",
        "balk": "Balkan Camp",
        "carc": "Car Camp",
        "coff": "Coffee House",
        "cowb": "Cowboy Camp",
        "flam": "Flamenco Camp",
        "heig": "The Heights",
        "kitc": "Kitchen",
        "lake": "Lakeshore",
        "medi": "Meditation Meadow",
        "recr": "Rec Row",
        "sout": "South Pole",
        "uppe": "Upper Touristan",
        "othe": "Other",
        "n\/a": "Don't know yet"
      }
    },
    "address": {
      "required": null,
      "type": "text",
      "min": 5,
      "max": 100
    },
    "city": {
      "required": null,
      "type": "text",
      "min": 2,
      "max": 50
    },
    "region": {
      "required": null,
      "type": "text",
      "min": 0,
      "max": 20
    },
    "postalCode": {
      "required": null,
      "type": "text",
      "min": 4,
      "max": 20
    },
    "country": {
      "required": null,
      "type": "text",
      "min": 0,
      "max": 50
    },
    "phone": {
      "required": true,
      "type": "tel",
      "min": 0,
      "max": 20
    },
    "phoneAlt": {
      "required": null,
      "type": "tel",
      "min": 0,
      "max": 20
    },
    "email": {
      "required": true,
      "type": "email",
      "min": 0,
      "max": 100
    },
    "emailAlt": {
      "required": null,
      "type": "email",
      "min": 0,
      "max": 100
    },
    "vehicle1Model": {
      "required": null,
      "type": "text",
      "min": 0,
      "max": 50
    },
    "vehicle1Plate": {
      "required": null,
      "type": "text",
      "min": 0,
      "max": 20
    },
    "vehicle1State": {
      "required": null,
      "type": "text",
      "min": 0,
      "max": 10
    },
    "vehicle2Model": {
      "required": null,
      "type": "text",
      "min": 0,
      "max": 50
    },
    "vehicle2Plate": {
      "required": null,
      "type": "text",
      "min": 0,
      "max": 20
    },
    "vehicle2State": {
      "required": null,
      "type": "text",
      "min": 0,
      "max": 10
    },
    "emergency1FirstName": {
      "required": true,
      "type": "text",
      "min": 0,
      "max": 50
    },
    "emergency1LastName": {
      "required": true,
      "type": "text",
      "min": 0,
      "max": 50
    },
    "emergency1Relationship": {
      "required": true,
      "type": "text",
      "min": 0,
      "max": 50
    },
    "emergency1Phone": {
      "required": true,
      "type": "tel",
      "min": 0,
      "max": 20
    },
    "emergency1Location": {
      "required": true,
      "type": "text",
      "min": 0,
      "max": 50
    },
    "emergency2FirstName": {
      "required": true,
      "type": "text",
      "min": 0,
      "max": 50
    },
    "emergency2LastName": {
      "required": true,
      "type": "text",
      "min": 0,
      "max": 50
    },
    "emergency2Relationship": {
      "required": true,
      "type": "text",
      "min": 0,
      "max": 50
    },
    "emergency2Phone": {
      "required": true,
      "type": "tel",
      "min": 0,
      "max": 20
    },
    "emergency2Location": {
      "required": true,
      "type": "text",
      "min": 0,
      "max": 50
    },
    "emergencyLastUpdated": {
      "required": null
    },
    "medicalCondition": {
      "required": true,
      "type": "text",
      "multiple": true,
      "min": 0,
      "max": 4096
    },
    "medicalHasAllergy": {
      "required": true,
      "type": "bool"
    },
    "medicalHasAsthma": {
      "required": true,
      "type": "bool"
    },
    "medicalPlan": {
      "required": true,
      "type": "text",
      "min": 0,
      "max": 100
    },
    "medicalDoctor": {
      "required": true,
      "type": "text",
      "min": 0,
      "max": 100
    },
    "medicalHospital": {
      "required": true,
      "type": "text",
      "min": 0,
      "max": 100
    },
    "medicalSpecialNeeds": {
      "required": true,
      "type": "text",
      "multiple": true,
      "min": 0,
      "max": 4096
    },
    "medicalLastUpdated": {
      "required": null
    }
  };

  /**
   *
   * @param {CamperModel} from
   */
  constructor(from) {
    this.oldId = from.oldId;
    this.partyId = from.partyId;
    this.isPartyHead = from.isPartyHead;
    this.joomlaId = from.joomlaId;
    this.notes = from.notes;
    this.hasRedFlag = from.hasRedFlag;
    this.isActive = from.isActive;
    this.firstYear = from.firstYear;
    this.lastYear = from.lastYear;
    this.sponsorName = from.sponsorName;
    this.sponsorId = from.sponsorId;
    this.stripeCustomerId = from.stripeCustomerId;
    this.firstName = from.firstName;
    this.lastName = from.lastName;
    this.birthyear = from.birthyear;
    this.foodPreference = from.foodPreference;
    this.neighborhood = from.neighborhood;
    this.address = from.address;
    this.city = from.city;
    this.region = from.region;
    this.postalCode = from.postalCode;
    this.country = from.country;
    this.phone = from.phone;
    this.phoneAlt = from.phoneAlt;
    this.email = from.email;
    this.emailAlt = from.emailAlt;
    this.vehicle1Model = from.vehicle1Model;
    this.vehicle1Plate = from.vehicle1Plate;
    this.vehicle1State = from.vehicle1State;
    this.vehicle2Model = from.vehicle2Model;
    this.vehicle2Plate = from.vehicle2Plate;
    this.vehicle2State = from.vehicle2State;
    this.emergency1FirstName = from.emergency1FirstName;
    this.emergency1LastName = from.emergency1LastName;
    this.emergency1Relationship = from.emergency1Relationship;
    this.emergency1Phone = from.emergency1Phone;
    this.emergency1Location = from.emergency1Location;
    this.emergency2FirstName = from.emergency2FirstName;
    this.emergency2LastName = from.emergency2LastName;
    this.emergency2Relationship = from.emergency2Relationship;
    this.emergency2Phone = from.emergency2Phone;
    this.emergency2Location = from.emergency2Location;
    this.emergencyLastUpdated = from.emergencyLastUpdated;
    this.medicalCondition = from.medicalCondition;
    this.medicalHasAllergy = from.medicalHasAllergy;
    this.medicalHasAsthma = from.medicalHasAsthma;
    this.medicalPlan = from.medicalPlan;
    this.medicalDoctor = from.medicalDoctor;
    this.medicalHospital = from.medicalHospital;
    this.medicalSpecialNeeds = from.medicalSpecialNeeds;
    this.medicalLastUpdated = from.medicalLastUpdated;

  }
}

/**
 {
    "oldId": null,
    "partyId": null,
    "isPartyHead": null,
    "joomlaId": null,
    "notes": null,
    "hasRedFlag": null,
    "isActive": null,
    "firstYear": null,
    "lastYear": null,
    "sponsorName": null,
    "sponsorId": null,
    "stripeCustomerId": null,
    "firstName": null,
    "lastName": null,
    "birthyear": null,
    "foodPreference": null,
    "neighborhood": null,
    "address": null,
    "city": null,
    "region": null,
    "postalCode": null,
    "country": null,
    "phone": null,
    "phoneAlt": null,
    "email": null,
    "emailAlt": null,
    "vehicle1Model": null,
    "vehicle1Plate": null,
    "vehicle1State": null,
    "vehicle2Model": null,
    "vehicle2Plate": null,
    "vehicle2State": null,
    "emergency1FirstName": null,
    "emergency1LastName": null,
    "emergency1Relationship": null,
    "emergency1Phone": null,
    "emergency1Location": null,
    "emergency2FirstName": null,
    "emergency2LastName": null,
    "emergency2Relationship": null,
    "emergency2Phone": null,
    "emergency2Location": null,
    "emergencyLastUpdated": null,
    "medicalCondition": null,
    "medicalHasAllergy": null,
    "medicalHasAsthma": null,
    "medicalPlan": null,
    "medicalDoctor": null,
    "medicalHospital": null,
    "medicalSpecialNeeds": null,
    "medicalLastUpdated": null
}
 */

export default CamperModel;
export {camperSectionUtils, camperSectionModel};