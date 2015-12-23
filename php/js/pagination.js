paginationTypeObject = {"arrowApproach":0,"buttonApproch":1};
function Paginator(options){
	this.validatefield = function(value){
		if(typeof value === 'undefined') return false;
		if (isNaN(value)) return false;
		return true;
	}
	
	this.recodsPerPage = this.validatefield(options.recodsPerPage) ? options.recodsPerPage : 10;
	this.paginationType = (this.validatefield(options.paginationType) && options.paginationType < 2 && options.paginationType >= 0)? options.paginationType : paginationTypeObject.arrowApproach;
	this.searchURL = options.searchURL;
	this.paginationURL = options.paginationURL;
	this.buttonsCount = this.validatefield(options.buttonsCount) ? options.buttonsCount : 5;
	this.totalRecords = 0;
	this.currentPageNo = 1;
	this.values = {};
	this.totalPagescount = 0;
	this.paginate = init;
	this.getValues = getValues;
	this.searching = searching;
	this.createButtons = createButtons;
	this.pagination = pagination;
	this.appendRow = appendRow;
}
function init(){
	var object = this;
	$table = $('.sortable,.searchable').parentsUntil( $( "table" )).parent();
	$($table).has('thead').addClass('pagination_table');
	
	var paginationfieldsgenerationstring = (this.paginationType == paginationTypeObject.arrowApproach) ? '<input class="pagesize" type="text" id="no_of_records" placeholder="# of records" value='+object.recodsPerPage+' /> <i class="fa fa-angle-double-left first"></i> <i class="fa fa-angle-left prev"></i> <input type="text" class="pagedisplay" readonly="readonly" /> <i class="fa fa-angle-right next"></i> <i class="fa fa-angle-double-right last"></i>' : '<input class="pagesize" type="text" id="no_of_records" placeholder="# of records" value='+object.recodsPerPage+' />';
	var searchfieldsgenerationstring = "";
	$(".searchable").each(function(){
		searchfieldsgenerationstring += $(this).html() +' <input type="text" data="'+$(this).attr('data')+'" class="change_input"/> ';
	});
	
	var searchfieldsdiv = "";
	if(searchfieldsgenerationstring != "")
		searchfieldsdiv = '<div id="nav1" class="search_fields" style="margin-bottom: 10px;"><p style="text-align: center;margin:0 0 10px 0;">Search criteria</p><span>'+searchfieldsgenerationstring+'</span></div><div class="searchbuttons" style="margin-bottom: 10px;float: right;margin-right: 10px;"><input id="reset" type="button" style="margin-right: 10px;" value="Reset" disabled /><input type="button" id="search_button" value="Search" disabled/></div><div class="clr"></div>';
	var fields = '<div id="search-div">' +searchfieldsdiv+'</div><div class="clr"></div>'+
	'<div id="pagination-div" style="margin-bottom: 10px;float: right;margin-right:10px;margin-top:2px;">'+paginationfieldsgenerationstring+'</div><img id="loadingimage" src="img/ajax-loader.gif" alt="loading.." />';
	
	$(fields).insertBefore($('.pagination_table'));
	
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
		object.recodsPerPage = 10;
		$('#no_of_records').val(10);
		$('#search_button').click();
	});
	// Searching by enter button
	$('#search_button').on('click',function(){
		$(this).attr('disabled',true);
		 object.searching();
	});
	// Key press pagination
	$('#no_of_records').on('keyup blur',function(e) {
		if($(this).val() == '') return;
		if (isNaN($(this).val()) || $(this).val() == 0) {
			if(object.totalRecords > 0){
				if(object.totalRecords>10)	$('#no_of_records').val(10);
				else $('#no_of_records').val(object.totalRecords);
			}
		}
		object.recodsPerPage = $(this).val();
		object.totalPagescount = Math.ceil(object.totalRecords / object.recodsPerPage);
		object.createButtons(1,object.totalPagescount);
	});
	
	// Pagination : Next Page
	$(".next").on('click', function() {
		if (object.currentPageNo < object.totalPagescount) object.createButtons(++object.currentPageNo , object.totalPagescount);
	});
	// Pagination : Previous Page
	$(".prev").on('click', function() {
		if (object.currentPageNo > 1) object.createButtons(--object.currentPageNo , object.totalPagescount);
	});
	// Pagination : Last Page
	$(".last").on('click', function() {
		if (object.currentPageNo < object.totalPagescount) object.createButtons(object.totalPagescount , object.totalPagescount);
	});
	// Pagination : First Page
	$(".first").on('click', function() {
		if(object.currentPageNo > 1) object.createButtons(1 , object.totalPagescount);
	});
	object.searching();
}
function createButtons(currentpage , pages){
	var object = this;
	if(object.paginationType == paginationTypeObject.buttonApproch){
		var Buttons = (pages < object.buttonsCount) ? pages : object.buttonsCount;
		var rightPages = midPage = Math.floor(Buttons/2);
		if(currentpage - rightPages < 1) rightPages = currentpage -1;
		var leftPages = Buttons - ( parseInt(rightPages) + 1);
		if(parseInt(currentpage) + parseInt(leftPages) >  pages){
			leftPages = pages - currentpage;
			rightPages = rightPages + (midPage - leftPages);
			if(currentpage - rightPages < 1) rightPages = currentpage -1;
		}
		var firstButton = '<ul class="pagination" style="float:right"><li class="firstButton"><a href="#" aria-label="Previous" data-pageno = 1 class="bootpag"><span aria-hidden="true">&laquo;</span></a></li>';
		var rightButtons = leftbuttons = "";
		var lastButton = '<li class="lastButton"><a href="#" aria-label="Next" class="bootpag" data-pageno = '+pages+'><span aria-hidden="true">&raquo;</span></a></li></ul>';
		for(var i = 0 ; i < rightPages; i++){
			var datapageno = currentpage - rightPages + i; 
			rightButtons += '<li><a href="#" data-pageno = '+ (datapageno) +' class="bootpag">'+ (datapageno)+'</a></li>';
		}
		for(var i = 1 ; i <= leftPages; i++){
			var datapageno = parseInt(currentpage) + parseInt(i); 
			leftbuttons += '<li><a href="#" data-pageno = '+ (datapageno) +' class="bootpag">'+ (datapageno) +'</a></li>';
		}
		var currentButton = '<li class="active"><a href="#" class="bootpag">'+currentpage+'</a></li>';
		
		var bootpag = firstButton + rightButtons + currentButton + leftbuttons + lastButton;
		$(".pagination").remove();
		$(bootpag).insertAfter($('.pagination_table'));
		$('.bootpag').unbind();
		$('.bootpag').click(function(e){
			e.preventDefault();
			if (isNaN($(this).attr('data-pageno')) || $(this).attr('data-pageno') == 0) return;
			object.createButtons($(this).attr('data-pageno'), pages);
			
		});
		if(currentpage == 1) $(".firstButton").addClass('disabled');
		else $(".firstButton").removeClass('disabled');
		if(currentpage == pages) $(".lastButton").addClass('disabled');
		else $(".lastButton").removeClass('disabled');
	}
	object.pagination(currentpage);
}
function pagination(pageno) {
	var object = this;
	$('#loadingimage').css('display', 'block');
	object.currentPageNo = pageno;
	$(".pagedisplay").val(object.currentPageNo + "/" + object.totalPagescount);
	var jsondata = object.getValues();
	$.ajax({
		url : object.paginationURL,
		data : jsondata,
		type: "POST",
		dataType : "json",
		success : function(result) {
			object.appendRow(result['data']);
			$('#loadingimage').css('display', 'none');
		},
		error : function(error) {
			console.log(error);
			$('#loadingimage').css('display', 'none');
		}
	});
}
// Searching
function searching() {
	var object = this;
	$(".sortable").find('i').remove();
	object.values.orderby = "";
	object.values.ordertype = "";
	$(".sortable").removeClass('sort');
	$('#loadingimage').css('display', 'block');
	$("#pagination-div").show();
	var jsondata = object.getValues();
	$.ajax({
		url : object.searchURL,
		data : jsondata,
		type: "POST",
		dataType : "json",
		success : function(result) {
			object.totalRecords = result.data;
			if(object.totalRecords > 0){
				if(object.totalRecords < 10)	{
					$('#no_of_records').val(object.totalRecords);
					object.recodsPerPage = object.totalRecords;
				}
				object.totalPagescount = Math.ceil(parseInt(object.totalRecords) / $('#no_of_records').val());
				$(".sortable").append(' <i class="fa fa-sort"></i>');
				$(".sortable").addClass('sort');
				$(".sort").unbind('click');
				$('.sort').on('click', function() {
					if( object.totalRecords < 1 ) return;
					$('#loadingimage').css('display', 'block');
					$(this).siblings().removeClass('selected');
					$(this).siblings().find("i").attr('class', '').addClass('fa fa-sort');
					var itag = $(this).find( "i" );
					var sortimage = $(itag).attr('class');
					var classes = sortimage.split(" ");
					object.values.orderby = $(this).attr('data');
					if(classes[1] == "fa-sort" || classes[1] == "fa-sort-amount-desc"){
						$(itag).attr('class','fa fa-sort-amount-asc');
						object.values.ordertype = 'ASC';
					}
					else {
						$(itag).attr('class','fa fa-sort-amount-desc');
						object.values.ordertype = 'DESC';
					}
					object.createButtons(1,object.totalPagescount);
				});
				object.createButtons(1,object.totalPagescount);
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
	var object = this;
	$($search_inputs).each(function(){
		object.values[$(this).attr('data')] = $(this).val();
	});
	object.values.pageno = object.currentPageNo;
	object.values.perpage = object.recodsPerPage;
	return object.values;
}
function appendRow(object) {
	if (object != '') {
		var rowcount=(this.currentPageNo-1)*this.recodsPerPage + 1;
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
			$(newrow+"</tr>").appendTo($(".pagination_table tbody"));
			$('td').each(function() {
				if ($(this).text() == 'null') {
					$(this).text('');
				}
			});
		}
	}
	$('#loadingimage').css('display', 'none');
}