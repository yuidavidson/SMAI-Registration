export default class RegistrationModel {

    static someStaticFn() {
    }

    /**
     *
     * @param {RegistrationModel} camper
     */
    constructor(reg) {
        this.model = {
            "canRegisterParty": true,
            "isPartyLeader": true,
            "partyReg": {
                "campId": "",
                "partyId": "",
                "camperId":  "",
                "owed": "",
                "paid":  "",
                "customPricesRequests": "",
                "isPaymentPlanRequested":  "",
                "status": "",
                "notes":  ""
            },
            "partyCampers": [
                {
                    "partyId":  "",
                    "camperId": "",
                    "campId":  "",
                    "neighborhood": "",
                    "camperName": ""
                }
            ],
            "pastPartyCampers": [
                {
                    "partyId":  "",
                    "camperId": "",
                    "campId":  "",
                    "neighborhood": "",
                    "camperName": ""
                }
            ],
            "camperReg": {
                "partyId":  "",
                "camperId": "",
                "campId":  "",
                "neighborhood": "",
                "camperName": ""
            }
        };
    }

    someFn() {
    }

}