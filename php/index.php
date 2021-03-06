<!doctype html>
<html lang="en">

<head>
<meta charset="UTF-8" />
<title>Pagination</title>
<link
	href='https://fonts.googleapis.com/css?family=Roboto:300,700&amp;subset=latin,latin-ext'
	rel='stylesheet' type='text/css' />
<link rel="stylesheet" href="font-awesome/css/font-awesome.min.css" />
  <link rel="stylesheet" href="js/jquery.mobile-1.4.5.min.css" />
<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" />
</head>
<style>
html, body {
	margin: 0;
	padding: 0;
	font-family: 'Roboto-Regular';
	background-color: #f2f2f2;
}
.slider-range{
  width:20%;
  margin-left: 15px;
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

input[type='text'],input[type='number'] {
	width: 130px;
	height: 30px;
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

table thead tr th:last-child, table thead tr td:last-child {
	border-right: 0px;
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

.search_fields{
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
td i{
	float:right;
	padding-right:5px;
}
</style><style>
html, body {
	margin: 0;
	padding: 0;
	font-family: 'Roboto-Regular';
	background-color: #f2f2f2;
}
.slider-range{
  width:20%;
  margin-left: 15px;
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

input[type='text'],input[type='number'] {
	width: 130px;
	height: 30px;
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

table thead tr th:last-child, table thead tr td:last-child {
	border-right: 0px;
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

.search_fields{
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
td i{
	float:right;
	padding-right:5px;
}
.div_selectable{
	width:20%;
}
.checkbox-custom, .radio-custom {
    opacity: 0;
    position: absolute;   
}

.checkbox-custom, .checkbox-custom-label, .radio-custom, .radio-custom-label {
    display: inline-block;
    vertical-align: middle;
    margin: 5px;
    cursor: pointer;
}

.checkbox-custom-label, .radio-custom-label {
    position: relative;
}

.checkbox-custom + .checkbox-custom-label:before, .radio-custom + .radio-custom-label:before {
    content: '';
    background: #fff;
    border: 2px solid #ddd;
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    /*padding: 2px;*/
    margin-right: 10px;
    text-align: center;
}

.checkbox-custom:checked + .checkbox-custom-label:before {
    content: "\f00c";
    font-family: 'FontAwesome';
    background: rebeccapurple;
    color: #fff;
}

.radio-custom + .radio-custom-label:before {
    border-radius: 50%;
}

.radio-custom:checked + .radio-custom-label:before {
    content: "\f00c";
    font-family: 'FontAwesome';
    color: #bbb;
}

.checkbox-custom:focus + .checkbox-custom-label, .radio-custom:focus + .radio-custom-label {
  outline: 1px solid #ddd; /* focus style */
}
</style>
<body>
	<div class="wrapper" style="width:70%;margin:0 auto;">
		<form class="login-form" action="" method="post">
			<div style="min-height: 800px;">
					<h2 style="margin:0;padding:10px 5px;">Pagination</h2>
				<table id="customer-data" style="margin-bottom: 10px;width:100%">
					<thead>
						<tr>
							<td>#</td>
							<td class="sortable searchable" data="rollnumber">Roll Number</td>
							<td class="sortable searchable" data="first_name">First Name</td>
							<td class="sortable searchable" data="last_name">Last Name</td>
							<td class="sortable searchable" data="email">Email</td>
							<td data="gender">Gender</td>
							<td class="setRange sortable" data="marks">Marks</td>
							<td class="selectable sortable" data="city">City</td>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
				<hr style="margin-top:100px;"/>
				<div>
					<div class="onoffswitch">
						Style : Arrow Approach : <input type="radio" name="onoffswitch" class="onoffswitch-checkbox" data=0 checked /> || Button Approach : <input id="btnApp" type="radio" name="onoffswitch" class="onoffswitch-checkbox" data=1 />
					</div>
					<div id="nob">
					Number of Buttons : <input type="number" id="no_of_buttons" value="5"/>
					</div>
				</div>
			</div>
		</form>
	<footer>
		<div class="clr"><span style="">&copy;<a href='http://www.flyingfiveinc.com/' target='_blank'>Flying Five</a> | Naresh Penugurthi |</span><span style="float:right">Version 2.0</span></div>
	</footer>
	</div>
</body>
<script src="js/jquery-2.0.3.min.js"></script>
<script src="js/jquery-ui-1.8.24.min.js"></script>
<script src="bootstrap/js/bootstrap.min.js"></script>
<script src="js/pagination.js"></script>
<script type="text/javascript">
var paginator;
$(document).ready(function(){
	$("input[type='radio']").on("click",function(){
		var approach = $(this).attr('data');
		options = {
			recodsPerPage : 10,
			paginationType : paginationTypeObject.arrowApproach,
			searchURL : 'ajax/searchstudents.php',
			paginationURL : 'ajax/getstudentsdata.php',
			buttonsCount : $('#no_of_buttons').val()
		};
		if(approach == 0){
			options.paginationType = paginationTypeObject.arrowApproach;
			$('#nob').hide();
		}
		else{
			options.paginationType = paginationTypeObject.buttonApproch;
			$('#nob').show();
		}
		paginator.destroy();
		paginator = new Paginator(options);
		paginator.paginate();
	});
	options = {
		recodsPerPage : 10,
		paginationType : paginationTypeObject.arrowApproach,
		searchURL : 'ajax/searchstudents.php',
		paginationURL : 'ajax/getstudentsdata.php',
		buttonsCount : 8
	};
	paginator = new Paginator(options);
	paginator.paginate();
	$('#no_of_buttons').on('keyup blur',function(e) {
		if($(this).val() == '' || $(this).val() == paginator.buttonsCount) return;
		if (isNaN($(this).val()) || $(this).val() == 0) $(this).val(5);
		$('#btnApp').click();
	});
	$('#nob').hide();
});
</script>
</html>