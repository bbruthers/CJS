function UpdateHistTable(mapcoord)
{
    var tablearea = document.getElementById('tablesec');
    //var table = document.createElement('table');
    var table = document.getElementById('histTable');
    var tablebody = document.getElementById('histTBody');

    if (table === null)
    {
        table = document.createElement('table');
        table.id = 'histTable';

        table.classList.add("table-responsive");
        table.classList.add('table');
        //table.classList.add('histTable');
        
        tablebody = document.createElement('tbody');
        tablebody.id = 'histTBody';
        table.appendChild(tablebody);
        
    }

    var tablerow = document.createElement('tr');
    //tablerow.onmousedown = TraverseHistoricalPin;
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');

    var la = document.createTextNode(mapcoord.lat());
    var ln = document.createTextNode(mapcoord.lng());
    //var la = document.createTextNode(plat);
    //var ln = document.createTextNode(plong);

    td1.appendChild(la);
    td2.appendChild(ln);
    tablerow.appendChild(td1);
    tablerow.appendChild(td2);

    tablebody.appendChild(tablerow);

    tablearea.appendChild(table);
}