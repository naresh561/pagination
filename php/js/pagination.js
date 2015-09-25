var totalRecords = 0;
var $pageno = 1;
var values = {};
function init(){
	$table = $('.sortable,.searchable').parentsUntil( $( "table" )).parent();
	$($table).has('thead').addClass('pagination_table');
	
	var paginationfieldsgenerationstring ='<input class="pagesize" type="text" id="no_of_records" placeholder="# of records" /> <i class="fa fa-angle-double-left first"></i> <i class="fa fa-angle-left prev"></i> <input type="text" class="pagedisplay" readonly="readonly" /> <i class="fa fa-angle-right next"></i> <i class="fa fa-angle-double-right last"></i>';
	var searchfieldsgenerationstring = "";
	$(".sortable").each(function(){
		searchfieldsgenerationstring += $(this).html() +' <input type="text" data="'+$(this).attr('data')+'" class="change_input"/>';
	});
	
	var searchfieldsdiv = '<div id="nav1" class="search_fields" style="margin-bottom: 10px;"><p style="text-align: center;margin:0 0 10px 0;">Search criteria</p><span>'+searchfieldsgenerationstring+'</span></div><div class="searchbuttons" style="margin-bottom: 10px;float: right"><input id="reset" type="button" style="margin-right: 10px;" value="Reset" disabled /><input type="button" id="search_button" value="Search" disabled /></div><div class="clr"></div>';
	var fields = '<div id="search-div">' +searchfieldsdiv+'</div><div class="clr"></div>'+
	'<div id="pagination-div" style="margin-bottom: 10px;float: right;margin-right:10px;margin-top:2px;">'+paginationfieldsgenerationstring+'</div><img id="loadingimage" src="img/ajax-loader.gif" alt="loading.." />';
	
	$(fields).insertBefore($('.sortable').parentsUntil( $( "table" )).parent()[0]);
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
	

	$('#reset').on('click',function(){
		$search_inputs = $('.search_fields').find('input');
		$($search_inputs).each(function(){
			$(this).val('');
		});
		$('#no_of_records').val(10);
		$('#search_button').click();
	});
	// Searching by enter button
	$('#search_button').on('click',function(){
		$(this).attr('disabled',true);
		 searching();
	});
	// Key press pagination
	$('#no_of_records').on('keyup blur',function(e) {
		if($(this).val() == '') return;
		if (isNaN($(this).val()) || $(this).val() == 0) {
			if(totalRecords > 0){
				if(totalRecords>10)	$('#no_of_records').val(10);
				else $('#no_of_records').val(totalRecords);
			}
		}
		values.perpage = $(this).val();
		pagination(1);
	});
	
	// Pagination : Next Page
	$(".next").on('click', function() {
		if ($pageno < $no_pages) {
			pagination(++$pageno);
		}
	});
	// Pagination : Previous Page
	$(".prev").on('click', function() {
		if ($pageno > 1) {
			pagination(--$pageno);
		}
	});
	// Pagination : Last Page
	$(".last").on('click', function() {
		if ($pageno < $no_pages) pagination($no_pages);
	});
	// Pagination : First Page
	$(".first").on('click', function() {
		if($pageno > 1)
		pagination(1);
	});
	$('#search_button').click();
}

// Appending row to tbody
function pad(s) { return (s < 10) ? '0' + s : s; }

function pagination(pageno) {
	$('#loadingimage').css('display', 'block');
	$pageno = pageno;
	$records_per_page = $('#no_of_records').val();
	if (isNaN($records_per_page) || $records_per_page == 0) {
		if(totalRecords > 0){
			if(totalRecords>10)	$records_per_page = 10;
			else $records_per_page = totalRecords;
		}
		$pageno = 1;
		$('#no_of_records').val($records_per_page);
	}
	$no_pages = Math.ceil(totalRecords / $records_per_page);
	$(".pagedisplay").val($pageno + "/" + $no_pages);
	var jsondata = values;
	jsondata.pageno = $pageno;
	$.ajax({
		url : paginationURL,
		data : jsondata,
		type: "POST",
		dataType : "json",
		success : function(result) {
			appendRow(result['data']);
			$('#loadingimage').css('display', 'none');
		},
		error : function(error) {
			$('#loadingimage').css('display', 'none');
		}
	});
}

// Searching
function searching() {
	$(".sortable").find('i').remove();
	$('#sorted_name').val('');
	$(".sortable").removeClass('sort');
	$('#loadingimage').css('display', 'block');
	$("#pagination-div").show();
	var jsondata = getValues();
	$.ajax({
		url : searchURL,
		data : jsondata,
		type: "POST",
		dataType : "json",
		success : function(result) {
			totalRecords = result.data;
			if(totalRecords > 0){
				if(totalRecords>10)	{
					if (isNaN($('#no_of_records').val()) || $('#no_of_records').val() == 0) $('#no_of_records').val(10);
				}
				else $('#no_of_records').val(totalRecords);
				$(".sortable").append(' <i class="fa fa-sort"></i>');
				$(".sortable").addClass('sort');
				$(".sort").unbind('click');
				$('.sort').on('click', function() {
					if( totalRecords < 1 ) return;
					$('#loadingimage').css('display', 'block');
					$(this).siblings().removeClass('selected');
					$(this).siblings().find("i").attr('class', '').addClass('fa fa-sort');
					var itag = $(this).find( "i" );
					var sortimage = $(itag).attr('class');
					var classes = sortimage.split(" ");
					$('#sorted_name').val($(this).attr('data'));
					values.orderby = $(this).attr('data');
					if(classes[1] == "fa-sort" || classes[1] == "fa-sort-amount-desc"){
						$(itag).attr('class','fa fa-sort-amount-asc');
						$('#sorted_type').val('ASC');
						values.ordertype = 'ASC';
					}
					else {
						$(itag).attr('class','fa fa-sort-amount-desc');
						$('#sorted_type').val('DESC');
						values.ordertype = 'DESC';
					}
					pagination(1);
				});
				pagination(1);
			}
			else {
				$('#loadingimage').css('display', 'none');
				$('.pagination_table').find('tbody').empty().append('<tr><td  colspan="100%" align="center">No records found</td></tr>');
				$("#pagination-div").hide();
			}

		},
		error : function(error) {
			$('#loadingimage').css('display', 'none');
		}
	});
}

// To get input from text fields
function getValues() {
	$search_inputs = $('.search_fields').find('input');
	$($search_inputs).each(function(){
		values[$(this).attr('data')] = $(this).val();
	});
	values.orderby = $('#sorted_name').val();
	values.ordertype = $('#sorted_type').val();
	values.perpage = $('#no_of_records').val();
	if (isNaN(values.perpage) || values.perpage == 0) {
		values.perpage = 10;
		$('#no_of_records').val(10);
	}
	return values;
}
function appendRow(object) {
	if (object == '') {
	} else {
		var rowcount=($pageno-1)*document.getElementById('no_of_records').value +1;
		$tr = $('.pagination_table').find('thead > tr > td');
		$('.pagination_table').find('tbody').empty();
		for ( i = 0; i < object.length; i++) {
			var newrow = "<tr><td>"+(rowcount++)+"</td>"
			$($tr).each(function(){
				var attr = $(this).attr('data');
				if (typeof attr !== typeof undefined && attr !== false) {
					newrow += "<td>"+ object[i][attr]+ "</td>";
				}
			});
			$(newrow+"</tr>").appendTo($("#customer-data tbody"));
			$('td').each(function() {
				if ($(this).text() == 'null') {
					$(this).text('');
				}
			});
		}
	}
	$('#loadingimage').css('display', 'none');
}