# LINE Beacon for obniz

[English is here](./README.md)


obnizをLINE Beacon化するライブラリです。


## 使い方

obniz.onconnectなど、obnizとの通信が可能な関数内で使用してください。

```javascript
let hardwareId = "0116cbf379"; //払い出されたID
let deviceMessage =  [0x01, 0x02, 0x10];  //サーバーに送るメッセージ　1~13byte

obniz.onconnect = async () => {
    let beacon = new ObnizLineBeacon(obniz, {deviceMessage, hardwareId});
    beacon.start();
 
    await obniz.wait(1000);
    beacon.stop();
    
};
```

## Functions
### new ObnizLineBeacon(obniz, {deviceMessage, hardwareId});

ObnizLineBeaconをインスタンス化します

|  Params  |  Require  |  Detail  |
| ---- |  :----: | ---- |
|  obniz  | * |  接続済みのobnizインスタンス  |
|  hardwareId  |  * |  LINEから払い出されたハードウェアID  |
|  deviceMessage  | * |   サーバーに送るメッセージ  |

### start()

Beaconを開始します。

### stop()

Beaconを終了します。



## License
MIT
