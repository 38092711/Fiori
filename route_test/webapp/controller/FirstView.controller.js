sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("sync.cl6.routetest.controller.FirstView", {
        onInit: function(){
        },

        onSecond: function(){
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteSecondView");
        }
    });
});