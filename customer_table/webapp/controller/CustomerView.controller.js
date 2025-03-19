sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller,MessageToast,Filter,FilterOperator) => {
    "use strict";

    return Controller.extend("sync6.cl1.customertable.controller.CustomerView", {
        onInit() {
            
        },

        onClear: function(){
            this.getView().byId("Id").setValue("");
            this.getView().byId("Name").setValue("");
            this.getView().byId("City").setValue("");
            this.getView().byId("Country").setValue("");
            this.getView().byId("Email").setValue("");
        },

        onDisplay: function(){

            var oModel = this.getView().getModel(), //GW service 실행 개체(read, create, update, remove)
                oTable = this.getView().byId("custTable"), //view의 table 개체 받아오기 
                aIndex = oTable.getSelectedIndices(), //go_grid->get_selected_rows와 같음, 선택한 인덱스를 배열로 받아옴
                oContext = oTable.getContextByIndex(aIndex[0]), //Read table gt_body INTO gs_body INDEX index
                oData = oContext.getObject(); //Read table 된 gs_body
            
            //Set value
            this.getView().byId("Id").setValue(oData.Id);
            this.getView().byId("Name").setValue(oData.Name);
            this.getView().byId("City").setValue(oData.City);
            this.getView().byId("Country").setValue(oData.Country);
            this.getView().byId("Email").setValue(oData.Email);

        },

        onCreate: function(){

            var oModel = this.getView().getModel();

            let oCreate = {
                Id:      this.getView().byId("Id").getValue(),
                Name:    this.getView().byId("Name").getValue(),
                City:    this.getView().byId("City").getValue(),
                Country: this.getView().byId("Country").getValue(),
                Email:   this.getView().byId("Email").getValue()
            }

            oModel.create("/custSet", oCreate,
                {
                  method: 'POST',
                  success: function(){
                    oModel.refresh();
                    MessageToast.show("Create success!!");
                  },
                  error: function(){
                    MessageToast.show("Error on create!!")
                  }
                }
            )
        },

        onUpdate: function(){

            var oModel = this.getView().getModel();

            let oUpdate = {
                Id:      this.getView().byId("Id").getValue(),
                Name:    this.getView().byId("Name").getValue(),
                City:    this.getView().byId("City").getValue(),
                Country: this.getView().byId("Country").getValue(),
                Email:   this.getView().byId("Email").getValue()
            }

            oModel.update("/custSet(Shop='" + oUpdate.Id + "')",oUpdate,
                {
                    method: 'MERGE',
                    success: function(){
                        oModel.refresh();
                        MessageToast.show("Update success!!");
                    },
                    error: function(){
                        MessageToast.show("Update Error!!")
                    }
                }
            )
        },

        onDelete: function(){
           
            var oModel = this.getView().getModel(), //GW service 실행 개체(read, create, update, remove)
                oTable = this.getView().byId("custTable"), //view의 table 개체 받아오기 
                aIndex = oTable.getSelectedIndices(), //go_grid->get_selected_rows와 같음, 선택한 인덱스를 배열로 받아옴
                oContext = oTable.getContextByIndex(aIndex[0]), //Read table gt_body INTO gs_body INDEX index
                oData = oContext.getObject(); //Read table 된 gs_body

            oModel.remove("/custSet(Shop='" + oData.Id + "')",
                {
                    method: 'DELETE',
                    success: function(){
                        oModel.refresh();
                        MessageToast.show("Delete success!!");
                    },
                    error: function(){
                        MessageToast.show("Delete Error!!")
                    }
                }
            )
        }

    });
});