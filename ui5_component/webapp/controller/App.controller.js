sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
], (BaseController,JSONModel) => {
  "use strict";

  return BaseController.extend("smc6.cl1.ui5component.controller.App", {
      onInit() {
  
        //get model
        var oModel = new JSONModel("/json/component.json");
  
        //Bind model
        this.getView().setModel(oModel);

      },

  });
});