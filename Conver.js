module.exports.ConvertCurrency = function(arrJSON) {
    
    for(i = 0; i < arrJSON.length; i++) {
        arrJSON[i].Credit = arrJSON[i].Credit.toFixed(2);
    }

    return arrJSON;
}