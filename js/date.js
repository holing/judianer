$(document).ready(function() {
	var CurDate = new Date();
	var Year = CurDate.getFullYear();
	var Month = CurDate.getMonth()+1;
	var Day = CurDate.getDate();
	var week = CurDate.getDay();
	var BoolYear;
	BoolYear = getBoolYear(Year);
	var firstWeek = week + 1 - (Day)%7;
	if (firstWeek < 0) {
		firstWeek = firstWeek + 7;
	}
//	alert(Year + "-"+Month + "-" + Day + "-"+ BoolYear + "-" + week + "-" + firstWeek);
	var MonthDay = 0;
	MonthDay = getMonthDay(Month, BoolYear);
	
	appendToCalTable(Year, Month, MonthDay, firstWeek);
	// innerHtml = '';

	// innerHtml += "<div id=\"table-head\"><div id=\"table-head-year\">" + 
	// "<span>"+ Year + "</span></div><div id=\"table-head-month\">" +
	// 			"<span>"+ Month + "</span></div></div>";

	// $('#table-head-position').append(innerHtml);

	var YearSelect = {};
	var DateOption;
	for (var i = Year; i < Year + 12; i++) {
		DateOption = {'Year':i, 'Month':i-Year+1};
//		alert(DateOption.Year)
		YearSelect[i] = DateOption;
	}
	// YearSelect = eval("("+YearSelect+")");
	// alert(YearSelect[0]);
	innerHtml = '';
	for(var key in YearSelect){
		innerHtml = "<option value=\""+ YearSelect[key].Year + "\" >" + YearSelect[key].Year +"年</option>";
		$('#year-select').append(innerHtml);
		if (YearSelect[key].Month == Month) {
			innerHtml = "<option value=\""+ YearSelect[key].Month + "\" selected>" + YearSelect[key].Month +"月</option>";
		}else{
			innerHtml = "<option value=\""+ YearSelect[key].Month + "\" >" + YearSelect[key].Month +"月</option>";
		}	
		$('#month-select').append(innerHtml);
	}

	/************************以上是初始化日历代码**************************/
	// $('#done').click(function(event) {
	// 	alert("done");
	// });

	// var daySelected = '';

	
	/*************************单击事件代码********************************/
	var changeYear;
	var changeMonth;
	$('select#year-select').change(function() {
		// alert("change");
		changeYear = parseInt($('select#year-select').find('option:selected').val());
		// alert(changeYear);
		changeMonth = parseInt($('select#month-select').find('option:selected').val()) - 1;
		var changeWeek = new Date(changeYear, changeMonth, 1).getDay();
		var changeBoolYear = getBoolYear(changeYear);
		var changeMonthDay = getMonthDay(changeMonth+1, changeBoolYear);
		// alert(changeWeek + "-" + changeMonth);
		$('#cal-table tbody').html("");
		appendToCalTable(changeYear, changeMonth+1, changeMonthDay, changeWeek);
	});
	$('select#month-select').change(function() {
		// alert("change");
		changeYear = parseInt($('select#year-select').find('option:selected').val());
		// alert(changeYear);
		changeMonth = parseInt($('select#month-select').find('option:selected').val()) - 1;
		var changeWeek = new Date(changeYear, changeMonth, 1).getDay();
		var changeBoolYear = getBoolYear(changeYear);
		var changeMonthDay = getMonthDay(changeMonth+1, changeBoolYear);
		// alert(changeWeek + "-" + changeMonth);
		$('#cal-table tbody').html("");
		appendToCalTable(changeYear, changeMonth+1, changeMonthDay, changeWeek);
	});
	/*************************日期修改代码********************************/
	function getMonthDay (Month, BoolYear) {
		var MonthDay;
		switch(Month){
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:
			MonthDay = 31;
			break;
		case 4:
		case 6:
		case 9:
		case 10:
		case 11:
			MonthDay = 30;
			break;
		case 2:
			if (BoolYear == true) {
				MonthDay = 29;
				break;
			}else{
				MonthDay = 28;
				break;
			}
		}
		return MonthDay;	
	}

	function getBoolYear (Year) {
		var BoolYear;
		if ((Year%400 == 0 || (Year%100 != 0 && Year%4 == 0))) {
			BoolYear = true;
		}else{
			BoolYear = false;
		}
		return BoolYear;
	}

	function appendToCalTable (Year, Month, MonthDay, firstWeek) {
		var innerHtml = '';
		var calDate;
		for (var i = 0; i <= 41; i++) {
			if (i%7 == 0) {
				innerHtml = innerHtml + "<tr class=\"date-line\">";
			}
			if(i < firstWeek){
				innerHtml = innerHtml + "<td class=\"date-day\"><a href=\"javascript:;\" hidefocus=\"true\" class=\"date-nolink\"></td>";
			}
			if (i >= firstWeek && i < MonthDay+firstWeek) {
				calDate = Year + "-" + Month + "-" + (i+1-firstWeek);
				innerHtml = innerHtml + "<td class=\"date-day\">" + 
				"<a href=\"javascript:;\" class=\"date-link\"" + 
				"date=\""+ calDate +"\"><span class=\"cal-number\">"+ (i+1-firstWeek) +"</span></a></td>";
			}
			if (i >= MonthDay + firstWeek) {
				innerHtml = innerHtml + "<td class=\"date-day\"><a href=\"javascript:;\" hidefocus=\"true\" class=\"date-link\"></td>";
			}
			if (i%7 == 6) {
				innerHtml = innerHtml + "</tr>"
			}
			
		}
		$('#cal-table tbody').append(innerHtml);
	}
	var j = 0;
	var DateSelected = '';
	$('.date-link').on('click',function() {
			// alert("click");
		$('.date-link').removeClass('td-selected');
		$(this).addClass('td-selected');
		// var date;
		DateSelected = $(this).attr('date');
		// alert(date);
	});
	function removeClass_selected () {
		$('.date-link').removeClass('td-selected');
	}

	$('#done').click(function() {
		var name = $('#user').val();
		// alert(name);
		if (DateSelected == '') {
			alert("Please select a date!");
			return;
		}
		if (name =='') {
			alert("Please input your name!");
			return;
		}
		var xmlhttp;
		if (window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		}else{
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		var url = "DateSelected="+DateSelected+"&name="+name;
		// alert(url);
		xmlhttp.open("POST","./php/create.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var Info = xmlhttp.responseText;
				if (Info == "false") {
					alert("Error!\nPlease mail to chenfushan1992@gmail.com");
				}else if(Info == "empty"){
					alert("Please input the party on the pre page!");
				}else{
					if (Info == "false80") {
						alert("insert error!");
					}else{
						// alert("Success!\nPlease wait for jump~");
						alert(Info);
						location.href = "./party.html?partyID="+Info;
					}
					
				}
			}
		}
		xmlhttp.send(url);


	});
});

	


	
	


	






