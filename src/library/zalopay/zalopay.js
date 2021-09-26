// Node v10.15.3
const axios = require('axios').default; // npm install axios
const CryptoJS = require('crypto-js'); // npm install crypto-js

const config = {
  appid: "2553",
  key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
  key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
  endpoint: "https://sbgateway.zalopay.vn/api/getlistmerchantbanks"
};

let reqtime = Date.now();
let params = {
  appid: config.appid,
  reqtime: reqtime, // miliseconds
  mac: CryptoJS.HmacSHA256(config.appid + "|" + reqtime, config.key1).toString() // appid|reqtime
};

export const getPayZalo = () =>{
    axios.get(config.endpoint, { params })
  .then(res => {
    let banks = res.data.banks;
    for (let id in banks) {
      let banklist = banks[id];
      console.log(id + ".");
      for (let bank of banklist) {
        console.log(bank);
      }
    }
  })
  .catch(err => console.error(err));
}

