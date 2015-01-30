<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" 
           uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<jsp:include page="template_head.jsp" />

<script type="text/javascript" charset="utf8" src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.2.min.js"></script>
<script type="text/javascript" charset="utf8" src="http://ajax.aspnetcdn.com/ajax/jquery.dataTables/1.9.4/jquery.dataTables.min.js"></script>

<script type="text/javascript">

</script>
 <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">
                            Campi
                        </h1>
                        <ol class="breadcrumb">
                            <li>
                                <i class="fa fa-dashboard"></i>  <a href="/engine/index.html">Dashboard</a>
                            </li>
                            <li class="active">
                                <i class="fa fa-table"></i> Campi
                            </li>
                        </ol>
                    </div>
                </div>
<table id="typesTable" class="table table-hover">
  <thead><tr>
  	<th>id</th>
    <th>Nome</th>
    <th>Dimensioni</th>
    <th>Prezzo euro-ora persona</th>
    <th>Descrizione</th>
    <th>Azioni</th>
  </tr></thead>


<tbody>
<c:forEach items="${itemList}" var="item">
  <tr>
  	 <td>${item.id}</td>
    <td>${item.name}</td>
    <td>${item.size}</td>
    <td>${item.price}</td>
     <td>${item.description}</td>
    <td><a href="/JFootballWeb/delCampo/${item.id}.html">Elimina</a></td>
  </tr>
</c:forEach>
</tbody>
</table>

<br>
  <div class="row">
     <div class="col-lg-6">

                       
<form:form id="typeForm" method="POST" commandName="item" action="/engine/saveType" role="form">
  
  		
    	<form:hidden path="id" ></form:hidden>
    	 <div class="form-group">
	        <form:label path="name">Nome</form:label>
	        <form:input path="name" class="form-control" />
       </div>
  		
  		 <div class="form-group">
  		<form:label path="size">Dimensione</form:label>
        <form:input path="size" class="form-control"/>
		</div>
		
		 <div class="form-group">
		<form:label path="price">prezzo orario a persona</form:label>
        <form:input path="price" class="form-control" />
 		</div>
 		 <div class="form-group">
 		<form:label path="description">Descrizione</form:label>
        <form:input path="description" class="form-control"/>
		</div>
		 <div class="form-group">
        	<input type="reset" value="Azzera" id="reset" class="btn btn-default" />
            <input type="submit" value="Salva" class="btn btn-default"/>
  		</div>
 
</form:form>
</div>
</div>
 <script>
 function isEmpty(str) {
	    return (!str || 0 === str.length);
	}


 $(document).ready(function() {
	    var table = $('#typesTable').DataTable(
	    		{
	    	        "columnDefs": [
	    	            {
	    	                "targets": [ 0 ],
	    	                "visible": false,
	    	                "searchable": false
	    	            }
	    	        ]
	    	    }
	    		);
	    
	    $('#typesTable tbody').on('click', 'tr', function(){
		    var oData = table.fnGetData(this);
		    //var json = JSON.parse(oData);
		    //Valorizzo il form
		    $("#id").val(oData[0]);
		    $("#name").val(oData[1]);
		    $("#size").val(oData[2]);
			$("#price").val(oData[3]);
			$("#description").val(oData[4]);
		});
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
	    name = $("#name").val(),
	    size = $("#size").val(),
	    price =  $("#price" ).val(),
	    desc = $("#description" ).val();
	  
	  var json = { "id" : id, "name" : name, "size": size,"price" : price,  "description" : desc };
	 
	 
	  // Send the data using post
	  //var posting = jq.post( url, JSON.stringify(json) );
	  //alert('POST');
	  $.ajax({ 
				  headers: { 
				        'Accept': 'application/json',
				        'Content-Type': 'application/json' 
				    },
               url:"http://localhost:8080/engine/saveType",    
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