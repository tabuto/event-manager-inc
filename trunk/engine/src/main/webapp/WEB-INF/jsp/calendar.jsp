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
                            Calendario
                        </h1>
                        <ol class="breadcrumb">
                            <li>
                                <i class="fa fa-dashboard"></i>  <a href="/engine/index.html">Dashboard</a>
                            </li>
                            <li class="active">
                                <i class="fa fa-table"></i> Calendario
                            </li>
                        </ol>
                    </div>
                </div>




  <div class="row">
                    <div class="col-lg-6">

<!--  <div style="float:left; width: 150px;">-->
    <div id="nav"></div>
    
    <select id="viewModeCombo" name="viewMode">
    		<option value="Day">Giorno</option>  
    		<option value="Week">Settimana</option>  
			

    </select>
    
<!--  </div> -->
<p></p>
<form:form id="userForm" modelAttribute="user" action="/engine/createUser"> 
<fieldset>
   <table>
       <tr>
       
        <td><form:hidden path="id" id="iduser" ></form:hidden></td>  
    </tr>
    <tr>
    	<td><form:label path="name">Nome</form:label></td>
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
    	<td><form:label path="tel">Tel.</form:label></td>
    	<td><form:input path="tel" class="form-control"></form:input></td> 
    </tr>
    <tr>
    	<td>
    		<a href="/engine/users.html">Rubrica</a>
    	</td>
        <td colspan="1">
            <input type="submit" value="Crea" class="btn btn-default"/>
        </td>
    </tr>
</table>  
</fieldset> 
</form:form>
<p></p>
<form:form id="newEventForm" action="addPrenotation.json">  
<fieldset>
   <table>
       <tr>
       
        <td><form:hidden path="id" ></form:hidden></td>  
    </tr>
    <tr>
    	<td><form:label path="text">Nome evento</form:label></td>
        <td><form:input path="text" class="form-control"></form:input></td>  
    </tr>
     <tr>
    	<td><form:label path="user">Codice Utente </form:label></td>
        <td><form:input path="user" class="form-control"></form:input></td>  
    </tr>
     <tr>
     	<td><form:label path="type">Campo</form:label></td>
        <td><form:select path="type"  items="${typeCombo}" class="form-control"></form:select>
        	
        </td>  
    </tr>
    <tr>
    	<td><form:label path="start">Data Inizio</form:label></td>
    	<td><form:input path="start" class="form-control"></form:input></td> 
    </tr>
    <tr>
    	<td><form:label path="end">Data Fine</form:label></td>
    	<td><form:input path="end" class="form-control"></form:input></td> 
    </tr>
    <tr>
        <td colspan="2">
            <input type="submit" value="Salva" class="btn btn-default"/>
        </td>
    </tr>
</table>  
</fieldset>
</form:form>

</div>
 <div class="col-lg-6">
 
 <div>
    <div id="dp"></div>
</div>
 
	
</div>
</div>








<script src="<c:url value="/resources/js/daypilot/daypilot_my.js" />" type="text/javascript"></script>


<script type="text/javascript">
  var dp = new DayPilot.Calendar("dp");
  var nav = new DayPilot.Navigator("nav");
  nav.selectMode = "day";
  nav.onTimeRangeSelected = function(args) {
      dp.startDate = args.start;
      // load events
      dp.update();
  };
  nav.init();
  dp.viewType = "Day";
  dp.allDayEventHeight = 25;
  dp.initScrollPos = 9 * 40;
  dp.autoRefreshEnabled = true;
  dp.onTimeRangeSelected = function (args) {
	  $("#start").val(args.start);
	  $("#end").val(args.end);
	  $("#text").val(args.text);
	  $("#type").val(args.type);
	  $("#user").val(args.user).change();
	  $("#id").val("");
  };
  
  dp.onEventClick = function(args) {
	  //alert(args.e.text()+args.e.type());
	  $("#start").val(args.e.start());
	  $("#end").val(args.e.end());
	  $("#text").val(args.e.text());
	  $("#type").val(args.e.type());
	  $("#user").val(args.e.user()).change();
	  $("#id").val(args.e.id());
	  
  };
  
  // event moving
  dp.onEventMoved = function (args) {
	  $("#start").val(args.e.start());
	  $("#end").val(args.e.end());
	  $("#text").val(args.e.text());
	  $("#type").val(args.e.type());
	  $("#user").val(args.e.user()).change();
	  $("#id").val(args.e.id());
  };
  
  
  dp.theme = "calendar_g";
  load(dp);
  dp.init();
  
 
  function loadUser(){
	  
	  var user =  $("#user").val();
	  $("#name").val("" );
	  $("#surname").val("");
	  $("#email").val("");
	  $("#tel").val("");
	  $.getJSON( "http://localhost:8080/engine/loadUser/"+user, function( data ) {
		  alert(data);
		  $("#name").val(data.name);
		  $("#surname").val(data.surname);
		  $("#email").val(data.email);
		  $("#tel").val(args.tel);

	  });
  };
  
  function load(dp){
	 // alert("loading...");
	  
	  $.getJSON( "http://localhost:8080/engine/loadEvents", function( data ) {
		//alert("receive json data from BE: "+data);
      	for (var i =0; i<data.length;i++){
      		
      		 var e = new DayPilot.Event({
      	            start: longToDate(data[i].startDate),
      	            end: longToDate(data[i].endDate),
      	            id: data[i].id,
      	            text: data[i].text,
      	            type: data[i].type,
      	          	user: data[i].user
      	        });
      		   //e.type = data[i].campo
      	      dp.events.add(e); 
      	}
      	
  	    dp.update();        
		dp.clearSelection();
    	//DayPilot.Calendar.update()  
      	
		  });
	  
	  
	  
	  
  };
  
  
  function add(){
	  $(function () {
	  alert("Start ADD");
	  var ev = new DayPilot.Event({
	        start: $("#start").val(),
	        end: $("#end").val(),
	        id: DayPilot.guid(),
	        text: $("#nome").val()

	    });
	    dp.events.add(ev);
	    alert("Add "+ev.start);
	    var evmodel = { start: ev.start, 
	    				end: ev.end,
	    				id: ev.id,
	    				text: ev.text};
	    $.post("addPrenotation.json",{  toAdd:  evmodel }, 
	    function(data){ alert(data);});
	    alert("End post method");
	    dp.update();

  });
  }
</script>

<script>



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
			


$('#viewModeCombo').change(function(){
	dp.viewType = $('#viewModeCombo').val();
	nav.selectMode = $('#viewModeCombo').val().charAt(0).toLowerCase() + $('#viewModeCombo').val().slice(1);
	dp.update();

});

$('#user').change(function(){
	   loadUser();

	});

$( "#newEventForm" ).submit(function( event ) {
	  
	  // Stop form from submitting normally
	  event.preventDefault();
	  alert('save event');
	  var toCreate = isEmpty($("#id").val());
	  // Get some values from elements on the page:
	  var $form = $( this ),
	    start = $("#start").val(),
	    end = $("#end").val(),
	    id =  isEmpty($("#id").val())?DayPilot.guid():$("#id").val(),
	    text =  $("#text" ).val(),
	    campo = $("#type" ).val(),
	    user = $("#user" ).val(),
	    url = $form.attr( "action" );
	  
	  var json = { "id" : id, "start" : start, "end": end, "text" : text, "type" : campo,"user" : user};
	 
	  // Send the data using post
	  //var posting = jq.post( url, JSON.stringify(json) );
	  //alert('POST');
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
                   	            start: start,
                   	            end: end,
                   	            id: id,
                   	            text: text,
                   	            type: campo,
                   	         	user: user
                   	        });
                          e.type = campo;
                          e.user = user;
                          if(toCreate)
                   	      	dp.events.add(e); 
                		}
                		                   
        }});
	 // load(dp);  

	});

dp.init();
</script>
<jsp:include page="template_footer.jsp" />


