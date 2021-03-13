# HTML/CSS3 and Javascript Timesheet for local use
> Simplify your timesheets at your MIC (Military-Industrial Complex) job that won't let you use outside software so you're stuck with scripting.

## Table of contents
* [General info](#general-info)
* [Setup](#setup)
* [Code Explanation](#code-explanation)
* [Status](#status)
* [Contact](#contact)

## General info
This project uses HTML/CSS3 and Javascript to make a functional timesheet that saves to the browser's local storage.


## Setup
Just copy the files in this repository to a common folder. Run the html file in a browser and you're set!

## Code Explanation
Once the submit button is clicked, submitTimesheetEntities() is called and goes through all the rows in the table that has set a start time. Each row is turned into a TimesheetEntity object and is added/replaced to the array of TimesheetEntity in the localStorage. 
When inputting hours for lunch or hours worked total, only start times are respected and end times are filled by the hours specified. See



## Status
Project is: _in progress_


## Contact
Created by [@Vdrio](lucasdglass@outlook.com) - feel free to contact me!
