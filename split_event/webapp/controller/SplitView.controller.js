sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller,Filter,FilterOperator) => {
    "use strict";

    return Controller.extend("sync6.cl1.a22.splitevent.controller.SplitView", {
        onInit() {
        },

        onSpfli: function(oEvent){

            let oData = oEvent.getSource().getBindingContext().getObject(), // 종합정보센터로 부터 선택한 정보를 얻어옴
                oTable = this.getView().byId("spfli"), // 이벤트를 적용할 Element를 읽어옴
                oBinding = oTable.getBinding("rows"),  // EntitySet 정보
                oFilter  = null,
                aFilter  = [];

                oFilter = new Filter({
                    path: "Carrid",
                    operator: FilterOperator.EQ,
                    value1: oData.Carrid
                });
    
                aFilter.push(oFilter);    // 검색조건을 배열에 담아준다
                oBinding.filter(aFilter); // 검색조건을 실행
        },

        onSflight: function(oEvent){
            
            let oData = oEvent.getParameter("rowBindingContext").getObject(), // 선택된 행의 모든 정보를 받아옴
                oTable   = this.getView().byId("sflight"), // 이벤트를 적용할 Element를 읽어옴
                oBinding = oTable.getBinding("rows"),      // EntitySet 정보
                oFilter  = null,
                aFilter  = [];

                oFilter = new Filter({
                    path: "Carrid",
                    operator: FilterOperator.EQ,
                    value1: oData.Carrid
                });

                aFilter.push(oFilter);

                oFilter = new Filter({
                    path: "Connid",
                    operator: FilterOperator.EQ,
                    value1: oData.Connid
                });

                aFilter.push(oFilter);
                oBinding.filter(aFilter);

        }
    });
});