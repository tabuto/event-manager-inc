<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" 
           uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<jsp:include page="template_head.jsp" />
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
	<script type="text/javascript" src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
 <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">
                            Scheduler2
                        </h1>
                        <ol class="breadcrumb">
                            <li>
                                <i class="fa fa-dashboard"></i>  <a href="/engine/index.html">Dashboard</a>
                            </li>
                            <li class="active">
                                <i class="fa fa-table"></i> Scheduler2
                            </li>
                        </ol>
                    </div>
                </div>

<script src="<c:url value="/resources/js/web2cal/Web2Cal-Basic-2.0-min.js" />" type="text/javascript"></script>
<script src="<c:url value="/resources/js/web2cal/web2cal.support.js" />" type="text/javascript"></script>
<script src="<c:url value="/resources/js/web2cal/web2cal.default.template.js" />" type="text/javascript"></script>
<script src="<c:url value="/resources/js/web2cal/scheduler.js" />" type="text/javascript"></script>


	<div id="calendarContainer"></div>


<script type="text/javascript">
<!--

//-->
var ical;
var schedulerObj;

function wsOnNewEvent(obj, groups, isGroupEvent)
{ 
	wsPersonId=obj.personId; 
	wsIsGroupEvent=isGroupEvent;

    Web2Cal.defaultPlugins.onNewEvent(obj, groups); 
	var newevt=$("#defaultNewEventTemplate");
	if(obj.group)
		newevt.find("#eventGroup").val(obj.group.groupId); 
}  

onNewEvent = wsOnNewEvent;

function loadCalendarEvents(startTime, endTime)
{  
	//ical.render(getCalendarData());
}

function updateEvent(event)
{ 
    ical.updateEvent(event);
} 

function onPreview(evt, dataObj, html)
{
	activeEvent=dataObj;
	ical.showPreview(evt, html);
}

function getCookieValue(name, defaultValue) {
	
	val=defaultValue;
	
	return val;
} 

function showFilter()
{
		optionsWin=new SimpleModal({ 
			width: 600,
			model: "modal-ajax",
			title: "Web2Cal Settings",
			param: {
				 url:  "/components/com_web2cal/settings.php"	, 
				onRequestComplete: function() { },
				onRequestFailure: function() { }
			}
		}) .addButton("Save Settings", "btn primary", function() {
			saveCalendarSettings()  
		}).addButton("Cancel", "btn", function() {
			this.hide()  
		})  
		optionsWin.show(); 
	 
}

function drawCalendar(){
	ical = new Web2Cal('calendarContainer', {
    loadEvents: loadCalendarEvents,
    onUpdateEvent: updateEvent,
    weekOnNewEvent: onNewEvent,
	agendaOnNewEvent: onNewEvent,
    wsOnNewEvent: onNewEvent,
    monthOnNewEvent: onNewEvent,
    defaultView:  "month", 
	showTodayButton: true,
    startTime:(+getCookieValue( "startTime", 0)), 
	endTime:(+getCookieValue( "endTime", 24)), 
	weekOnPreview: onPreview,
	customViewSize: (+getCookieValue( "customViewSize", 4)),
	monthOnPreview: onPreview, 
    showLeftNav: false, 
	showQuickAdd: false,
	optionsOnClick: showFilter,
	showOptions: false,
    views: (   "month,  week"),
    sampleMode: true,
		showQuickFilter: true,
	startOfWeek:(+getCookieValue( "startOfWeek", 0))
	});

//Setup Highlight Extension...
/**
 * Options: 
 * from - Everything before this hour will be highlighted
 * to 	- Everything after this hour will be highlighted
 * scrollTo - Auto Scroll to an hour. If not specified, it will be defaulted to from 
 */
	schedulerObj = new Scheduler(ical, { 
										dayCount: 7,  
										//height  : 120, 
										dayWidth: 1000, 
										workshiftMode:false,
									//	interval: 24 ,
									//	hourInterval:4, 
										showOnStartup:true 
									//	scrollToHour:10
									});


	ical.build();
}

/**
Once page is loaded, invoke the Load Calendar Script
*/
drawCalendar();


</script>

<jsp:include page="template_footer.jsp" />