export default class RegistrationModel {
    static config = {};
    /**
     *
     * @param {RegistrationModel} from
     */
    constructor(from) {
        this.campId = from.campId; // integer
        this.partyRegistration = from.partyRegistration; // PartyRegistration|null
        this.party = from.party; // CamperModel[]
        this.partyHeadId = from.partyHeadId; // integer,
        this.camperRegistrations = from.camperRegistrations; // camperRegistration[]
    }
}

/**
 {
   "campId": 1,
   "partyRegistration": "PartyRegistration|null",
   "party": [ "CamperModel" ],
   "partyHeadId": 1612,
   "camperRegistrations": [ "camperRegistration" ]
 }
 */