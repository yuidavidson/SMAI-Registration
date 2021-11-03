export default class CamperModel {
    static stepFieldsMap = {
        personal: {
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
        emergencyContact: {
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
        medicalInformation: {
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

    /**
     *
     * @param {CamperModel} camper
     */
    constructor(camper) {
        this.camperId = camper.camperId;
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

        this.sessions = [];
    }

    addSession (session) {
        this.sessions.push(session);
    }

    /**
     * Get all the values of camper for this step only
     * @param {string} step
     * @returns {object}
     */
    getStepValues(step) {
        const stepFields = {};
        CamperModel.stepFieldsMap[step].fields.forEach(f => stepFields[f] = this[f]);
        return stepFields;
    }
    updateStepValues(step, values, isMakeNewObject=false) {
        CamperModel.stepFieldsMap[step].fields.forEach(f => this[f] = values[f]);
        if (isMakeNewObject) {
            return new CamperModel(this);
        }
    }
    getStepConfig(step) {
        return CamperModel.stepFieldsMap[step];
    }

    static getSteps() {
        return Object.keys(CamperModel.stepFieldsMap);
    }
}