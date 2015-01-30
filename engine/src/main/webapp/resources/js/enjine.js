/*
Enjiine js
Version: 1
 */

function isEmpty(str) {
	return (!str || 0 === str.length);
}

function longToDate(l) {
	// yyyy-MM-ddTHH:mm:ss

	var d = new Date(l);
	var mo = d.getMonth() + 1;
	var day = d.getDate();
	var hh = d.getHours();
	var mm = d.getMinutes();
	var ss = d.getSeconds();

	if (mo < 10)
		mo = "0" + mo;

	if (day < 10)
		day = "0" + day;
	if (hh < 10)
		hh = "0" + hh;
	if (mm < 10)
		mm = "0" + mm
	if (ss < 10)
		ss = "0" + ss;

	var result = d.getFullYear() + "-" + mo + "-" + day + "T" + hh + ":" + mm
			+ ":" + ss;
	return result;

}