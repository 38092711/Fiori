sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("sync6.cl1.uitable.controller.AirView", {
        onInit() {

            var AirlineSRV = { //Service ID

                AirlineSet : [ //EntitySET -- 실질적으로

                    { Carrid : "AA", Carrname : "America airline", Url : "http://www.aa.com" },
                    { Carrid : "LH", Carrname : "Luft Hanza",      Url : "http:/lufthanza.com"},
                    { Carrid : "KA", Carrname : "Korean Air",      Url : "http://Korean.co.kr"}

                ],

                scheduleSet : [
                    { Carrid: "AA", Connid : "0100", cityfrom: "New York"},
                    { Carrid: "AA", Connid : "0101", cityfrom: "Seoul"}
                ]

            }

            var oModel = new JSONModel(AirlineSRV);

            this.getView().setModel(oModel);

        }

    });
});