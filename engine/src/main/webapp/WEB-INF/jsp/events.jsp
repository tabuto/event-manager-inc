<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" 
           uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<jsp:include page="template_head.jsp" />
<!-- 
<script type="text/javascript" charset="utf8" src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.2.min.js"></script>
<script type="text/javascript" charset="utf8" src="http://ajax.aspnetcdn.com/ajax/jquery.dataTables/1.9.4/jquery.dataTables.min.js"></script>

 -->
<script src="<c:url value="/resources/js/jquery-1.9.1.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/resources/js/jquery-ui.js" />" type="text/javascript"></script>
<script src="<c:url value="/resources/js/jquery.dataTables.js" />" type="text/javascript"></script>
<script src="<c:url value="/resources/js/jquery.dataTables.columnFilter.js" />" type="text/javascript"></script>
	

<script type="text/javascript">

</script>

 <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">
                            Lista Eventi
                        </h1>
                        <ol class="breadcrumb">
                            <li>
                                <i class="fa fa-dashboard"></i>  <a href="/engine/index.html">Dashboard</a>
                            </li>
                            <li class="active">
                                <i class="fa fa-table"></i> Lista Eventi
                            </li>
                        </ol>
                    </div>
                </div>

<table id="eventsTable" class="table table-hover">
  <thead><tr>
  	<th>id</th>
    <th>Da</th>
    <th>A</th>
    <th>Testo</th>
    <th>Campo</th>
    <th>Utente</th>
  </tr></thead>


<!-- 
<tbody>
<c:forEach items="${eventsList}" var="item">
  <tr>
  	 <td>${item.id}</td>
    <td>${item.startDate}</td>
    <td>${item.endDate}</td>
    <td>${item.text}</td>
    <td>${item.type}</td>
    <td>${item.user}</td>
    <td><a href="/engine/delEvent/${item.id}.html">Elimina</a></td>
  </tr>
</c:forEach>
</tbody>
 -->
</table>

<br>

<form:form id="eventForm" method="POST" commandName="event" action="/engine/saveEvent">
   <table>
    <tr>
    	<form:hidden path="id" ></form:hidden>
    	
        <td><form:label path="start">Data da</form:label></td>
        <td><form:input path="start" /></td>
    </tr>
    <tr>
        <td><form:label path="end">Data a</form:label></td>
        <td><form:input path="end" /></td>
    </tr>
        <tr>
        <td><form:label path="text">Testo</form:label></td>
        <td><form:input path="text" /></td>
    </tr>
    <tr>
        <td><form:label path="type">Campo</form:label></td>
        <td><form:input path="type" /></td>
    </tr>
        <tr>
        <td><form:label path="user">Utente</form:label></td>
        <td><form:input path="user" /></td>
    </tr>
    <tr>
        <td colspan="2">
        	<input type="reset" value="Azzera" id="reset" class="btn btn-default" />
            <input type="submit" value="Salva" class="btn btn-default"/>
            
        </td>
    </tr>
</table>  
</form:form>

 <script>
 function isEmpty(str) {
	    return (!str || 0 === str.length);
	}
 

 $(document).ready(function() {
	 $.datepicker.regional[""].dateFormat = 'dd/mm/yy';
	 $.datepicker.setDefaults($.datepicker.regional['']);
	 
	    var table = $('#eventsTable').DataTable(
	    		{
	    			"bFilter":true,
	    			"bProcessing": true,
	    			"bServerSide": true,
	    			"bPaginate": true,
	    			"sPaginationType": "full_numbers",
	    	        "sAjaxSource":  "/engine/eventsSource",
	    	        "fnRowCallback": function( nRow, aData, iDisplayIndex ) {
	    	            $('td:eq(4)', nRow).html('<a href="/engine/types?id=' + aData.type + '">' +
	    	                aData.typeModel.name + '</a>');
	    	         	
		    	        
		    	         $('td:eq(5)', nRow).html('<a href="/engine/loadUser/' + aData.user + '">' +
		    	                aData.userModel.name + (aData.userModel.surnname==undefined?' ': aData.userModel.surnname)+ '('+aData.userModel.tel +')' +'</a>');
	    	            
	    	           
	    	            
	    	          
	    	            
	    	            return nRow;
	    	        },
	    	        
	    	        "aoColumns" : [
	    	                       {
	    	                        
	    	                        "mDataProp" : "id"
	    	                       },
	    	                       {
	    	                        
	    	                        "mDataProp" : "start"
	    	                       },
	    	                       {
	    	                        "mDataProp" : "end"
	    	                       },
	    	                       {
		    	                        "mDataProp" : "text"
		    	                   },
	    	                       {
		    	                        "mDataProp" : "type"
		    	                   },
	    	                       {
		    	                        "mDataProp" : "user"
		    	                   }
	    		],
	    	        
	    	        "columnDefs": [
	    	            {
	    	                "aTargets": [ 0 ],
	    	                "bVisible": false,
	    	                "searchable": false
	    	            }
	    	        ]
	    	    }
	    		).columnFilter({ 	sPlaceHolder: "head:before",
					aoColumns: [ 	{ type: "text" },
					    	 		{ type: "date-range" },
	                                { type: "date-range" },
	                                { type: "text" }
							]

			});
	    
	    $('#eventsTable tbody').on('click', 'tr', function(){
		    var oData = table.fnGetData(this);
		    //var json = JSON.parse(oData);
		    //Valorizzo il form
		    $("#id").val(oData.id);
		    $("#start").val(oData.start);
		    $("#end").val(oData.end);
			$("#text").val(oData.text);
			$("#type").val(oData.type);
			$("#user").val(oData.user);
		});
	    
	    $("#eventsTable").css("width","100%");
 });



 $("#reset").click(function() {
	 
	 $("#id").val(0);
     //$(this).closest('form').find("description").val("reset");
 });


 
  $( "#typeForm" ).submit(function( event ) {
	  
	  // Stop form from submitting normally
	  event.preventDefault();
	  var toCreate = isEmpty($("#id").val());
	  // Get some values from elements on the page:
	  var jqform = $( this ),
	    id = $("#id").val(),
	    name = $("#start").val(),
	    size = $("#end").val(),
	    price =  $("#text" ).val(),
	    price =  $("#type" ).val(),
	    desc = $("#user" ).val();
	  
	  var json = { "id" : id, "start" : start, "end": end,"text" : text,  "type" : type, "user":user };
	 
	 
	  // Send the data using post
	  //var posting = jq.post( url, JSON.stringify(json) );
	  //alert('POST');
	  $.ajax({ 
				  headers: { 
				        'Accept': 'application/json',
				        'Content-Type': 'application/json' 
				    },
               url:"http://localhost:8080/engine/saveEvent",    
               type:"POST", 
               dataType: 'json', 
               contentType: 'application/json; charset=utf-8',
               mimeType: 'application/json',
               data: JSON.stringify(json), //Stringified Json Object
               complete: function(data){ 
               		//alert("success: "+data)
               		if(data.responseText == 'success'){
               			location.reload();
						
               		}
               		                   
       }});
	 // load(dp);  

	}); 

  </script>
<br>
<jsp:include page="template_footer.jsp" />