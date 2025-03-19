sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller,MessageToast,Filter,FilterOperator) => {
    "use strict";

    return Controller.extend("sync6.cl1.documentedit.controller.DocuView", {
        onInit: function() {

        },

        onClear: function(){
            this.getView().byId("Bukrs").setValue("");
            this.getView().byId("Belnr").setValue("");
            this.getView().byId("Gjahr").setValue("");
            this.getView().byId("Budat").setValue("");
            this.getView().byId("Blart").setValue("");
            this.getView().byId("Bktxt").setValue("");
            this.getView().byId("Waers").setValue("");
            this.getView().byId("Wrbtr").setValue("");
        },

        onSearch: function(){
            //검색어 받아오기
            //View에 있는 IBktxt, IBlart라는는 입력필드에 들어온 값을 가져옴
            var vBktxt = this.getView().byId("IBktxt").getValue(),
                vBlart = this.getView().byId("IBlart").getValue();
            
            //해당 컴포넌트를 받아오기
            var oTable = this.getView().byId("docuTable"), //View의 table 개체 받아오기
                oBinding = oTable.getBinding("rows"), //검색을 해주는 개체(Filter class 사용 가능)
                oFilter = null, //검색어를 구성해주는 개체
                aFilter = []; //검색어를 담는 배열

            //검색어를 입력 했으면 filter를 구성한다
            if(vBktxt != ''){

                oFilter = new Filter(
                    {
                        path: 'Bktxt',
                        operator: FilterOperator.Contains,
                        value1: vBktxt
                    }
                );

                //구성된 검색어를 배열에 담아준다.
                aFilter.push(oFilter);
                oFilter = null;
            
            }
            //배열에 담긴 검색 정보를  filter에 넘겨준다다
            oBinding.filter(aFilter);

            if( vBlart != ''){

                oFilter = new Filter(
                    {
                        path: 'Blart',
                        operator: FilterOperator.EQ,
                        value1: vBlart.toUpperCase()
                    }
                );

                aFilter.push(oFilter);
                oFilter = null;
            }

            oBinding.filter(aFilter);
     
        },

        onDisplay: function(){

            var oModel = this.getView().getModel(),   //GW service 실행개체(read, create,update, remove)
                oTable = this.getView().byId("docuTable"), //View의 table 개체 받아오기
                aIndex = oTable.getSelectedIndices(), // go_grid->get_selected_rows와 같음, 선택한 인덱스를 배열로 받아옴
                oContext = oTable.getContextByIndex(aIndex[0]), //Read table gt_body INTO gs_body INDEX index
                oData  = oContext.getObject();       //Read table 된 gs_body

                //Set value
                this.getView().byId("Bukrs").setValue(oData.Bukrs);
                this.getView().byId("Belnr").setValue(oData.Belnr);
                this.getView().byId("Gjahr").setValue(oData.Gjahr);
                this.getView().byId("Budat").setValue(oData.Budat);
                this.getView().byId("Blart").setValue(oData.Blart);
                this.getView().byId("Bktxt").setValue(oData.Bktxt);
                this.getView().byId("Waers").setValue(oData.Waers);
                this.getView().byId("Wrbtr").setValue(oData.Wrbtr);

        },

        onCreate: function(){

            var oModel = this.getView().getModel();
            var vWrbtr = this.getView().byId("Wrbtr").getValue().replaceAll(',',''), 
                //,는 공백으로 대치
                vBudat = this.getView().byId("Budat").getValue();
            const cBudat = new Date(vBudat).toISOString().split("T")[0];

            let oCreate = {
                Bukrs: this.getView().byId("Bukrs").getValue(),
                Gjahr: this.getView().byId("Gjahr").getValue(),
                Blart: this.getView().byId("Blart").getValue(),
                Budat: cBudat,
                Belnr: this.getView().byId("Belnr").getValue(),
                Bktxt: this.getView().byId("Bktxt").getValue(),
                Waers: this.getView().byId("Waers").getValue(),
                Wrbtr: vWrbtr
            }

            oModel.create("/DocumentSet", oCreate, 
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
            var vWrbtr = this.getView().byId("Wrbtr").getValue().replaceAll(',',''), 
                //,는 공백으로 대치
                vBudat = this.getView().byId("Budat").getValue();
            const cBudat = new Date(vBudat).toISOString().split("T")[0];

            let oUpdate = {
                Bukrs: this.getView().byId("Bukrs").getValue(),
                Gjahr: this.getView().byId("Gjahr").getValue(),
                Blart: this.getView().byId("Blart").getValue(),
                Budat: cBudat,
                Belnr: this.getView().byId("Belnr").getValue().padStart(10, '0'),
                Bktxt: this.getView().byId("Bktxt").getValue(),
                Waers: this.getView().byId("Waers").getValue(),
                Wrbtr: vWrbtr,
            }

            oModel.update("/DocumentSet(Bukrs='"+ oUpdate.Bukrs+"'," +
                                        "Gjahr='"+oUpdate.Gjahr+"'," +
                                        "Belnr='"+oUpdate.Belnr+"')",oUpdate,
                {
                    method: 'MERGE',
                    success: function (){
                        oModel.refresh();
                        MessageToast.show("Update success!!");
                    },
                    error: function(){
                        MessageToast.show("Upate Error!!");
                    }
                }
            )          
        },

        onDelete: function(){

            var oModel = this.getView().getModel(),   //GW service 실행개체(read, create,update, remove)
                oTable = this.getView().byId("docuTable"), //View의 table 개체 받아오기
                aIndex = oTable.getSelectedIndices(), // go_grid->get_selected_rows와 같음, 선택한 인덱스를 배열로 받아옴
                oContext = oTable.getContextByIndex(aIndex[0]), //Read table gt_body INTO gs_body INDEX index
                oData  = oContext.getObject(),       //Read table 된 gs_body
                vBelnr = oData.Belnr.padStart(10, '0')

            oModel.remove("/DocumentSet(Bukrs='"+ oData.Bukrs+"'," +
                                        "Gjahr='"+oData.Gjahr+"'," +
                                        "Belnr='"+vBelnr+"')",
                {
                    method: 'DELETE',
                    success: function (){
                        oModel.refresh();
                        MessageToast.show("Delete success!!");
                    },
                    error: function(){
                        MessageToast.show("Delete Error!!");
                    }
                }
            )

        }
    });
});