sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("sync6.cl1.routetest2.controller.FirstView", {
        onInit() {
        },
        onSecond: function(){
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteSecondView");
        }
    });
});