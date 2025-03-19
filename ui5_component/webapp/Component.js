sap.ui.define([
    "sap/ui/core/UIComponent",
    "smc6/cl1/ui5component/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("smc6.cl1.ui5component.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();
        }
    });
});