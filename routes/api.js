/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      let input = req.query.input;
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
     if(initUnit=='invalid unit' && initNum=='invalid number') {
       console.log("initNum:"+initNum);
         res.json({"error":"invalid number and unit"});
      } else if(initUnit=='invalid unit') {
         res.json({"error":"invalid unit"});
      } else if (initNum=='invalid number') {
         res.json({"error":"invalid number"});
      } else {
      if (initUnit=="l") initUnit = "L";
      if (returnUnit=="l") returnUnit = "L";
      res.json({"initNum": initNum , "initUnit": initUnit , "returnNum": parseFloat((returnNum).toFixed(5)), "returnUnit":returnUnit, "string":toString});
      }
    });
    
};
