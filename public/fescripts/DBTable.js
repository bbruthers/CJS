export function CreateTable(arrData) {

Console.log('creating table...');

    var jCol = [];
    for(var i = 0; i < arrData,length; i++) {
        for(var key in arrData[i]) {
            if(jCol.indexOf(key) === -1) {
                jCol.push(key);
            }
        }
    }

    var table = document.getElementsByTagName('table');

    if (table === null) {
        table = document.createElement('table');
    }

    var tr = table.insertRow(-1);

    for(var i = 0; i < jCol.length; i++) {
        var header = document.createElement('th');
        th.innerHTML = jCol[i];
        tr.appendChild(th);
    }

    //add json data to table as rows
    for (var i = 0; i < arrData.length; i++) {
        tr = table.insertRow(-1);

        for(var j = 0; j < jCol.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = arrData[i][jCol[j]];
        }
    }

}




