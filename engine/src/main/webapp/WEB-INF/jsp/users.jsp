<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" 
           uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<jsp:include page="template_head.jsp" />

	<script src="<c:url value="/resources/js/jquery-1.9.1.min.js" />" type="text/javascript"></script>
	<script src="<c:url value="/resources/js/jquery-ui.js" />" type="text/javascript"></script>
	<script src="<c:url value="/resources/js/jquery.dataTables.js" />" type="text/javascript"></script>
	<!-- 
	<script type="text/javascript" charset="utf8" src="http://ajax.aspnetcdn.com/ajax/jquery.dataTables/1.9.4/jquery.dataTables.min.js"></script>
	 -->


<script type="text/javascript">

</script>
 <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">
                            Lista Utenti
                        </h1>
                        <ol class="breadcrumb">
                            <li>
                                <i class="fa fa-dashboard"></i>  <a href="/engine/index.html">Dashboard</a>
                            </li>
                            <li class="active">
                                <i class="fa fa-table"></i> Lista Utenti
                            </li>
                        </ol>
                    </div>
                </div>
<table id="usersTable" class="table table-hover">
  <thead><tr>
  	<th>id</th>
    <th>Nome</th>
    <th>Cognome</th>
    <th>email</th>
    <th>tel.</th>
    <th>ruolo</th>
    <th>Azioni</th>
  </tr></thead>


<tbody>
<c:forEach items="${userList}" var="item">
  <tr>
  	 <td>${item.id}</td>
    <td>${item.name}</td>
    <td>${item.surname}</td>
    <td>${item.email}</td>
    <td>${item.tel}</td>
    <td>${item.role}</td>
    <td><a href="/engine/delUser/${item.id}.html">Elimina</a> <a href="/engine/reservUser/${item.id}.html">Prenota</a> </td>
    
  </tr>
</c:forEach>
</tbody>
</table>

<br>
<input type="reset" value="Crea Nuovo" id="createNew" class="btn btn-default" />

<div id="user-form-modal" title="User Detail">
<form:form id="userForm" method="POST" commandName="user" action="/engine/saveUser" role="form">
   <table>
    <tr>
    	<form:hidden path="id" ></form:hidden>
        <td><form:label path="name">Nome</form:label></td>
        <td><form:input path="name" class="form-control" /></td>
    </tr>
    <tr>
        <td><form:label path="surname">Cognome</form:label></td>
        <td><form:input path="surname" class="form-control" /></td>
    </tr>
        <tr>
        <td><form:label path="email">E-Mail</form:label></td>
        <td><form:input path="email" class="form-control" /></td>
    </tr>
    <tr>
        <td><form:label path="tel">Telefono</form:label></td>
        <td><form:input path="tel" class="form-control"/></td>
    </tr>
     <tr>
        <td><form:label path="role">Ruolo</form:label></td>
        <td><form:input path="role" class="form-control" /></td>
    </tr>
    <tr>
        <td colspan="2">
        	<input type="reset" value="Crea Nuovo" id="reset" class="btn btn-default" />
            <input type="submit" value="Salva" class="btn btn-default"/>
            
        </td>
    </tr>
</table>  
</form:form>
</div>
 <script>
 function isEmpty(str) {
	    return (!str || 0 === str.length);
	};

	var evDialog = $( "#user-form-modal" ).dialog({
	    autoOpen: false,
	    height: 350,
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
	
 $(document).ready(function() {
	    //alert($('#usersTable'));
	    var table = $('#usersTable').DataTable();
	    
	    $('#usersTable tbody').on('click', 'tr', function(){
		    var oData = table.fnGetData(this);
		    //var json = JSON.parse(oData);
		    //Valorizzo il form
		    $("#id").val(oData[0]);
		    $("#name").val(oData[1]);
		    $("#surname").val(oData[2]);
			$("#email").val(oData[3]);
			$("#tel").val(oData[4]);
			$("#role").val(oData[5]);
			evDialog.dialog( "open" );
		});
	    
	    if(table.fnGetData().length == 0)
	    	evDialog.dialog( "open" );
 });


 $("#createNew").click(function() {
	 
	 	$("#id").val(0);
	 	$("#name").val('');
		$("#surname").val('');
		$("#email").val('');
		$("#tel").val('');
		$("#role").val('');
		evDialog.dialog( "open" );
});

 $("#reset").click(function() {
	 
	 $("#id").val(0);
	
     //$(this).closest('form').find("description").val("reset");
 });


 
  $( "#userForm" ).submit(function( event ) {
	  
	  // Stop form from submitting normally
	  event.preventDefault();
	  var toCreate = isEmpty($("#id").val());
	  // Get some values from elements on the page:
	  var jqform = $( this ),
	    id = $("#id").val(),
	    name = $("#name").val(),
	    surname = $("#surname").val(),
	    email =  $("#email" ).val(),
	    tel =  $("#tel" ).val(),
	    role = $("#role" ).val();
	  
	  var json = { "id" : id, "name" : name, "surname": surname,"email" : email,  "tel" : tel , "role" : role};
	 
	 
	  // Send the data using post
	  //var posting = jq.post( url, JSON.stringify(json) );
	  //alert('POST');
	  $.ajax({ 
				  headers: { 
				        'Accept': 'application/json',
				        'Content-Type': 'application/json' 
				    },
               url:"http://localhost:8080/engine/saveUser",    
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
<br>

<jsp:include page="template_footer.jsp" />