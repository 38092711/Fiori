sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller,MessageToast,Filter,FilterOperator) => {
    "use strict";

    return Controller.extend("sync6.cl1.shoppingcartinfo.controller.cartView", {
        onInit() {
        },
        onClear: function(){
            this.getView().byId("Ryear").setValue("");
            this.getView().byId("Rbukrs").setValue("");
            this.getView().byId("Belnr").setValue("");
            this.getView().byId("Racct").setValue("");
            this.getView().byId("Remark").setValue("");
            this.getView().byId("Hsl").setValue("");
            this.getView().byId("Rtcur").setValue("");
            this.getView().byId("PostYn").setValue("");
        },

        onSearch: function(){
            //검색어 받아오기
            //view에 있는 IMaktx, ICustomID 입력필드에 들어온 값을 가져옴
            var vRemark = this.getView().byId("IRemark").getValue(),
                vBelnr =this.getView().byId("IBelnr").getValue();

            //해당 컴포넌트를 받아오
            var oTable = this.getView().byId("cartTable"), //view의 table개체 받아오기
                oBinding = oTable.getBinding("rows"), //검색을 해주는 개체(filter class를 사용가능하게 함)
                oFilter = null,//검색어를 구성해주는 개체
                aFilter = [];//검색어를 담는 배열

            //검색어를 입력했으면 filter를 구성함
            if(vRemark != ''){

                oFilter = new Filter(
                    {
                        path: 'Remark',
                        operator: FilterOperator.Contains,
                        value1: vRemark
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
                        path: 'Belnr',
                        operator: FilterOperator.EQ,
                        value1: vBelnr
                
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
            this.getView().byId("Ryear").setValue(oData.Ryear);
            this.getView().byId("Rbukrs").setValue(oData.Rbukrs);
            this.getView().byId("Belnr").setValue(oData.Belnr);
            this.getView().byId("Racct").setValue(oData.Racct);
            this.getView().byId("Remark").setValue(oData.Remark);
            this.getView().byId("Hsl").setValue(oData.Hsl);
            this.getView().byId("Rtcur").setValue(oData.Rtcur);
            this.getView().byId("PostYn").setValue(oData.PostYn);

        },

        onCreate: function(){

            var oModel = this.getView().getModel();
            var vHsl = this.getView().byId("Hsl").getValue().replaceAll(',','');

            let oCreate = {
                Ryear:     this.getView().byId("Ryear").getValue(),
                Rbukrs: this.getView().byId("Rbukrs").getValue(),
                Belnr:    this.getView().byId("Belnr").getValue(),
                Racct:    this.getView().byId("Racct").getValue(),
                Remark:    this.getView().byId("Remark").getValue(),
                Hsl:   vHsl,
                Rtcur:    this.getView().byId("Rtcur").getValue(),
                PostYn:     this.getView().byId("PostYn").getValue()
            }

            oModel.create("/HScartSet", oCreate,
                {
                  method: 'POST',
                  success: function(){
                    oModel.refresh();
                    MessageToast.show("Create success!!");
                  },
                  error: function(){
                    MessageToast.show("Error on create!!");
                  }
                }
            )
        },

        onUpdate: function(){

            var oModel = this.getView().getModel();
            var vHsl = this.getView().byId("Hsl").getValue().replaceAll(',','');

            let oUpdate = {
                Ryear:     this.getView().byId("Ryear").getValue(),
                Rbukrs: this.getView().byId("Rbukrs").getValue(),
                Belnr: this.getView().byId("Belnr").getValue().padStart(10, '0'),
                Racct:    this.getView().byId("Racct").getValue(),
                Remark:    this.getView().byId("Remark").getValue(),
                Hsl:   vHsl,
                Rtcur:    this.getView().byId("Rtcur").getValue(),
                PostYn:     this.getView().byId("PostYn").getValue()
            }

            oModel.update("/HScartSet(Ryear='" + oUpdate.Ryear 
                                    + "',Rbukrs='" + oUpdate.Rbukrs 
                                    + "',Belnr='" + oUpdate.Belnr + "')",oUpdate,
                {
                    method: 'MERGE',
                    success: function(){
                        oModel.refresh();
                        MessageToast.show("Update success!!");
                    },
                    error: function(){
                        MessageToast.show("Update Error!!");
                    }
                }
            )
        },

        onDelete: function(){
           
            var oModel = this.getView().getModel(), //GW service 실행 개체(read, create, update, remove)
                oTable = this.getView().byId("cartTable"), //view의 table 개체 받아오기 
                aIndex = oTable.getSelectedIndices(), //go_grid->get_selected_rows와 같음, 선택한 인덱스를 배열로 받아옴
                oContext = oTable.getContextByIndex(aIndex[0]), //Read table gt_body INTO gs_body INDEX index
                oData = oContext.getObject(), //Read table 된 gs_body
                vBelnr = oData.Belnr.padStart(10, '0');

                oModel.remove("/HScartSet(Ryear='" + oData.Ryear 
                                    + "',Rbukrs='" + oData.Rbukrs 
                                    + "',Belnr='" + vBelnr + "')",
                    {
                        method: 'DELETE',
                        success: function(){
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