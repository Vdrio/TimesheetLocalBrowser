Date.prototype.toIsoString = function() {
    var tzo = -this.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num) {
            var norm = Math.floor(Math.abs(num));
            return (norm < 10 ? '0' : '') + norm;
        };
    return this.getFullYear() +
        '-' + pad(this.getMonth() + 1) +
        '-' + pad(this.getDate()) +
        'T' + pad(this.getHours()) +
        ':' + pad(this.getMinutes()) +
        ':' + pad(this.getSeconds()) +
        dif + pad(tzo / 60) +
        ':' + pad(tzo % 60);
}

function dateToString(date){
    var tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num) {
            var norm = Math.floor(Math.abs(num));
            return (norm < 10 ? '0' : '') + norm;
        };
    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) +
        dif + pad(tzo / 60) +
        ':' + pad(tzo % 60);
}

var number_of_rows = 3;
var total_hours = 0;
var total_cost = 0;
function re_compute()
{
    var hour_cost = document.getElementById("hour_cost").value;
    var extra_cost = document.getElementById("extra_hour_cost").value;
    if(hour_cost && hour_cost)
    {
        // Move across available rows
        for(i = 1 ; i <= number_of_rows; i++)
        {
            if(document.getElementById("start_" + i).value != undefined && document.getElementById("end_" + i).value != undefined)
            var hour_1 = document.getElementById("start_" + i).value;
            var hour_2 = document.getElementById("end_" + i).value;


            if(hour_2 < hour_1)
            {
                // Only calculate if the times are correct
                //alert("Hours in row " + i + " are not correct.");
            }
            else
            {
                // Raw-Basic hour calculation, no minutes involved
                var hours = hour_2.split(':')[0] - hour_1.split(':')[0];
                document.getElementById("hours_" + i).value = hours;
                // Keep the total hours
                total_hours += hours;
                document.getElementById("total_hours").innerHTML = "$" + total_hours;
                if(document.getElementById("type_" + i).value == "Normal")
                {
                    // Compute normal hours
                    document.getElementById("cost_" + i).innerHTML = "$" + hour_cost;
                    document.getElementById("total_" + i).innerHTML = "$" + (hour_cost*hours);
                    total_cost += hour_cost*hours;
                }
                else
                {
                    // Compute extra hours
                    document.getElementById("cost_" + i).innerHTML = "$" + extra_cost;
                    document.getElementById("total_" + i).innerHTML = "$" + (extra_cost*hours);
                    total_cost += extra_cost*hours;
                }
                document.getElementById("total_cost").innerHTML = "$" + total_cost;
            }
        }
    }
    else
    {
        alert("Please type the cost of the normal and extra hours.");
    }
}
function re_compute2(inputParam)
{
alert(inputParam);
}
function runtimeInstantiate(){
//var loc = window.location.pathname;
//var dir = loc.substring(0, loc.lastIndexOf('/'));
var i;
//readTextFile("file:" + dir + "/PC_Log.txt")
var entities = getEntitiesFromStorage();
entities.sort(function(a, b) {
    return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
});
addRow("mainTBL", 1);
for (i = 0; i < entities.length; i++) {
    var entity = entities[i];
    addRowWithData("mainTBL", i + 2, entity);
//alert("here " + i);
}

}
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}

function addRow(tableID, intRowNum){
var table = document.getElementById(tableID);

var rowCount = table.rows.length - 2 ;
var row = table.insertRow(rowCount);

var cell1 = row.insertCell(0);
var element1 = document.createElement("input");
element1.type = "date";
element1.name="date";// + intRowNum;
element1.value = "2021-03-13";
//element1.onchange="recompute2('date_" + intRowNum + "')";
cell1.appendChild(element1);

var cell2 = row.insertCell(1);
var element2 = document.createElement("input");
element2.type = "time";
element2.name="time";// + intRowNum;
//element2.value = "07:00";
//element2.onchange="recompute2('start_" + intRowNum + "')";
cell2.appendChild(element2);

var cell3 = row.insertCell(2);
var element3 = document.createElement("input");
element3.type = "time";
element3.name="lunchStartTime";// + intRowNum;
//element3.value = "11:00";
//element3.onchange="recompute2('lunchStart_" + intRowNum + "')";
cell3.appendChild(element3);

var cell4 = row.insertCell(3);
var element4 = document.createElement("input");
element4.type = "time";
element4.name="lunchEndTime";// + intRowNum;
//element4.value = "12:00";
//element4.onchange="recompute2('lunchEnd_" + intRowNum + "')";
cell4.appendChild(element4);

var cell5 = row.insertCell(4);
var element5 = document.createElement("input");
element5.type = "time";
element5.name="end_" + intRowNum;
//element5.value = "17:00";
//element5.onchange="recompute2('end_" + intRowNum + "')";
cell5.appendChild(element5);
var cell6 = row.insertCell(5);
var element6 = document.createElement("input");
element6.type = "number";
element6.name="hoursLunch_" + intRowNum;
//element6.onchange="recompute2('hoursLunch_" + intRowNum + "')";
cell6.appendChild(element6);
var cell7 = row.insertCell(6);
var element7 = document.createElement("input");
element7.type = "number";
element7.name="hoursTotal_" + intRowNum;
//element7.onchange="recompute2('hoursTotal_" + intRowNum + "')";
cell7.appendChild(element7);
//var cell8 = row.insertCell(7);
//var element8 = document.createElement("input");
//element8.type = "number";
//element8.value= intRowNum;
//cell8.appendChild(element8);




}

function addRowWithData(tableID, intRowNum, entity){
    var table = document.getElementById(tableID);
    
    var rowCount = table.rows.length - 2 ;
    var row = table.insertRow(rowCount);
    
    var cell1 = row.insertCell(0);
    var element1 = document.createElement("input");
    element1.type = "date";
    element1.name="date";// + intRowNum;
    var date = new Date(entity.startTime);
    //element1.value = entity.startTime.slice(0,10);

    /*if (date.getHours()*60 + date.getMinutes() > (new Date()).getTimezoneOffset()){
        date = addDays(date, 1);
    }*/

    var year = date.getFullYear();
    var month = (date.getMonth()+1);
    var day = date.getDate();

    if (month < 10){
        month = '0' + month;
    }
    if (day < 10){
        day = '0' + day;
    }
    element1.value = year + '-' + month + '-' + day;
    //element1.onchange="recompute2('date_" + intRowNum + "')";
    cell1.appendChild(element1);
    
    var cell2 = row.insertCell(1);
    var element2 = document.createElement("input");
    element2.type = "time";
    element2.name="time";// + intRowNum;
    element2.value = (date.getHours()+'').padStart(2, '0') + ':' + (date.getMinutes() + '').padStart(2, '0');
    //element2.onchange="recompute2('start_" + intRowNum + "')";
    cell2.appendChild(element2);
    
    var cell3 = row.insertCell(2);
    date = new Date(entity.lunchStart);
    var element3 = document.createElement("input");
    element3.type = "time";
    element3.name="lunchStartTime";// + intRowNum;
    element3.value = (date.getHours()+'').padStart(2, '0') + ':' + (date.getMinutes() + '').padStart(2, '0');
    //element3.onchange="recompute2('lunchStart_" + intRowNum + "')";
    cell3.appendChild(element3);
    
    var cell4 = row.insertCell(3);
    date = new Date(entity.lunchEnd);
    var element4 = document.createElement("input");
    element4.type = "time";
    element4.name="lunchEndTime";// + intRowNum;
    element4.value = (date.getHours()+'').padStart(2, '0') + ':' + (date.getMinutes() + '').padStart(2, '0');
    //element4.onchange="recompute2('lunchEnd_" + intRowNum + "')";
    cell4.appendChild(element4);
    
    var cell5 = row.insertCell(4);
    date = new Date(entity.endDay);
    var element5 = document.createElement("input");
    element5.type = "time";
    element5.name="end_" + intRowNum;
    element5.value = (date.getHours()+'').padStart(2, '0') + ':' + (date.getMinutes() + '').padStart(2, '0');
    //element5.onchange="recompute2('end_" + intRowNum + "')";
    cell5.appendChild(element5);
    var cell6 = row.insertCell(5);
    var element6 = document.createElement("input");
    element6.type = "number";
    element6.name="hoursLunch_" + intRowNum;
    //element6.onchange="recompute2('hoursLunch_" + intRowNum + "')";
    cell6.appendChild(element6);
    var cell7 = row.insertCell(6);
    var element7 = document.createElement("input");
    element7.type = "number";
    element7.name="hoursTotal_" + intRowNum;
    //element7.onchange="recompute2('hoursTotal_" + intRowNum + "')";
    cell7.appendChild(element7);
    //var cell8 = row.insertCell(7);
    //var element8 = document.createElement("input");
    //element8.type = "number";
    //element8.value= intRowNum;
    //cell8.appendChild(element8);
    
    
    
    
    }

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

function addTimesheetEntities(entities){
    for(var i = 0; i < entities.length; i++){
        var entity = entities[i];
        addEntityToStorage(entity);
    }
}

function addTimesheetEntity(date, time, startLunch, endLunch, endDay){ 
    var entity = new TimesheetEntity();
    entity.startTime = date + time;
    entity.startLunch = date + startLunch;
    entity.endLunch = date + endLunch;
    entity.endDay = date + endDay;
    addEntityToStorage(entity);
}

function addEntityToStorage(entity){
    var entities = getEntitiesFromStorage();
    entities.push(entity);
    setEntitiesForStorage(entities);
}

function submitTimesheetEntities(){
    var table = document.getElementById("mainTBL");
    var entities = [];
    for(var i = 1; i < table.rows.length - 2; i++){
        var row = table.rows[i];
        var date = row.cells[0].firstChild.value;
        var startTime;
        var time = row.cells[1].firstChild.value;
        var lunchStart = row.cells[2].firstChild.value;
        var lunchEnd = row.cells[3].firstChild.value;
        var endTime = row.cells[4].firstChild.value;
        var entity = new TimesheetEntity();
        if (time != null)
        {
            entity.startTime = new Date(date.split('-')[0], date.split('-')[1]-1, date.split('-')[2],
                time.split(':')[0], time.split(':')[1]);
            entity.lunchStart = new Date(date.split('-')[0], date.split('-')[1]-1, date.split('-')[2],
                lunchStart.split(':')[0], lunchStart.split(':')[1]);
            entity.lunchEnd = new Date(date.split('-')[0], date.split('-')[1]-1, date.split('-')[2],
                lunchEnd.split(':')[0], lunchEnd.split(':')[1]);
            entity.endDay = new Date(date.split('-')[0], date.split('-')[1]-1, date.split('-')[2],
                endTime.split(':')[0], endTime.split(':')[1]);

            entity.startTime = dateToString(entity.startTime);//.toISOString();//.slice(0,19)+tzoffset;
            entity.lunchStart = dateToString(entity.lunchStart);//.toISOString();//.slice(0,19)+tzoffset;
            entity.lunchEnd = dateToString(entity.lunchEnd);//.toISOString();//.slice(0,19)+tzoffset;
            entity.endDay = dateToString(entity.endDay);//.toISOString();//.slice(0,19)+tzoffset;
            entities.push(entity);
        }
    }
    setEntitiesForStorage(entities);
    location.reload();
}

function setEntitiesForStorage(entities){
    var localStorage = window.localStorage;
    var json = JSON.stringify(entities);
    localStorage.setItem("timesheetEntities18", json);
}

function getEntitiesFromStorage(){
    var storage = window.localStorage;
    if (storage.getItem('timesheetEntities18') != null){
        var entities = JSON.parse(storage.getItem('timesheetEntities18'));
        return entities;
    }
    else{
        return [];
    }

}

class TimesheetEntity{
    startTime;
    startLunch;
    endLunch;
    endDay;    
}

