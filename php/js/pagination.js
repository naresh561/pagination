var totalRecords = 0;
var $pageno = 1;
function init(){
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
					console.log($('#no_of_records').val());
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
					$('#sorted_name').val($(this).attr('id'));
					if(classes[1] == "fa-sort" || classes[1] == "fa-sort-amount-desc"){
						$(itag).attr('class','fa fa-sort-amount-asc');
						$('#sorted_type').val('ASC');
					}
					else {
						$(itag).attr('class','fa fa-sort-amount-desc');
						$('#sorted_type').val('DESC');
					}
					pagination(1);
				});
				pagination(1);

			}
			else {
				$('#loadingimage').css('display', 'none');
				$('#customer-data tbody').empty();
				$('#customer-data tbody').append('<tr><td  colspan="100%" align="center">No records found</td></tr>');
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
		values[$(this).attr('id')] = $(this).val();
	});
	values.orderby = document.getElementById('sorted_name').value;
	values.ordertype = document.getElementById('sorted_type').value;
	values.perpage = document.getElementById('no_of_records').value;
	if (isNaN(values.perpage) || values.perpage == 0) {
		values.perpage = 10;
		document.getElementById('no_of_records').value = 10;
	}
	return values;
}