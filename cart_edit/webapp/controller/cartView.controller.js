sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller,MessageToast,Filter,FilterOperator) => {
    "use strict";


    return Controller.extend("sync6.cl1.cartedit.controller.cartView", {
        onInit: function() {
        },

        onClear: function(){
            this.getView().byId("Shop").setValue("");
            this.getView().byId("CustomId").setValue("");
            this.getView().byId("CartNo").setValue("");
            this.getView().byId("Matnr").setValue("");
            this.getView().byId("Maktx").setValue("");
            this.getView().byId("Amount").setValue("");
            this.getView().byId("Waers").setValue("");
            this.getView().byId("GoodsCnt").setValue("");
            this.getView().byId("Kind").setValue("");
        },

        onSearch: function(){
            //검색어 받아오기
            //view에 있는 IMaktx, ICustomID 입력필드에 들어온 값을 가져옴
            var vMaktx = this.getView().byId("IMaktx").getValue(),
                vCustomId =this.getView().byId("ICustomId").getValue();

            //해당 컴포넌트를 받아오기
            var oTable = this.getView().byId("cartTable"), //view의 table개체 받아오기기
                oBinding = oTable.getBinding("rows"), //검색을 해주는 개체(filter class를 사용가능하게 함함)
                oFilter = null,//검색어를 구성해주는 개체체
                aFilter = [];//검색어를 담는 배열열

            //검색어를 입력했으면 filter를 구성함
            if(vMaktx != ''){

                oFilter = new Filter(
                    {
                        path: 'Maktx',
                        operator: FilterOperator.Contains,
                        value1: vMaktx
                    }
                );

                //구성된 검색어를 배열에 담아준다.
                aFilter.push(oFilter);
                oFilter = null;
            }
            //배열에 담긴 검색 정보를 filter에 넘겨준다
            oBinding.filter(aFilter);

            if( vCustomId != ''){
                oFilter = new Filter(
                    {
                        path: 'CustomId',
                        operator: FilterOperator.EQ,
                        value1: vCustomId
                
                    }
                );

                aFilter.push(oFilter);
                oFilter = null;
            }
            
            oBinding.filter(aFilter);

        },

        onDisplay: function(){

            var oModel = this.getView().getModel(), //GW service 실행 개체(read, create, update, remove)
                oTable = this.getView().byId("cartTable"), //view의 table 개체 받아오기 
                aIndex = oTable.getSelectedIndices(), //go_grid->get_selected_rows와 같음, 선택한 인덱스를 배열로 받아옴
                oContext = oTable.getContextByIndex(aIndex[0]), //Read table gt_body INTO gs_body INDEX index
                oData = oContext.getObject(); //Read table 된 gs_body
            
            //Set value
            this.getView().byId("Shop").setValue(oData.Shop);
            this.getView().byId("CustomId").setValue(oData.CustomId);
            this.getView().byId("CartNo").setValue(oData.CartNo);
            this.getView().byId("Matnr").setValue(oData.Matnr);
            this.getView().byId("Maktx").setValue(oData.Maktx);
            this.getView().byId("Amount").setValue(oData.Amount);
            this.getView().byId("Waers").setValue(oData.Waers);
            this.getView().byId("GoodsCnt").setValue(oData.GoodsCnt);
            this.getView().byId("Kind").setValue(oData.Kind);

        },

        onCreate: function(){

            var oModel = this.getView().getModel();
            var vAmount = this.getView().byId("Amount").getValue().replaceAll(',','');
            var vCartNo = this.getView().byId("CartNo").getValue();
            var vGoodsCnt = this.getView().byId("GoodsCnt").getValue();

            let oCreate = {
                Shop:     this.getView().byId("Shop").getValue(),
                CustomId: this.getView().byId("CustomId").getValue(),
                CartNo: parseInt(vCartNo, 10),
                Matnr:    this.getView().byId("Matnr").getValue(),
                Maktx:    this.getView().byId("Maktx").getValue(),
                Amount:   vAmount,
                Waers:    this.getView().byId("Waers").getValue(),
                GoodsCnt: parseInt(vGoodsCnt, 10),
                Kind:     this.getView().byId("Kind").getValue()
            }

            oModel.create("/shoppingSet", oCreate,
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
            var vAmount = this.getView().byId("Amount").getValue().replaceAll(',','');
            var vCartNo = this.getView().byId("CartNo").getValue();
            var vGoodsCnt = this.getView().byId("GoodsCnt").getValue();

            let oUpdate = {
                Shop:     this.getView().byId("Shop").getValue(),
                CustomId: this.getView().byId("CustomId").getValue(),
                CartNo: parseInt(vCartNo, 10),
                Matnr:    this.getView().byId("Matnr").getValue(),
                Maktx:    this.getView().byId("Maktx").getValue(),
                Amount:   vAmount,
                Waers:    this.getView().byId("Waers").getValue(),
                GoodsCnt: parseInt(vGoodsCnt, 10),
                Kind:     this.getView().byId("Kind").getValue()
            }

            oModel.update("/shoppingSet(Shop='" + oUpdate.Shop 
                                    + "',CustomId='" + oUpdate.CustomId + "')",oUpdate,
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
                oTable = this.getView().byId("cartTable"), //view의 table 개체 받아오기 
                aIndex = oTable.getSelectedIndices(), //go_grid->get_selected_rows와 같음, 선택한 인덱스를 배열로 받아옴
                oContext = oTable.getContextByIndex(aIndex[0]), //Read table gt_body INTO gs_body INDEX index
                oData = oContext.getObject(); //Read table 된 gs_body

            oModel.remove("/shoppingSet(Shop='" + oData.Shop 
                                    + "',CustomId='" + oData.CustomId + "')",
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