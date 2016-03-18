!function (a, b) { "object" == typeof module && module.exports ? module.exports = b() : "function" == typeof define && define.amd ? define(b) : a.Spinner = b() }(this, function () { "use strict"; function a(a, b) { var c, d = document.createElement(a || "div"); for (c in b) d[c] = b[c]; return d } function b(a) { for (var b = 1, c = arguments.length; c > b; b++) a.appendChild(arguments[b]); return a } function c(a, b, c, d) { var e = ["opacity", b, ~~(100 * a), c, d].join("-"), f = .01 + c / d * 100, g = Math.max(1 - (1 - a) / b * (100 - f), a), h = j.substring(0, j.indexOf("Animation")).toLowerCase(), i = h && "-" + h + "-" || ""; return m[e] || (k.insertRule("@" + i + "keyframes " + e + "{0%{opacity:" + g + "}" + f + "%{opacity:" + a + "}" + (f + .01) + "%{opacity:1}" + (f + b) % 100 + "%{opacity:" + a + "}100%{opacity:" + g + "}}", k.cssRules.length), m[e] = 1), e } function d(a, b) { var c, d, e = a.style; if (b = b.charAt(0).toUpperCase() + b.slice(1), void 0 !== e[b]) return b; for (d = 0; d < l.length; d++) if (c = l[d] + b, void 0 !== e[c]) return c } function e(a, b) { for (var c in b) a.style[d(a, c) || c] = b[c]; return a } function f(a) { for (var b = 1; b < arguments.length; b++) { var c = arguments[b]; for (var d in c) void 0 === a[d] && (a[d] = c[d]) } return a } function g(a, b) { return "string" == typeof a ? a : a[b % a.length] } function h(a) { this.opts = f(a || {}, h.defaults, n) } function i() { function c(b, c) { return a("<" + b + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', c) } k.addRule(".spin-vml", "behavior:url(#default#VML)"), h.prototype.lines = function (a, d) { function f() { return e(c("group", { coordsize: k + " " + k, coordorigin: -j + " " + -j }), { width: k, height: k }) } function h(a, h, i) { b(m, b(e(f(), { rotation: 360 / d.lines * a + "deg", left: ~~h }), b(e(c("roundrect", { arcsize: d.corners }), { width: j, height: d.scale * d.width, left: d.scale * d.radius, top: -d.scale * d.width >> 1, filter: i }), c("fill", { color: g(d.color, a), opacity: d.opacity }), c("stroke", { opacity: 0 })))) } var i, j = d.scale * (d.length + d.width), k = 2 * d.scale * j, l = -(d.width + d.length) * d.scale * 2 + "px", m = e(f(), { position: "absolute", top: l, left: l }); if (d.shadow) for (i = 1; i <= d.lines; i++) h(i, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)"); for (i = 1; i <= d.lines; i++) h(i); return b(a, m) }, h.prototype.opacity = function (a, b, c, d) { var e = a.firstChild; d = d.shadow && d.lines || 0, e && b + d < e.childNodes.length && (e = e.childNodes[b + d], e = e && e.firstChild, e = e && e.firstChild, e && (e.opacity = c)) } } var j, k, l = ["webkit", "Moz", "ms", "O"], m = {}, n = { lines: 12, length: 7, width: 5, radius: 10, scale: 1, corners: 1, color: "#000", opacity: .25, rotate: 0, direction: 1, speed: 1, trail: 100, fps: 20, zIndex: 2e9, className: "spinner", top: "50%", left: "50%", shadow: !1, hwaccel: !1, position: "absolute" }; if (h.defaults = {}, f(h.prototype, { spin: function (b) { this.stop(); var c = this, d = c.opts, f = c.el = a(null, { className: d.className }); if (e(f, { position: d.position, width: 0, zIndex: d.zIndex, left: d.left, top: d.top }), b && b.insertBefore(f, b.firstChild || null), f.setAttribute("role", "progressbar"), c.lines(f, c.opts), !j) { var g, h = 0, i = (d.lines - 1) * (1 - d.direction) / 2, k = d.fps, l = k / d.speed, m = (1 - d.opacity) / (l * d.trail / 100), n = l / d.lines; !function o() { h++; for (var a = 0; a < d.lines; a++) g = Math.max(1 - (h + (d.lines - a) * n) % l * m, d.opacity), c.opacity(f, a * d.direction + i, g, d); c.timeout = c.el && setTimeout(o, ~~(1e3 / k)) }() } return c }, stop: function () { var a = this.el; return a && (clearTimeout(this.timeout), a.parentNode && a.parentNode.removeChild(a), this.el = void 0), this }, lines: function (d, f) { function h(b, c) { return e(a(), { position: "absolute", width: f.scale * (f.length + f.width) + "px", height: f.scale * f.width + "px", background: b, boxShadow: c, transformOrigin: "left", transform: "rotate(" + ~~(360 / f.lines * k + f.rotate) + "deg) translate(" + f.scale * f.radius + "px,0)", borderRadius: (f.corners * f.scale * f.width >> 1) + "px" }) } for (var i, k = 0, l = (f.lines - 1) * (1 - f.direction) / 2; k < f.lines; k++) i = e(a(), { position: "absolute", top: 1 + ~(f.scale * f.width / 2) + "px", transform: f.hwaccel ? "translate3d(0,0,0)" : "", opacity: f.opacity, animation: j && c(f.opacity, f.trail, l + k * f.direction, f.lines) + " " + 1 / f.speed + "s linear infinite" }), f.shadow && b(i, e(h("#000", "0 0 4px #000"), { top: "2px" })), b(d, b(i, h(g(f.color, k), "0 0 1px rgba(0,0,0,.1)"))); return d }, opacity: function (a, b, c) { b < a.childNodes.length && (a.childNodes[b].style.opacity = c) } }), "undefined" != typeof document) { k = function () { var c = a("style", { type: "text/css" }); return b(document.getElementsByTagName("head")[0], c), c.sheet || c.styleSheet }(); var o = e(a("group"), { behavior: "url(#default#VML)" }); !d(o, "transform") && o.adj ? i() : j = d(o, "animation") } return h });
paginationTypeObject = { "arrowApproach": 0, "buttonApproch": 1 };
function Paginator(options) {
    this.validatefield = function (value) {
        if (typeof value === 'undefined') return false;
        if (isNaN(value)) return false;
        return true;
    }

    this.recodsPerPage = this.validatefield(options.recodsPerPage) ? options.recodsPerPage : 10;
    this.paginationType = (this.validatefield(options.paginationType) && options.paginationType < 2 && options.paginationType >= 0) ? options.paginationType : paginationTypeObject.arrowApproach;
    this.searchURL = options.searchURL;
    this.paginationURL = options.paginationURL;
    this.buttonsCount = this.validatefield(options.buttonsCount) ? options.buttonsCount : 5;
    this.totalRecords = 0;
    this.currentPageNo = 1;
    this.values = {};
    this.values.range = [];
    this.values.israngeChanged = false;
	this.values.selectables = [];
    this.values.isselectionChanged = false;
    this.totalPagescount = 0;
    this.paginate = init;
    this.getValues = getValues;
    this.searching = searching;
    this.createButtons = createButtons;
    this.pagination = pagination;
    this.appendRow = appendRow;
    this.destroy = destroy;
    var opts = {
        lines: 17 // The number of lines to draw
		, length: 56 // The length of each line
		, width: 3 // The line thickness
		, radius: 49 // The radius of the inner circle
		, scale: 1 // Scales overall size of the spinner
		, corners: 0 // Corner roundness (0..1)
		, color: '#000' // #rgb or #rrggbb or array of colors
		, opacity: 0 // Opacity of the lines
		, rotate: 0 // The rotation offset
		, direction: 1 // 1: clockwise, -1: counterclockwise
		, speed: 1.4 // Rounds per second
		, trail: 94 // Afterglow percentage
		, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
		, zIndex: 2e9 // The z-index (defaults to 2000000000)
		, className: 'spinner' // The CSS class to assign to the spinner
		, top: '50%' // Top position relative to parent
		, left: '50%' // Left position relative to parent
		, shadow: true // Whether to render a shadow
		, hwaccel: true // Whether to use hardware acceleration
		, position: 'absolute' // Element positioning
    };
    this.spinner = new Spinner(opts);
    this.target = "";
}
function init() {
    var object = this;
    $table = $('.sortable,.searchable').parentsUntil($("table")).parent();
    $($table).has('thead').addClass('pagination_table');

    var paginationfieldsgenerationstring = (this.paginationType == paginationTypeObject.arrowApproach) ? '<input class="pagesize" type="text" id="no_of_records" placeholder="# of records" value=' + object.recodsPerPage + ' /> <i class="fa fa-angle-double-left first"></i> <i class="fa fa-angle-left prev"></i> <input type="text" class="pagedisplay" readonly="readonly" /> <i class="fa fa-angle-right next"></i> <i class="fa fa-angle-double-right last"></i>' : '<input class="pagesize" type="text" id="no_of_records" placeholder="# of records" value=' + object.recodsPerPage + ' />';
    var searchfieldsgenerationstring = "";
    $(".searchable").each(function () {
        searchfieldsgenerationstring += $(this).html() + ' <input type="text" data="' + $(this).attr('data') + '" class="change_input"/> ';
    });
    var rangefieldsgenerationstring = "";
    $(".setRange").each(function () {
        object.values.range.push({ "field": $(this).attr('data'), "min": 0, "max": 500 });
        rangefieldsgenerationstring += $(this).html() + '<div class="slider-range" data="' + $(this).attr('data') + '">min : <input type="text" style="width:30%;margin-top:15px;" disabled/> max : <input type="text" style="width:30%;margin-top:15px;" disabled/></div>';
    });
	var selectabledivgenerationstring = "";
    $(".selectable").each(function () {
        selectabledivgenerationstring += '<div class="div_selectable select_'+$(this).attr('data')+'">'+$(this).html()+'</div>';
		var key = $(this).attr('data');
		object.values.selectables.push({ 'key' : key,'value':[]});
    });
    var searchfieldsdiv = "";
    if (searchfieldsgenerationstring != "")
        searchfieldsdiv = '<div id="nav1" class="search_fields" style="margin-bottom: 10px;"><p style="text-align: center;margin:0 0 10px 0;">Search criteria</p><span>' + searchfieldsgenerationstring + '</span></div><div class="searchbuttons" style="margin-bottom: 10px;float: right;margin-right: 10px;"><input id="reset" type="button" style="margin-right: 10px;" value="Reset" disabled /><input type="button" id="search_button" value="Search" disabled/></div><div class="clr"></div>';
    var fields = '<div id="search-div">' + searchfieldsdiv + '</div><div class="rangeFields" style="margin-left: 10px;margin-bottom:30px;">' + rangefieldsgenerationstring + '</div>'+selectabledivgenerationstring+'<div class="clr"/><div id="spinner_div"></div>' +
	'<div id="pagination-div" style="margin-bottom: 45px;float: right;margin-right:150px;margin-top:-58px;">' + paginationfieldsgenerationstring + '</div>';
    $(fields).insertBefore($('.pagination_table'));
    object.target = $('.pagination_table')[0];
    $('.change_input').unbind();
    $('.change_input').bind('change keyup', function (e) {
        if (e.which == 13) {
            e.preventDefault();
            $('#search_button').click();
            return;
        }
        var flag = false;
        $('.change_input').each(function () {
            if ($(this).val().length > 0) {
                flag = true;
                $("#reset").attr('disabled', false);
                $("#search_button").attr('disabled', false);
            }
        });
        if (!flag) {
            $("#reset").attr('disabled', true);
            $("#search_button").attr('disabled', true);
        }
    });
    $('#reset').on('click', function () {
        $search_inputs = $('.search_fields').find('input');
        $($search_inputs).each(function () {
            $(this).val('');
        });
        object.recodsPerPage = 10;
        $('#no_of_records').val(10);
        $('#search_button').click();
    });
    // Searching by enter button
    $('#search_button').on('click', function () {
        $(this).attr('disabled', true);
        object.searching();
    });
    // Key press pagination
    $('#no_of_records').on('keyup blur', function (e) {
        if ($(this).val() == '') return;
        if (isNaN($(this).val()) || $(this).val() == 0) {
            if (object.totalRecords > 0) {
                if (object.totalRecords > 10) $('#no_of_records').val(10);
                else $('#no_of_records').val(object.totalRecords);
            }
        }
        object.recodsPerPage = $(this).val();
        object.totalPagescount = Math.ceil(object.totalRecords / object.recodsPerPage);
        object.createButtons(1, object.totalPagescount);
    });

    // Pagination : Next Page
    $(".next").on('click', function () {
        if (object.currentPageNo < object.totalPagescount) object.createButtons(++object.currentPageNo, object.totalPagescount);
    });
    // Pagination : Previous Page
    $(".prev").on('click', function () {
        if (object.currentPageNo > 1) object.createButtons(--object.currentPageNo, object.totalPagescount);
    });
    // Pagination : Last Page
    $(".last").on('click', function () {
        if (object.currentPageNo < object.totalPagescount) object.createButtons(object.totalPagescount, object.totalPagescount);
    });
    // Pagination : First Page
    $(".first").on('click', function () {
        if (object.currentPageNo > 1) object.createButtons(1, object.totalPagescount);
    });
    object.searching();
}
function createButtons(currentpage, pages) {
    var object = this;
    if (object.paginationType == paginationTypeObject.buttonApproch) {
        var Buttons = (pages < object.buttonsCount) ? pages : object.buttonsCount;
        var rightPages = midPage = Math.floor(Buttons / 2);
        if (currentpage - rightPages < 1) rightPages = currentpage - 1;
        var leftPages = Buttons - (parseInt(rightPages) + 1);
        if (parseInt(currentpage) + parseInt(leftPages) > pages) {
            leftPages = pages - currentpage;
            rightPages = rightPages + (midPage - leftPages);
            if (currentpage - rightPages < 1) rightPages = currentpage - 1;
        }
        var firstButton = '<ul class="pagination" style="float:right"><li class="firstButton"><a href="#" aria-label="Previous" data-pageno = 1 class="bootpag"><span aria-hidden="true">&laquo;</span></a></li>';
        var rightButtons = leftbuttons = "";
        var lastButton = '<li class="lastButton"><a href="#" aria-label="Next" class="bootpag" data-pageno = ' + pages + '><span aria-hidden="true">&raquo;</span></a></li></ul>';
        for (var i = 0 ; i < rightPages; i++) {
            var datapageno = currentpage - rightPages + i;
            rightButtons += '<li><a href="#" data-pageno = ' + (datapageno) + ' class="bootpag">' + (datapageno) + '</a></li>';
        }
        for (var i = 1 ; i <= leftPages; i++) {
            var datapageno = parseInt(currentpage) + parseInt(i);
            leftbuttons += '<li><a href="#" data-pageno = ' + (datapageno) + ' class="bootpag">' + (datapageno) + '</a></li>';
        }
        var currentButton = '<li class="active"><a href="#" class="bootpag">' + currentpage + '</a></li>';

        var bootpag = firstButton + rightButtons + currentButton + leftbuttons + lastButton;
        $(".pagination").remove();
        $(bootpag).insertAfter($('.pagination_table'));
        $('.bootpag').unbind();
        $('.bootpag').click(function (e) {
            e.preventDefault();
            if (isNaN($(this).attr('data-pageno')) || $(this).attr('data-pageno') == 0) return;
            object.createButtons($(this).attr('data-pageno'), pages);

        });
        if (currentpage == 1) $(".firstButton").addClass('disabled');
        else $(".firstButton").removeClass('disabled');
        if (currentpage == pages) $(".lastButton").addClass('disabled');
        else $(".lastButton").removeClass('disabled');
    }
    object.pagination(currentpage);
}
function pagination(pageno) {
    var object = this;
    object.spinner.spin(object.target);
    object.currentPageNo = pageno;
    $(".pagedisplay").val(object.currentPageNo + "/" + object.totalPagescount);
    var jsondata = object.getValues();
    $.ajax({
        url: object.paginationURL,
        data: jsondata,
        type: "POST",
        dataType: "json",
        success: function (result) {
			//console.log(result);
            object.appendRow(result['data']);
            object.spinner.stop();
        },
        error: function (error) {
            console.log(error);
            object.spinner.stop();
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
    object.spinner.spin(object.target);
    $("#pagination-div").show();
    if (object.values.israngeChanged) {
        $(".slider-range").each(function () {
            for (var i = 0; i < object.values.range.length; i++) {
                if (object.values.range[i].field == $(this).attr('data')) {
                    object.values.range[i].min = $($(this).children()[0]).val();
                    object.values.range[i].max = $($(this).children()[1]).val();
                }
            }
        });
    }
	if(object.values.isselectionChanged){
		for(var i =0;i<object.values.selectables.length;i++){
			object.values.selectables[i].value = [];
			$('.selectablecheckbox').each(function (){
				var key = $(this).attr('data');//value
				var value = $(this).attr('value');//value
				if($(this).prop('checked')) {
						if(object.values.selectables[i].key == key)
							object.values.selectables[i].value.push(value);
				}else{
					for(var j = object.values.selectables[i].value.length-1;j>-1; j--){
						if (object.values.selectables[i].value[j] === value) object.values.selectables[i].value.splice(j, 1);
					}
				}
			});
		}
	}
    var jsondata = object.getValues();
    $.ajax({
        url: object.searchURL,
        data: jsondata,
        type: "POST",
        dataType: "json",
        success: function (result) {
			//console.log(result);
            object.totalRecords = result.data.count;
            if (object.totalRecords > 0) {
                if (object.totalRecords < 10) {
                    $('#no_of_records').val(object.totalRecords);
                    object.recodsPerPage = object.totalRecords;
                }
                if (!object.values.israngeChanged) {
                    $(".slider-range").each(function () {
                        var min = 0, max = 500;
                        for (var i = 0; i < object.values.range.length; i++) {
                            if (object.values.range[i].field == $(this).attr('data')) {
                                for (var j = 0; j < result.data.range.length; j++) {
                                    if (result.data.range[j].field == $(this).attr('data')) {
                                        min = result.data.range[j].min;
                                        max = result.data.range[j].max;
                                        object.values.range[i].min = min;
                                        object.values.range[i].max = max;
                                        $($(this).children()[0]).val(min);
                                        $($(this).children()[1]).val(max);
                                    }
                                }
                            }
                        }
                        $(this).slider({
                            range: true,
                            min: parseInt(min),
                            max: parseInt(max),
                            values: [parseInt(min), parseInt(max)],
                            slide: function (event, ui) {
                                $($(this).children()[0]).val(ui.values[0]);
                                $($(this).children()[1]).val(ui.values[1]);
                                object.values.israngeChanged = true;
                                $("#reset").attr('disabled', false);
                                $("#search_button").attr('disabled', false);
                            }
                        });
                    });
                }
				if (!object.values.isselectionChanged) {
					for (var i = 0; i < object.values.selectables.length; i++) {
							console.log(result.data.selectables);
						//console.log(result.data.selectables[object.values.selectables[i].key]);//result.data.selectables
						var key = object.values.selectables[i].key;
						var checkboxesString = "";
						for(var j=0; j< result.data.selectables[key].length;j++){
							var data = result.data.selectables[key][j];
							checkboxesString += '<input class="checkbox-custom selectablecheckbox" type="checkbox" value="'+data[0]+'" id="'+data[0]+'" data="'+key+'" /><label for="'+data[0]+'" style = "font-weight: 100 !important;" class="checkbox-custom-label">'+data[0] +" ("+data[1]+")"+'</label>';
						}
						$('.select_'+key).html('<b>'+key+'</b>'+checkboxesString);
						$('.selectablecheckbox').unbind();
						$('.selectablecheckbox').change(function(){
							//console.log(object.values.selectable);
							object.values.isselectionChanged = true;
							$("#reset").attr('disabled', false);
							$("#search_button").attr('disabled', false);
						});
						object.values.selectables[i].value = [];
					}
				}
                object.values.israngeChanged = false;
				object.values.isselectionChanged = false;
                object.totalPagescount = Math.ceil(parseInt(object.totalRecords) / $('#no_of_records').val());
                $(".sortable").append(' <i class="fa fa-sort"></i>');
                $(".sortable").addClass('sort');
                $(".sort").unbind('click');
                $('.sort').on('click', function () {
                    if (object.totalRecords < 1) return;
                    object.spinner.spin(object.target);
                    $(this).siblings().removeClass('selected');
                    $(this).siblings().find("i").attr('class', '').addClass('fa fa-sort');
                    var itag = $(this).find("i");
                    var sortimage = $(itag).attr('class');
                    var classes = sortimage.split(" ");
                    object.values.orderby = $(this).attr('data');
                    if (classes[1] == "fa-sort" || classes[1] == "fa-sort-amount-desc") {
                        $(itag).attr('class', 'fa fa-sort-amount-asc');
                        object.values.ordertype = 'ASC';
                    }
                    else {
                        $(itag).attr('class', 'fa fa-sort-amount-desc');
                        object.values.ordertype = 'DESC';
                    }
                    object.createButtons(1, object.totalPagescount);
                });
                object.createButtons(1, object.totalPagescount);
            }
            else {
                object.spinner.stop();
                $('.pagination_table').find('tbody').empty().append('<tr><td  colspan="100%" align="center">No records found</td></tr>');
                $("#pagination-div").hide();
            }
        },
        error: function (error) {
            console.log(error);
            object.spinner.stop();
        }
    });
}
// To get input from text fields
function getValues() {
    $search_inputs = $('.search_fields').find('input');
    var object = this;
    $($search_inputs).each(function () {
        object.values[$(this).attr('data')] = $(this).val();
    });
    object.values.pageno = object.currentPageNo;
    object.values.perpage = object.recodsPerPage;
    return object.values;
}
function appendRow(object) {
    var classObject = this;
    if (object != '') {
        classObject.spinner.spin(classObject.target);
        var rowcount = (this.currentPageNo - 1) * this.recodsPerPage + 1;
        $tr = $('.pagination_table').find('thead > tr > td');
        $('.pagination_table').find('tbody').empty();
        for (i = 0; i < object.length; i++) {
            var newrow = "<tr><td>" + (rowcount++) + "</td>"
            $($tr).each(function () {
                var attr = $(this).attr('data');
                if (typeof attr !== typeof undefined && attr !== false) {
                    newrow += "<td>" + object[i][attr] + "</td>";
                }
            });
            $(newrow + "</tr>").appendTo($(".pagination_table tbody"));
            $('td').each(function () {
                if ($(this).text() == 'null') {
                    $(this).text('');
                }
            });
        }
    }
    classObject.spinner.stop();
}
function destroy() {
    $('.search_fields,#pagination-div,.searchbuttons,#loadingimage,.pagination,.fa,.rangeFields,.div_selectable').remove();
}