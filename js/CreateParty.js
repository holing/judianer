$(document).ready(function() {
	$('#submit').click(function() {
		var partyName = $('#partyName').val();
		var partyAddr = $('#partyAddr').val();

		if (partyName == '' || partyAddr == '') {
			alert("聚会名称和聚会地点不能为空");
			return 0;
		}
	//	alert(partyName + "-" + partyAddr);
		var xmlhttp;
		if (window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		}else{
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}

		var url = "partyName="+partyName+"&partyAddr="+partyAddr;
		// alert(url);
		xmlhttp.open("POST","./php/CreateParty.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var msg = xmlhttp.responseText;
				if (msg == "true") {
					location.href = "./date.html";
				}else{
					alert("Something error!\nif it happens often, send email to: judianer@qq.com");
				}
			}
		}
		xmlhttp.send(url);
//		location.href = "./date.html?partyName="+partyName+"&partyAddr="+partyAddr;
	});

});