import {deepFreeze} from "../utils";
import CamperModel from "../models/camper";

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

export {camperSectionUtils, camperSectionModel};
