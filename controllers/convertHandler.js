/*
*
*
*       Complete the handler logic below
*       
*       
*/
var math  = require('mathjs');

function ConvertHandler() {
  this.unit_array = ["gal","lbs","kg","mi","km","l"];
  
  this.getUnit = function(input) {
        let result, result_value;
     input = input.toLowerCase();
    for (var i=0; i<this.unit_array.length; i++) {
    	if(input.lastIndexOf(this.unit_array[i]) !== -1) {

        result_value = input.slice(input.lastIndexOf(this.unit_array[i]), input.lastIndexOf(this.unit_array[i])+(this.unit_array[i].length));

        if(input.slice(0-result_value.length)==result_value) {
        	break;
        }
       
      }
    }

    if((result_value!==undefined) && (input.slice(0-result_value.length)==result_value)) {    
    	result =  result_value;      
    } else {
    	result = "invalid unit";
    }
    
   

    return result;
  };
  
  this.getNum = function(input) {

      let result;
      input = input.toLowerCase();
      if (this.unit_array.includes(input)) {
          result = 1;
      } else {
        var unit = input.trim().split(/\d+/g).filter(n => n).pop().trim();
        result = input.trim().split(unit).filter(n => n)[0].trim();
        if (result.match('^(([0-9]+(\.[0-9]+)?)(\/?)([0-9]+(\.[0-9]+)?)?)$') == null) {
            result = 'invalid number';                  
        }
      }
      if (result != "invalid number") {
          result = math.evaluate(result);         
      }
          return result;
   };

  this.getReturnUnit = function(initUnit) {
    let result;
     switch (initUnit) {
    case 'gal':
      result = 'l';
      break;
    case 'l':
      result = 'gal';
      break;
    case 'lbs':
      result = 'kg';
      break;
    case 'kg':
      result = 'lbs';
      break;  
    case 'mi':
      result = 'km';
      break;
    case 'km':
      result = 'mi';
      break;
    default:
      result = 'invalid unit';
    break;
}     
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
       switch (unit) {
        case 'gal':
          result = 'gallons';
          break;
        case 'l':
          result = 'liters';
          break;
        case 'L':
          result = 'liters';
          break;
        case 'lbs':
          result = 'pounds';
          break;
        case 'kg':
          result = 'kilograms';
          break;  
        case 'mi':
          result = 'miles';
          break;
        case 'km':
          result = 'kilometers';
          break;    
    } 
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
     switch (initUnit) {
    case 'gal':
      result = (initNum)*galToL;
      break;
    case 'l':
      result = (initNum)/galToL;
      break;
    case 'lbs':
      result = (initNum)*lbsToKg;
      break;
    case 'kg':
      result = (initNum)/lbsToKg;
      break;   
    case 'mi':
      result = (initNum)*miToKm;
      break;
    case 'km':
      result = (initNum)/miToKm;
      break;
    default:
      result = 'invalid unit';
    break;
}    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    if(initUnit=='invalid unit') {
      result = 'invalid unit';
    } else if (initNum=='invalid number') {
      result = 'invalid number';
    } else {
      if (initUnit=="l") {
        initUnit = "L"
        };
      if (returnUnit=="l") {
        returnUnit = "L";
      }
    result = initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to '+ parseFloat(returnNum).toFixed(5) +' '+ this.spellOutUnit(returnUnit);   
    }
    return result;
  };
  
};

module.exports = ConvertHandler;