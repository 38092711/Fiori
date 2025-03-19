//MainView.controller.js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageToast',
    "sap/ui/model/json/JSONModel"
], (Controller, MessageToast, JSONModel) => {
    "use strict";

    return Controller.extend("sync6.cl1.scriptedu.controller.MainView", {
        onInit() {
            //Make Odata for JSONModel
            var oData = {
                
                Btntext: "Odata text",
                Btnicon: "sap-icon://action",

                gs_input: {
                    intext: "Odata input",
                    inholder: "Odata place hlder"
                },
    
               }

               var gs_change = {
                    Btext: "Change Width",
                    Bicon: "sap-icon://journey-change"
               }

               //get model
               var oModel = new JSONModel(oData);
               var omodel2 = new JSONModel(gs_change);
               var oModel3 = new JSONModel("/json/student.json");

               //Bind model
               this.getView().setModel(oModel);
               this.getView().setModel(omodel2, "button");
               //모델을 여러 개 생성할 때 
               //모델에 아이디를 부여해서 덮어쓰지 않도록 함
               this.getView().setModel(oModel3, "student");
        },

        onFruits: function() {

            //view에서 입력한 값을 받아온다
            var vWord = this.getView().byId("word").getValue();
            var vFruits;

            // 입력받은 값으로 과일 이름을 출력
            switch (vWord) {
                case "A":
                    vFruits = "Apple";
                    break;
            
                case "B":
                    vFruits = "Banana";
                    break;
                
                case "O":
                    vFruits = "orange";
                    break;
            
                default:
                    vFruits = "Please enter valid code";
                    break;
            }
            MessageToast.show(vFruits);
        },

        onAdd: function() {

            var vNum1, vNum2, vResult;

            //View로부터 값을 받아온다
            vNum1 = this.getView().byId("num1").getValue();
            vNum2 = this.getView().byId("num2").getValue();

            vResult = parseInt(vNum1) + parseInt(vNum2);

            this.getView().byId("result").setValue(vResult);

            //MessageToast.show("result = "+vResult);
        },

        onFor: function() {

            //배열선언
            let aData = [ "A", "B", "C" ];
            
            for (let i = 0; i < aData.length; i++) {
                console.log("aData["+i+"] = "+aData[i]);
            }

            console.log(" ");
            /*-------------------------------------------------------*/

            let gtdata = [
                {   
                    value1: "jongro",
                    value2: "Euljiro",
                    value3: "Gwancheol"
                },
                {
                    value1: "Gangdong",
                    value2: "Songpa",
                    value3: "Seocho"
                }
            ];

            for (const sy_index in gtdata) {
               //console.log("gt_data["+sy_index+"] = ", gtdata[sy_index]);
               console.log("sy_index="+sy_index);
            }

            for (const j of gtdata) {
                console.log(gtdata);
            }
        },

        onWidth: function(){

            //UI Component로부터 값을 읽어온다다
            var vWidth = this.getView().byId("word").getValue();

            //입력받은 값을 메소드에 할당한다
            this.getView().byId("word").setWidth(vWidth+"px");

        },

        onClear: function() {

            this.getView().byId("word").setValue("");
            this.getView().byId("num1").setValue("");
            this.getView().byId("num2").setValue("");
            this.getView().byId("in1").setValue("");

            // const ids = ["word", "num1", "num2", "in1"];
            // ids.forEach(id => this.getView().byId(id).setValue(""));
        }
    });
});