<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" 
           uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<jsp:include page="template_head.jsp" />
	<!--  
		<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.min.js"></script> 
		<script type="text/javascript" src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>	
	-->
	<script src="<c:url value="/resources/js/jquery-1.9.1.min.js" />" type="text/javascript"></script>
	<script src="<c:url value="/resources/js/jquery-ui.js" />" type="text/javascript"></script>
	
 <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">
                            Scheduler
                        </h1>
                        <ol class="breadcrumb">
                            <li>
                                <i class="fa fa-dashboard"></i>  <a href="/engine/index.html">Dashboard</a>
                            </li>
                            <li class="active">
                                <i class="fa fa-table"></i> Scheduler
                            </li>
                        </ol>
                    </div>
                </div>

<div style="float:left; width:200px">
	<div id="nav"></div>
</div>
<div style="margin-left: 200px">
	<div id="dp"></div>
</div>

 <div class="row">
                    <div class="col-lg-6">
                    <div id="event-form-modal" title="Event Detail">
                    <label id="text_lbl">Nominativo</label>
        			<input id="text" class="form-control" readonly="true"></input>
        			
        			<label id="name_lbl">Nome</label>
        			<input id="ev_name" class="form-control" readonly="true"></input>
                    
                    <label id="surname_lbl">Cognome</label>
        			<input id="ev_surname" class="form-control" readonly="true"></input>
        			
        			<label id="tel_lbl">Tel.</label>
        			<input id="ev_tel" class="form-control" readonly="true"></input>
        			
        			<label id="mail_lbl">Mail</label>
        			<input id="ev_mail" class="form-control" readonly="true"></input>
        			
        			<label id="start_lbl">Inzio</label>
        			<input id="ev_start" class="form-control" readonly="true"></input>
                    
                    <label id="end_lbl">Fine</label>
        			<input id="ev_end" class="form-control" readonly="true"></input>
        			
        			<label id="resource_lbl">Campo</label>
        			<input id="ev_resource" class="form-control" readonly="true"></input>
        			
        			<label id="checkpaid_lbl">Pagato</label>
        			<input type="checkbox" id="ev_checkPaid" class="form-control" readonly="true" onclick="return false"/>
        			
                    </div>
                    
                    
                    </div>
</div>

<div id="user-form-modal" title="Find or Create User">
<form:form id="userForm" modelAttribute="user" action="/engine/createUser"> 
<fieldset>
   <table>
       <tr>
       
        <td><form:hidden path="id" id="iduser" ></form:hidden></td>  
    </tr>
    <tr>
    	<td><form:label path="name">Nome*</form:label></td>
        <td><form:input path="name" class="form-control"></form:input></td>  
    </tr>
     <tr>
    	<td><form:label path="surname">Cognome </form:label></td>
        <td><form:input path="surname" class="form-control"></form:input></td>  
    </tr>
    <tr>
    	<td><form:label path="email">Email</form:label></td>
    	<td><form:input path="email" class="form-control"></form:input></td> 
    </tr>
    <tr>
    	<td><form:label path="tel">Tel.*</form:label></td>
    	<td><form:input path="tel" class="form-control"></form:input></td> 
    </tr>
</table>  
</fieldset> 
</form:form>
</div>  

<!--  <script src="<c:url value="/resources/js/daypilot/daypilot_my.js" />" type="text/javascript"></script>-->
<script src="<c:url value="/resources/js/daypilot/daypilot-all.min.js" />" type="text/javascript"></script>

<script type="text/javascript">
 
</script>

<script>

function getResourceName(dp,resId){
	var i=0;
	for(i=0; dp.resources.length;i++){
		if(dp.resources[i].id == resId){
			return dp.resources[i].name;
		}
	}
	return "";//default
}

function getResourceColor(dp,resId){
	var i=0;
	for(i=0; dp.resources.length;i++){
		if(dp.resources[i].id == resId){
			return dp.resources[i].color;
		}
	}
	return "#6633FF";//default
}

function togglePaidEvent(id, startdate){
	
	$.getJSON( 'http://localhost:8080/engine/togglePaidEvent', { term: id , today: startdate } )
	  .done(function( json ) {
	  
		dp.events.list = [];
	    for (var i =0; i<json.length;i++){
	    	 //console.log( "JSON Data: " + json+[i]);
   		 var e = new DayPilot.Event({
   	            start: new DayPilot.Date(longToDate(json[i].startDate)),
   	            end: new DayPilot.Date(longToDate(json[i].endDate)),
   	            id: json[i].id,
   	       		resource: ""+json[i].type,
   	            text: json[i].text
   	            
   	          
   	        });
   		   //e.type = data[i].campo
   		  e.userid = ""+json[i].user;
   		  e.paid = json[i].paid;
   	      dp.events.add(e);
   	      dp.update();    
   	}
   	
	    //dp.update();        
		//dp.clearSelection();
	    
	    
	  })
	  .fail(function( jqxhr, textStatus, error ) {
	    var err = textStatus + ", " + error;
	    console.log( "Request Failed: " + err );
	});
	
}

function deleteEvent(id, startdate){
	
	$.getJSON( 'http://localhost:8080/engine/delEvent', { term: id , today: startdate } )
	  .done(function( json ) {
	  
		dp.events.list = [];
	    for (var i =0; i<json.length;i++){
	    	 //console.log( "JSON Data: " + json+[i]);
   		 var e = new DayPilot.Event({
   	            start: new DayPilot.Date(longToDate(json[i].startDate)),
   	            end: new DayPilot.Date(longToDate(json[i].endDate)),
   	            id: json[i].id,
   	       		resource: ""+json[i].type,
   	            text: json[i].text
   	            
   	          
   	        });
   		   //e.type = data[i].campo
   		  e.userid = ""+json[i].user;
   		  e.paid = json[i].paid;
   	      dp.events.add(e);
   	      dp.update();    
   	}
   	
	    //dp.update();        
		//dp.clearSelection();
	    
	    
	  })
	  .fail(function( jqxhr, textStatus, error ) {
	    var err = textStatus + ", " + error;
	    console.log( "Request Failed: " + err );
	});
	
}

function createUser(){
	dfr = $.Deferred();
	
	var user = {
			name: $("#name").val(),
			surname: $("#surname").val(),
			email:  $("#email").val(),
			tel: $("#tel").val()
	};
	
	if( isEmpty(user.name) || isEmpty(user.tel)){
		alert("I campi Nome e Telefono sono obbligatori");
		dfr.resolve(-1);
		return dfr.promise();
	}
	
	  $.ajax({ 
		  headers: { 
		        'Accept': 'application/json',
		        'Content-Type': 'application/json' 
		    },
        url:"http://localhost:8080/engine/addUser",    
        type:"POST", 
        dataType: 'json', 
        contentType: 'application/json; charset=utf-8',
        mimeType: 'application/json',
        data: JSON.stringify(user), //Stringified Json Object
        complete: function(data){ 
        		//alert("success: "+data)
        		jsonUser = JSON.parse(data.responseText);
        		if(jsonUser.id > 0){
        			//alert(jsonUser.id)
        			  dfr.resolve(jsonUser.id);
             		//return jsonUser.id; 
        		}else{
        			dfr.resolve(-1);
        			//return -1;
        		}
        		                   
		}});
	  
	  
	  return dfr.promise();
}

function resetUserForm(){
	$("#iduser").val("" );
	 $("#name").val("" );
	  $("#surname").val("");
	  $("#email").val("");
	  $("#tel").val("");
}

function loadEvents(dp,startdate){
	dp.events.list = [];
	$.getJSON( 'http://localhost:8080/engine/eventsByDay', { term: startdate } )
	  .done(function( json ) {
	  
	    
	    for (var i =0; i<json.length;i++){
	    	 //console.log( "JSON Data: " + json+[i]);
     		 var e = new DayPilot.Event({
     	            start: new DayPilot.Date(longToDate(json[i].startDate)),
     	            end: new DayPilot.Date(longToDate(json[i].endDate)),
     	            id: json[i].id,
     	       		resource: ""+json[i].type,
     	            text: json[i].text,
     	            userid: ""+json[i].user,
     	            paid: json[i].paid
     	            
     	          
     	          
     	        });
     		   //e.type = data[i].campo
     		  //e.userid = ""+json[i].user;
     		   //e.paid = (json[i].paid=='Y');
     	      dp.events.add(e);
     	      dp.update();    
     	}
     	
 	    //dp.update();        
		//dp.clearSelection();
	    
	    
	  })
	  .fail(function( jqxhr, textStatus, error ) {
	    var err = textStatus + ", " + error;
	    console.log( "Request Failed: " + err );
	});
};

function loadResources(dp){
	dp.resources = new Array();
	$.getJSON( "http://localhost:8080/engine/typeCombo", function( data ) {
		
		for (var i =0; i<data.length;i++){
			dp.resources[i]={name: data[i].name, id: ""+data[i].id, color: data[i].color};
		}
		dp.update();
	});
	//
	//return resources;
};

function saveNewEvent(args, update){
	 
	 dp.clearSelection();
	 
	 var json;
	 
	 if(update){
		 json = { "id" : args.e.id(), 
				 "start" : args.e.start(), 
				 "end": args.e.end(), 
				 "text" : args.e.text(), 
				 "type" : args.e.resource(),
				 "user" :  args.e.userid(),
		 		 "paid" : args.e.paid()
		 		 };
	 }else{
		 var evtext = $('#name').val()+" "+$('#surname').val();
		 json = { "id" : DayPilot.guid(), 
				 "start" : args.start, 
				 "end": args.end, 
				 "text" : evtext, 
				 "type" : args.resource,
				 "user" :  $("#iduser").val(),
				 "paid" : "N"
				 };
		 alert(getResourceColor(dp, args.resource));
	 }
	 
	    
	    $.ajax({ 
			  headers: { 
			        'Accept': 'application/json',
			        'Content-Type': 'application/json' 
			    },
	      url:"http://localhost:8080/engine/addEvent",    
	      type:"POST", 
	      dataType: 'json', 
	      contentType: 'application/json; charset=utf-8',
	      mimeType: 'application/json',
	      data: JSON.stringify(json), //Stringified Json Object
	      complete: function(data){ 
	      		//alert("success: "+data)
	      		if(data.responseText == 'success'){
	      		    var e = new DayPilot.Event({
	      		        start: args.start,
	      		        end: args.end,
	      		        id: DayPilot.guid(),
	      		        resource: args.resource,
	      		        text: evtext
	      		    });
	                e.userid = $("#iduser");
	                e.paid = "N";
	         	    dp.events.add(e);
	         	    if(update)
	         	    	dp.message("Updated");
	         	    else
	         	    	dp.message("Created");
	         	   resetUserForm();
	      		}
	      		                   
	}});
};

function selectUser(){
	var userId = $("#iduser").val();
	//alert('iduser:'+ userId);
	if(userId>0){
		//ho selezionato un utente esistente
		//alert('utente esistente');
		var args = $("#user-form-modal").data('args');
	    saveNewEvent(args,false);
		dialog.dialog( "close" );
	}else{
		  $.when(createUser()).done(function(userid){
			  if(userid>0){
			  	$("#iduser").val(userid);
			  	var args = $("#user-form-modal").data('args');
			  	saveNewEvent(args,false);
			  }
			  else{
				  dialog.data('args', null);
			  }
			  dialog.dialog( "close" );
		  });
		 //createUser();
		//alert('nuovo utente');
		//chiamo il BE...
		//salvo il nuovo utente
		//ottengo l'id
		//lo uso per salvare il nuovo evento
	}
	
   
	
	
	return true;
};

var evDialog = $( "#event-form-modal" ).dialog({
    autoOpen: false,
    height: 700,
    width: 600,
    modal: true,
    buttons: {
      "Close": function() {
    	  //resetUserForm();
    	  evDialog.dialog( "close" ); 
      }
    },
    close: function() {
      
      //allFields.removeClass( "ui-state-error" );
      //var args = $("#user-form-modal").data('args');
      //if (args != null )
      	//saveNewEvent(args,false);
    }
  });

var dialog = $( "#user-form-modal" ).dialog({
    autoOpen: false,
    height: 300,
    width: 350,
    modal: true,
    buttons: {
      "Create Event": selectUser,
      Cancel: function() {
    	  resetUserForm();
    	  dialog.data('args', null).dialog( "close" ); 
      }
    },
    close: function() {
      
      //allFields.removeClass( "ui-state-error" );
      var args = $("#user-form-modal").data('args');
      //if (args != null )
      	//saveNewEvent(args,false);
    }
  });

var nav = new DayPilot.Navigator("nav");
//nav.cssClassPrefix = "navigator_8";
nav.showMonths = 1;
nav.selectMode = "day";
nav.onTimeRangeSelected = function(args) {
    dp.startDate = args.start;
    dp.days = args.days;
    // load event to dp.events.list from the server
    loadEvents(dp,nav.selectionStart.value);
    dp.update();
};
nav.init();

var dp = new DayPilot.Scheduler("dp");

// behavior and appearance
//dp.cssClassPrefix = "scheduler_8";
dp.cellWidth = 40;
dp.eventHeight = 25;
dp.headerHeight = 25;

// view
dp.startDate = nav.selectionStart;  // or just dp.startDate = "2013-03-25";

dp.startDate = nav.selectionStart;


//dp.startDate = "2015-01-01";  // or just dp.startDate = "2013-03-25";
dp.days = 1;
dp.scale = "Hour";
dp.timeHeaders = [
{groupBy: 'Month', format: 'MMMM yyyy'}, 
{groupBy: 'Day'},
{groupBy: 'Hour'}
];


//dp.resources = getResources();
/* $.getJSON( "http://localhost:8080/engine/typeCombo", function( data ) {
	dp.resources = new Array();
	for (var i =0; i<data.length;i++){
		dp.resources[i]={name: data[i].name, id: ""+data[i].id};
	}
}); */
resources = [
             { name: "Campo 1", id: "A" },
             { name: "Campo 2", id: "B" },
             { name: "Campo 3", id: "C" }
            ];
/* dp.resources = [
             { name: "Campo 1", id: "A" },
             { name: "Campo 2", id: "B" },
             { name: "Campo 3", id: "C" }
            ]; */


dp.onEventMoved = function (args) {
	
    dp.message("Moved: " + args.e.text());
    saveNewEvent(args, true);//update
  //TODO: update evento
};

dp.onEventResized = function (args) {
    dp.message("Resized: " + args.e.text());
    saveNewEvent(args, true);//update
};

// event creating
dp.onTimeRangeSelected = function (args) {
   // var name = prompt("New event name:", "Event");
   	resetUserForm();
    dialog.data('args', args).dialog( "open" );
/*     $( "#create-user" ).button().on( "click", function() {
        
      }); */
   
};

function getUser(id){
	dfr = $.Deferred();
	 
	 $.getJSON( 'http://localhost:8080/engine/loadUser', { term: id } )
		  .done(function( json ) {
		  
			  dfr.resolve(json);
		    
		    
		  })
		  .fail(function( jqxhr, textStatus, error ) {
		    var err = textStatus + ", " + error;
		    console.log( "Request Failed: " + err );
		});
	 
	
	 return dfr.promise();
}

dp.onEventClick = function(args) {
	  $("#text").val(args.e.text());
	  $("#ev_start").val(args.e.start());
	  $("#ev_end").val(args.e.end());
	  $("#ev_resource").val(getResourceName(dp, args.e.resource()));
	  $('#ev_checkPaid').prop('checked',(args.e.paid()=="Y"));
	  
	  $.when(getUser(args.e.userid())).done(function(json){
		$("#ev_name").val(json.name);
		$("#ev_surname").val(json.surname);
		$("#ev_tel").val(json.tel);
		$("#ev_mail").val(json.mail);
	  	evDialog.dialog( "open" );
	  });
	  
};

dp.contextMenu = new DayPilot.Menu({items: [
                                            {text:"Delete", onclick: function() {
                                            	//alert("Event id: " + this.source.id());
                                            	deleteEvent(this.source.id(),nav.selectionStart.value);
                                            	} },
                                            
                                            	{text: 'Pagato-Non Pagato', onclick: function() {
                                                	//alert("Event id: " + this.source.id());
                                                	togglePaidEvent(this.source.id(),nav.selectionStart.value);
                                                	} },
                                           		
                                            	
                                           	  {text:"Id", onclick: function() {
                                                 	alert("Event id: " + this.source.id());
                                                 	} },
                                        ]});

dp.onBeforeEventRender = function(args) {
		args.e.barColor = getResourceColor(dp, args.e.resource);
	
    //args.e.bubbleHtml = "<div><b>" + args.e.text + "</b></div><div>Start: " + new DayPilot.Date(args.e.start).toString("M/d/yyyy") + "</div><div>End: " + new DayPilot.Date(args.e.end).toString("M/d/yyyy") + "</div>";
};

dp.init();
loadResources(dp);
loadEvents(dp,nav.selectionStart.value);


/*
var dp = new DayPilot.Scheduler("dp");
var nav = new DayPilot.Navigator("nav");

nav.selectMode = "day";
nav.onTimeRangeSelected = function(args) {
	
	alert('time range selected');
    dp.startDate = args.start;
    // load events
    dp.days = args.days;
    dp.message("View: " + args.start);
    dp.update();
    
};
nav.init();

dp.startDate = nav.selectionStart;
//dp.startDate = "2015-01-01";  // or just dp.startDate = "2013-03-25";
dp.days = 1;
dp.scale = "Hour";
dp.timeHeaders = [
{groupBy: 'Month', format: 'MMMM yyyy'}, 
{groupBy: 'Week'},
{groupBy: 'Day'},
{groupBy: 'Hour'}
];

/*
dp.bubble = new DayPilot.Bubble();

dp.onEventRightClicked = function(args) {
    dp.multiselect.add(args.e);
};
*/
/*
dp.contextMenu = new DayPilot.Menu({items: [
    {text:"Edit", onclick: function() {alert("Event value: " + this.source.value());} },
    {text:"Delete", onclick: function() {alert("Event text: " + this.source.text());} },
    {text:"-"},
    {text:"Copy", onclick: function() {alert("Event start: " + this.source.start().toStringSortable());} },
    {text:"Select", onclick: function() {alert("Event start: " + this.source.start().toStringSortable());} },
]});

dp.treeEnabled = true;
dp.resources = [
             { name: "Campo 1", id: "B" },
             { name: "Campo 2", id: "C" },
             { name: "Campo 3", id: "D" }
            ];
/*
/*
for (var i = 0; i < 15; i++) {
    var duration = Math.floor(Math.random() * 6) + 1; // 1 to 6
    var durationDays = Math.floor(Math.random() * 6); // 0 to 5
    var start = Math.floor(Math.random() * 6) + 2; // 2 to 7
    var res = Math.floor(Math.random() * 6); // 0 to 5

    var e = new DayPilot.Event({
        start: new DayPilot.Date("2014-03-25T00:00:00").addDays(start),
        end: new DayPilot.Date("2014-03-25T12:00:00").addDays(start).addDays(durationDays).addHours(duration),
        id: DayPilot.guid(),
        resource: String.fromCharCode(65+res),
        text: "Event"
    });

    dp.events.add(e);
}

var e = new DayPilot.Event({
    start: new DayPilot.Date("2014-01-01T00:00:00"),
    end: new DayPilot.Date("2014-01-02T00:00:00"),
    id: DayPilot.guid(),
    resource: "B",
    text: "First Event"
});
dp.events.add(e);

var e = new DayPilot.Event({
    start: new DayPilot.Date("2014-05-01T00:00:00"),
    end: new DayPilot.Date("2014-05-02T00:00:00"),
    id: DayPilot.guid(),
    resource: "A.1",
    text: "One-Day Event"
});
dp.events.add(e);

dp.dynamicEventRenderingCacheSweeping = true;

dp.eventHoverHandling = "Bubble";

dp.eventMovingStartEndEnabled = true;
dp.eventResizingStartEndEnabled = true;
dp.timeRangeSelectingStartEndEnabled = true;



dp.onBeforeResHeaderRender = function(args) {
};

dp.onBeforeRowHeaderRender = function(args) {
};

dp.onBeforeCellRender = function(args) {
};

// event moving
dp.onEventMoved = function (args) {
    dp.message("Moved: " + args.e.text());
};

dp.onEventMoving = function(args) {
    // don't allow moving from A to B
    if (args.e.resource() === "A" && args.resource === "B") {
        args.left.enabled = false;
        args.right.html = "You can't move an event from resource A to B";

        args.allowed = false;
    }
};

dp.onEventResize = function(args) {
};

// event resizing
dp.onEventResized = function (args) {
    dp.message("Resized: " + args.e.text());
};

// event creating
dp.onTimeRangeSelected = function (args) {
    var name = prompt("New event name:", "Event");
    dp.clearSelection();
    if (!name) return;
    var e = new DayPilot.Event({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        resource: args.resource,
        text: name
    });
    dp.events.add(e);
    dp.message("Created");
};

dp.onTimeHeaderClick = function(args) {
    console.log(args.header);
    alert("clicked: " + args.header.start);
};

dp.separators = [
    {color:"Red", location:"2014-03-29T00:00:00", layer: "BelowEvents"}
];
*/
//dp.init();

//dp.scrollTo("2014-03-25");

//Autocomplete
$("#tel").autocomplete({
    minLength: 1,
    delay: 500,
    //define callback to format results
    source: function (request, response) {
        $.getJSON("http://localhost:8080/engine/autocompleteTel", request, function(result) {
            response($.map(result, function(item) {
            	return {
                    // following property gets displayed in drop down
                    label: item.name + "(" + item.tel + ")",
                    // following property gets entered in the textbox
                    value: item.name,
                    // following property is added for our own use
                    id: item.id,
                    name: item.name,
                    surname: item.surname,
                    email: item.email,
                    tel: item.tel
                }
            }));
        });
    },

    //define select handler
    select : function(event, ui) {
        if (ui.item) {
          //alert('selected ' +ui.item.id);
         
          $("#iduser").val(ui.item.id);
          $("#user").val(ui.item.id);
          $("#name").val(ui.item.name);
  		  $("#surname").val(ui.item.surname);
  		  $("#email").val(ui.item.email);
  		  $("#tel").val(ui.item.tel);
  		 event.preventDefault();
            //return false;
        }
    }
});

$("#name").autocomplete({
    minLength: 1,
    delay: 500,
    //define callback to format results
    source: function (request, response) {
        $.getJSON("http://localhost:8080/engine/autocompleteName", request, function(result) {
            response($.map(result, function(item) {
            	return {
                    // following property gets displayed in drop down
                    label: item.name + "(" + item.tel + ")",
                    // following property gets entered in the textbox
                    value: item.name,
                    // following property is added for our own use
                    id: item.id,
                    name: item.name,
                    surname: item.surname,
                    email: item.email,
                    tel: item.tel
                }
            }));
        });
    },

    //define select handler
    select : function(event, ui) {
        if (ui.item) {
          //alert('selected ' +ui.item.id);
         
          $("#iduser").val(ui.item.id);
          $("#user").val(ui.item.id);
          $("#name").val(ui.item.name);
  		  $("#surname").val(ui.item.surname);
  		  $("#email").val(ui.item.email);
  		  $("#tel").val(ui.item.tel);
  		 event.preventDefault();
            //return false;
        }
    }
});

$("#surname").autocomplete({
    minLength: 1,
    delay: 500,
    //define callback to format results
    source: function (request, response) {
        $.getJSON("http://localhost:8080/engine/autocompleteSurname", request, function(result) {
            response($.map(result, function(item) {
            	return {
                    // following property gets displayed in drop down
                    label: item.name + "(" + item.tel + ")",
                    // following property gets entered in the textbox
                    value: item.name,
                    // following property is added for our own use
                    id: item.id,
                    name: item.name,
                    surname: item.surname,
                    email: item.email,
                    tel: item.tel
                }
            }));
        });
    },

    //define select handler
    select : function(event, ui) {
        if (ui.item) {
          //alert('selected ' +ui.item.id);
         
          $("#iduser").val(ui.item.id);
          $("#user").val(ui.item.id);
          $("#name").val(ui.item.name);
  		  $("#surname").val(ui.item.surname);
  		  $("#email").val(ui.item.email);
  		  $("#tel").val(ui.item.tel);
  		 event.preventDefault();
            //return false;
        }
    }
});

</script>
<jsp:include page="template_footer.jsp" />


