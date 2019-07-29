let d = new Date();

let getCurrentDateTime = function(){
    let timezone_offset_min = new Date().getTimezoneOffset(),
	    offset_hrs = parseInt(Math.abs(timezone_offset_min/60)),
	    offset_min = Math.abs(timezone_offset_min%60),
	    timezone_standard;

    if(offset_hrs < 10)
	    offset_hrs = '0' + offset_hrs;

    if(offset_min < 10)
	    offset_min = '0' + offset_min;

// Add an opposite sign to the offset
// If offset is 0, it means timezone is UTC
    if(timezone_offset_min < 0)
	    timezone_standard = '+' + offset_hrs + ':' + offset_min;
    else if(timezone_offset_min > 0)
	    timezone_standard = '-' + offset_hrs + ':' + offset_min;
    else if(timezone_offset_min == 0)
	    timezone_standard = 'Z';

// Timezone difference in hours and minutes
// String such as +5:30 or -6:00 or Z

    let current_date = d.getDate(),
	    current_month = d.getMonth() + 1,
	    current_year = d.getFullYear(),
	    current_hrs = d.getHours(),
	    current_mins = d.getMinutes(),
	    current_secs = d.getSeconds(),
	    current_datetime;

// Add 0 before date, month, hrs, mins or secs if they are less than 0
    current_date = current_date < 10 ? '0' + current_date : current_date;
    current_month = current_month < 10 ? '0' + current_month : current_month;
    current_hrs = current_hrs < 10 ? '0' + current_hrs : current_hrs;
    current_mins = current_mins < 10 ? '0' + current_mins : current_mins;
    current_secs = current_secs < 10 ? '0' + current_secs : current_secs;

// Current datetime
// String such as 2016-07-16T19:20:30
    current_datetime = current_year + '-' + current_month + '-' + current_date + 'T' + current_hrs + ':' + current_mins + ':' + current_secs;
    console.log("Timezone", timezone_standard, "Date and time", current_datetime, "ISO standard", current_datetime + timezone_standard);

    return current_datetime + timezone_standard;
};

let dd = String(d.getDate()).padStart(2, '0');
let mm = String(d.getMonth() + 1).padStart(2, '0');
let yyyy = d.getFullYear();
let currentDate = yyyy + '-' + mm + '-' + dd;

