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

var color = '#ff0000';
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
    var startDate = new Date(entity.startTime);

    if (startDate.getDay() == 0){
        color = changeColor();
    }
    addRowWithData("mainTBL", i + 2, entity, color);
//alert("here " + i);
}

}


function changeColor(){
    return '#00ff00';
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
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
element1.name= 'd' + intRowNum;
element1.value = formatDate(Date.now());

cell1.appendChild(element1);

var cell2 = row.insertCell(1);
var element2 = document.createElement("input");
element2.type = "time";
element2.name="time";// + intRowNum;
//element2.value = "07:00";
element2.onchange = (e) => recomputeEndHours(e, rowCount);
cell2.appendChild(element2);

var cell3 = row.insertCell(2);
var element3 = document.createElement("input");
element3.type = "time";
element3.name="lunchStartTime";// + intRowNum;
//element3.value = "11:00";
element3.onchange = (e) => recomputeEndHours(e, rowCount);
cell3.appendChild(element3);

var cell4 = row.insertCell(3);
var element4 = document.createElement("input");
element4.type = "time";
element4.name="lunchEndTime";// + intRowNum;
//element4.value = "12:00";
element4.onchange = (e) => recomputeEndHours(e, rowCount);
cell4.appendChild(element4);

var cell5 = row.insertCell(4);
var element5 = document.createElement("input");
element5.type = "time";
element5.name="end_" + rowCount;
//element5.value = "17:00";
element5.onchange = (e) => recomputeEndHours(e, rowCount);
cell5.appendChild(element5);
var cell6 = row.insertCell(5);
var element6 = document.createElement("input");
element6.type = "number";
element6.name="hoursLunch_" + rowCount;
element6.onchange = (e) => recomputeEndHours(e, rowCount);
cell6.appendChild(element6);
var cell7 = row.insertCell(6);
var element7 = document.createElement("input");
element7.type = "number";
element7.name="hoursTotal_" + rowCount;
element7.onchange = (e) => recomputeEndHours(e, rowCount);
cell7.appendChild(element7);
//var cell8 = row.insertCell(7);
//var element8 = document.createElement("input");
//element8.type = "number";
//element8.value= intRowNum;
//cell8.appendChild(element8);




}

function addRowWithData(tableID, intRowNum, entity, color){
    var table = document.getElementById(tableID);
    
    var rowCount = table.rows.length - 2 ;
    var row = table.insertRow(rowCount);
    
    var cell1 = row.insertCell(0);
    var element1 = document.createElement("input");
    row.style = "background-color:" + color;
    //element1.style = "background-color:" + color;
    element1.type = "date";
    element1.name="d" + rowCount;
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
    element1.onchange="recomputeEndHours(" + rowCount + ")";
    cell1.appendChild(element1);
    
    var cell2 = row.insertCell(1);
    var element2 = document.createElement("input");
    element2.type = "time";
    element2.name="time";// + intRowNum;
    element2.value = (date.getHours()+'').padStart(2, '0') + ':' + (date.getMinutes() + '').padStart(2, '0');
    element2.onchange = (e) => recomputeEndHours(e, rowCount);
    cell2.appendChild(element2);
    
    var cell3 = row.insertCell(2);
    date = new Date(entity.lunchStart);
    var element3 = document.createElement("input");
    element3.type = "time";
    element3.name="lunchStartTime";// + intRowNum;
    element3.value = (date.getHours()+'').padStart(2, '0') + ':' + (date.getMinutes() + '').padStart(2, '0');
    element3.onchange = (e) => recomputeEndHours(e, rowCount);
    cell3.appendChild(element3);
    
    var cell4 = row.insertCell(3);
    date = new Date(entity.lunchEnd);
    var element4 = document.createElement("input");
    element4.type = "time";
    element4.name="lunchEndTime";// + intRowNum;
    element4.value = (date.getHours()+'').padStart(2, '0') + ':' + (date.getMinutes() + '').padStart(2, '0');
    element4.onchange = (e) => recomputeEndHours(e, rowCount);
    cell4.appendChild(element4);
    
    var cell5 = row.insertCell(4);
    date = new Date(entity.endDay);
    var element5 = document.createElement("input");
    element5.type = "time";
    element5.name="end_" + intRowNum;
    element5.value = (date.getHours()+'').padStart(2, '0') + ':' + (date.getMinutes() + '').padStart(2, '0');
    element5.onchange = (e) => recomputeEndHours(e, rowCount);
    cell5.appendChild(element5);
    var cell6 = row.insertCell(5);
    var element6 = document.createElement("input");
    element6.type = "number";
    element6.name="hoursLunch_" + intRowNum;
    cell6.appendChild(element6);
    element6.onchange = (e) => recomputeEndHours(e, rowCount);

    var cell7 = row.insertCell(6);
    var element7 = document.createElement("input");
    element7.type = "number";
    element7.name="hoursTotal_" + intRowNum;
    cell7.appendChild(element7);
    element7.onchange = (e) => recomputeEndHours(e, rowCount);
    //element7.addEventListener('change', recomputeEndHours(e, rowCount));

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

function recomputeEndHours(e, index){
    var table = document.getElementById("mainTBL");
    var entities = [];
    //for(var i = 1; i < table.rows.length - 2; i++){
    var row = table.rows[index];
    if (row.cells[6]?.firstChild != null){
        var date = row.cells[0].firstChild.value;
        var time = row.cells[1].firstChild.value;
        var lunchStart = row.cells[2].firstChild.value;
        var endTime = row.cells[4].firstChild.value;
        var lunchEnd = row.cells[3].firstChild.value;
        var lunchHours = row.cells[5].firstChild.value;
        var totalHours = row.cells[6].firstChild.value;
        var entity = new TimesheetEntity();
        if (time != null)
        {
            if (lunchHours != null && totalHours != null){
                if (lunchHours >= 0){
                    var hours = parseInt(lunchStart.split(':')[0]) + Math.floor(lunchHours);
                    var minutes = parseInt(lunchStart.split(':')[1]) + (lunchHours - Math.floor(lunchHours))*60;
                    if (minutes >= 60){
                        minutes = minutes % 60;
                        hours++;
                    }
                    lunchEnd = (hours + '').padStart(2, '0') + ':' + (minutes+ '').padStart(2,'0');
                    row.cells[3].firstChild.value = lunchEnd;
                }
                if (totalHours >= 0){
                    var hours = parseInt(time.split(':')[0]) + Math.floor(lunchHours) + Math.floor(totalHours);
                    var minutes = parseInt(time.split(':')[1]) + Math.round(((lunchHours - Math.floor(lunchHours))*60) + (totalHours - Math.floor(totalHours))*60);
                    if (minutes >= 120){
                        minutes = minutes % 60;
                        hours+=2;
                    }
                    else if (minutes >= 60){
                        minutes = minutes % 60;
                        hours++;
                    }
                    endTime = (hours + '').padStart(2, '0') + ':' + (minutes+ '').padStart(2,'0');
                    row.cells[4].firstChild.value = endTime;
                }
            }
        }
    }
    //}
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
        if (time != '')
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

function loadUser(userId){
    console.log(userId);
}

class TimesheetEntity{
    startTime;
    startLunch;
    endLunch;
    endDay;
}

