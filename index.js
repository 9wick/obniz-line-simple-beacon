
class ObnizLineBeacon {

  constructor(obniz, params){


    // if(obniz instanceof  Obniz){
    //   throw new Error("Add script tag of obniz.js");
    // }

    if(typeof params.hardwareId != "string"
        || params.hardwareId.length != 10){
      throw new Error("hardwareId is must be string and length = 10");
    }
    if(!Array.isArray( params.deviceMessage)
        || params.deviceMessage.length < 1
        || params.deviceMessage.length > 13 ){
      throw new Error("deviceMessage is must be array and 1 <= length <= 13");
    }
    this.obniz = obniz;
    this.params = {};
    this.params.deviceMessage = params.deviceMessage;
    this.params.hardwareId = params.hardwareId;

  }

  start(){

    var adv = this.createAdvData(this.params.hardwareId,this.params.deviceMessage);
    
    this.obniz.ble.advertisement.setAdvDataRaw(adv);
    this.obniz.ble.advertisement.start();
  }
  
  stop(){
    this.obniz.ble.advertisement.end();
  }
  
  createAdvData(hardwareId, deviceMessage){
    var hardwareIdArray = this._hardwareId2array(hardwareId);

    var adv = [];
    var UUID_FOR_LINECORP = [0x6F, 0xFE];


    // flag
    adv = adv.concat([0x02, 0x01, 0x06]);  //LE General Discoverable Mode & BR/EDR Not Supported

    //16bit uuid
    adv = adv.concat([0x03, 0x03]);
    adv = adv.concat(UUID_FOR_LINECORP);

    //simple beacon
    adv = adv.concat([1 + 9 + deviceMessage.length, 0x16]);
    adv = adv.concat(UUID_FOR_LINECORP);
    adv = adv.concat([0x02]);
    adv = adv.concat(hardwareIdArray);
    adv = adv.concat([0x7F]);
    adv = adv.concat(deviceMessage);

    return adv;
  }

  _hardwareId2array(hardwareId) {
    let str = "";
    str += hardwareId.substr(0, 2) + ",";
    str += hardwareId.substr(2, 2) + ",";
    str += hardwareId.substr(4, 2) + ",";
    str += hardwareId.substr(6, 2) + ",";
    str += hardwareId.substr(8, 2);
    return this._string2array(str);
  }

  _string2array(dataString) {
    let dataArray = [];
    if (dataString.indexOf(",") >= 0) {
      dataArray = dataString.trim().split(",").map((e) => {
        return e.trim()
      }).filter((e) => {
        return e.length > 0;
      });
    } else {
      dataArray = dataString.trim().split(" ").map((e) => {
        return e.trim()
      }).filter((e) => {
        return e.length > 0;
      });
    }

    dataArray = dataArray.map((e) => {
      return parseInt(e, 16);
    });

    return dataArray;
  }
}

if(typeof module  != "undefined" && module.exports){
  module.exports = ObnizLineBeacon;
}