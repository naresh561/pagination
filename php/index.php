<!doctype html>
<html lang="en">

<head>
<meta charset="UTF-8" />
<title>Pagination</title>
<script src="js/jquery-2.0.3.min.js"></script>
<link
	href='https://fonts.googleapis.com/css?family=Roboto:300,700&amp;subset=latin,latin-ext'
	rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="font-awesome/css/font-awesome.min.css" />
</head>
<style>
html, body {
	margin: 0;
	padding: 0;
	font-family: 'Roboto-Regular';
	background-color: #f2f2f2;
}

input[type='button'] {
	display: inline-block;
	padding: 6px 12px;
	margin-bottom: 0;
	font-size: 14px;
	font-weight: 400;
	line-height: 1.42857143;
	text-align: center;
	white-space: nowrap;
	vertical-align: middle;
	-ms-touch-action: manipulation;
	touch-action: manipulation;
	cursor: pointer;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	background-image: none;
	border: 1px solid transparent;
	border-radius: 4px;
	color: #fff;
	background-color: #337ab7;
	border-color: #2e6da4;
}

input[type="button"]:disabled {
	color: #333;
	background-color: #fff;
	border-color: #ccc;
}

input[type='text'] {
	width: 130px;
	height: 15px;
	padding: 6px 12px;
	font-size: 14px;
	line-height: 1.42857143;
	color: #555;
	background-color: #fff;
	background-image: none;
	border: 1px solid #ccc;
	border-radius: 4px;
	-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
	box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
	-webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow
		ease-in-out .15s;
	-o-transition: border-color ease-in-out .15s, box-shadow ease-in-out
		.15s;
	transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}

table thead tr th, table thead tr td {
	display: table-cell;
	vertical-align: bottom;
	padding-bottom: 5px;
	padding-top: 10px;
	padding-left: 5px;
	border-bottom: 1px #ddd solid;
	border-right: 1px #ddd solid;
	border-left: 1px transparent solid;
	border-top: 1px transparent solid;
	font-family: 'Segoe UI', 'Open Sans', Verdana, Arial, Helvetica,
		sans-serif;
	font-weight: 400;
	font-size: 11pt;
	letter-spacing: 0.01em;
	line-height: 14pt;
	color: rgba(0, 0, 0, 0.6);
	text-align: left;
}

table tbody tr td {
	font-family: 'Segoe UI Semilight', 'Open Sans', Verdana, Arial,
		Helvetica, sans-serif;
	font-weight: 300;
	font-size: 11pt;
	letter-spacing: 0.02em;
	line-height: 20px;
	padding: 3px 10px;
	border-right: 1px #ddd solid;
	border-bottom: 1px #ddd solid;
	box-sizing: border-box;
}

table {
	width: 100%;
	border-collapse: separate;
	margin: 0 0 20px;
	border-spacing: 0;
}

tbody tr:nth-child(odd) {
	background: #f9f9f9;
}

tbody tr:hover, thead tr td:hover {
	background-color: rgba(28, 183, 236, 0.10);
}

.search_fields {
	padding: 10px;
	border-top: 1px solid #cbcbcb;
	border-bottom: 1px solid #cbcbcb;
}

.wrapper {
	border-right: 1px solid #cbcbcb;
	border-left: 1px solid #cbcbcb;
	border-bottom: 1px solid #cbcbcb;
	background-color: #fff;
}
footer {
	padding:10px 5px;
	border-top: 1px solid #cbcbcb;
	border-bottom: 1px solid #cbcbcb;
	background-color: #fff;
}
</style>
<body>
	<div class="wrapper" style="width:70%;margin:0 auto;">
		<form class="login-form" action="" method="post">
			<div style="min-height: 800px;">
					<h2 style="margin:0;padding:10px 5px;">Pagination</h2>
				<div>
					<div id="nav1" class="search_fields" style="margin-bottom: 10px;">
					<p style="text-align: center;margin:0 0 10px 0;">Search criteria</p>
					<span>
						Roll Number <input name="rollnumber" type="text" id='rollnumber' class="change_input">
						First Name <input name="first_name" type="text" id='first_name' class="change_input">
						Last Name <input name="last_name" type="text" id='last_name' class="change_input">
						Email <input name="email" type="text" id='email' class="change_input">
						Total Marks <input name="marks" type="text"" id='marks' class="change_input">
					</span>
					</div>
					<div class="searchbuttons" style="margin-bottom: 10px;float: right">
						<input id='reset' type="button" value="Reset" disabled />
						<input type="button" id="search_button" value="Search" disabled />
					</div>
					<div class="clr"></div>
				</div>
				<div class="clr"></div>
				<div id='pagination-div' style="margin-bottom: 10px;float: right;margin-right:10px;margin-top:2px;">
					<input class="pagesize" type="text" id='no_of_records'
						placeholder="# of records" /> <i
						class="fa fa-angle-double-left first"></i> <i
						class="fa fa-angle-left prev"></i> <input type="text"
						class="pagedisplay" readonly="readonly" /> <i
						class="fa fa-angle-right next"></i> <i
						class="fa fa-angle-double-right last"></i>
				</div>
				<img id="loadingimage" src="img/ajax-loader.gif" alt="loading.." />
				<table id="customer-data" style="margin-bottom: 10px;width:100%">
					<input type="hidden" id="sorted_name">
					<input type="hidden" id="sorted_type">
					<thead>
						<tr>
							<td>#</td>
							<td class="sortable" id="rollnumber">Roll Number</td>
							<td class="sortable" id="first_name">First Name</td>
							<td class="sortable" id="last_name">Last Name</td>
							<td class="sortable" id="email">Email</td>
							<td class="sortable" id="gender">Gender</td>
							<td class="sortable" id="marks">Marks</td>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</form>
	<footer>
		<div class="clr"><span style="">&copy;<a href='http://www.flyingfiveinc.com/' target='_blank'>Flying Five</a> | Naresh Penugurthi |</span><span style="float:right">Version 1.0</span></div>
	</footer>
	</div>
</body>
<script src="js/jquery-2.0.3.min.js"></script>
<script src="js/pagination.js"></script>
<script type="text/javascript">
var searchURL = 'ajax/addOrders.php';
var paginationURL = 'ajax/retrievesubdomains.php';
var $pageno = 1;
var values = {};
//Appending row to tbody
function appendRow(object) {
	$('#customer-data tbody').empty();
	if (object == '') {
	} else {
		var rowcount=($pageno-1)*document.getElementById('no_of_records').value +1;
		for ( i = 0; i < object.length; i++) {
			var newrow = "<tr><td>"+(rowcount++)+"</td><td>"
					+ object[i]['rollnumber']
					+ "</td><td>"
					+ object[i]['first_name']
					+ "</td><td>"
					+ object[i]['last_name']
					+ "</td><td>"
					+ object[i]['email']
					+ "</td><td>"
					+ object[i]['gender']
					+ "</td><td>"
					+ object[i]['marks']
					+ "</td></tr>";
			$(newrow).appendTo($("#customer-data tbody"));
			$('td').each(function() {
				if ($(this).text() == 'null') {
					$(this).text('');
				}
			});
		}
	}
	$('#loadingimage').css('display', 'none');
}



$(document).ready(function(){
$('.change_input').bind('change keyup',function(e){
		if (e.which == 13) {
			e.preventDefault();
			$('#search_button').click();
			return;
		}
	   var flag = false;
	   $('.change_input').each(function(){
		   if($(this).val().length > 0){
			   flag = true;
			   $("#reset").attr('disabled',false);
			   $("#search_button").attr('disabled',false);
		   }
	   });
	   if(!flag){
		   $("#reset").attr('disabled',true);
		   $("#search_button").attr('disabled',true);
	   }
});
	// Searching by enter button
	$('#search_button').on('click',function(){
		$(this).attr('disabled',true);
		 searching();
	});
	init();
	$('#search_button').click();
});
$('#reset').on('click',function(){
	$search_inputs = $('.search_fields').find('input');
	$($search_inputs).each(function(){
		$(this).val('');
	});
	$('#no_of_records').val(10);
	$('#search_button').click();
});
</script>
</html>
