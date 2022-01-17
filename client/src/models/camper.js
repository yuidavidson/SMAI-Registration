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
            "required": true
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
            "required": true
        },
        "isActive": {
            "required": true
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
            "required": true
        },
        "medicalHasAsthma": {
            "required": true
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
     * @param {CamperModel} camper
     */
    constructor(camper) {
        this.id = camper.id;
        this.partyId = camper.partyId;
        this.firstName = camper.firstName;
        this.lastName = camper.lastName;
        this.birthyear = camper.birthyear;
        this.foodPreference = camper.foodPreference;
        this.neighborhood = camper.neighborhood;
        this.address = camper.address;
        this.city = camper.city;
        this.region = camper.region;
        this.postalCode = camper.postalCode;
        this.country = camper.country;
        this.phone1 = camper.phone1;
        this.phone2 = camper.phone2;
        this.email = camper.email;
        this.vehicle1Model = camper.vehicle1Model;
        this.vehicle1Plate = camper.vehicle1Plate;
        this.vehicle1State = camper.vehicle1State;
        this.vehicle2Model = camper.vehicle2Model;
        this.vehicle2Plate = camper.vehicle2Plate;
        this.vehicle2State = camper.vehicle2State;
        this.emergency1FirstName = camper.emergency1FirstName;
        this.emergency1LastName = camper.emergency1LastName;
        this.emergency1Relationship = camper.emergency1Relationship;
        this.emergency1Phone = camper.emergency1Phone;
        this.emergency1Location = camper.emergency1Location;
        this.emergency2FirstName = camper.emergency2FirstName;
        this.emergency2LastName = camper.emergency2LastName;
        this.emergency2Relationship = camper.emergency2Relationship;
        this.emergency2Phone = camper.emergency2Phone;
        this.emergency2Location = camper.emergency2Location;
        this.emergencyLastUpdated = camper.emergencyLastUpdated;
        this.medicalCondition = camper.medicalCondition;
        this.medicalHasAllergy = camper.medicalHasAllergy;
        this.medicalHasAsthma = camper.medicalHasAsthma;
        this.medicalPlan = camper.medicalPlan;
        this.medicalDoctor = camper.medicalDoctor;
        this.medicalHospital = camper.medicalHospital;
        this.medicalSpecialNeeds = camper.medicalSpecialNeeds;
        this.medicalLastUpdated = camper.medicalLastUpdated;
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