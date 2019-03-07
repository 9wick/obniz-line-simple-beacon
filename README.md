# LINE Beacon for obniz

[English is here](./README.md)

Use LINE Beacon with obniz.


## How to use

Use in obniz.onconnect.

```javascript
let hardwareId = "0116cbf379"; 
let deviceMessage =  [0x01, 0x02, 0x10];  //　1~13byte

obniz.onconnect = async () => {
    let beacon = new ObnizLineBeacon(obniz, {deviceMessage, hardwareId});
    beacon.start();
 
    await obniz.wait(1000);
    beacon.stop();
    
};
```

## Functions
### new ObnizLineBeacon(obniz, {deviceMessage, hardwareId});

Create ObnizLineBeacon instance

|  Params  |  Require  |  Detail  |
| ---- |  :----: | ---- |
|  obniz  | * |  obniz instance  |
|  hardwareId  |  * |  Hardware ID provided by LINE  |
|  deviceMessage  | * |   Message send to server  |

### start()

Start beacon.

### stop()

Stop Beacon



## License
MIT
