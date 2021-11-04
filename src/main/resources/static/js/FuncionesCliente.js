$(document).ready(function(){
    traerInformacionClientes();
    $("#update").hide()
    $("#id").hide()
})

function traerInformacionClientes(){
    $.ajax({
        url:"http://129.151.113.133:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaClientes(respuesta);
        }
    });
}

function pintarRespuestaClientes(respuesta){
    let myTable="<table><thead><tr><th>Email</th><th>Nombre</th><th>Edad</th><th>Acciones</th></th></tr></thead>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+='<td><a class="btn btn-danger" onclick="borrarInformacionClientes('+respuesta[i].idClient+')" style="margin: 5px"><i class="las la-trash-alt"></i></a>'+'<a class="btn btn-success" onclick="editarInformacionCliente('+respuesta[i].idClient+')" style="margin: 5px"><i class="las la-edit"></i></a></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadocliente").html(myTable);
}

function guardarInformacionClientes(){
    let var2 = {
        email:$("#email").val(),
        password:$("#password").val(),
        name:$("#name").val(),
        age:$("#age").val()
    };

        $.ajax({
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),
            url:"http://129.151.113.133:8080/api/Client/save",
        
            success:function(response) {
                console.log(response);
                console.log("Se guardo correctamente");
                alert("Se guardo correctamente");
                window.location.reload()
            },
        
            error: function(jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se guardo correctamente");
            }
        })    
}

function borrarInformacionClientes (idElemnto){
    var elemento={
        id:idElemnto
    };

    $.ajax({
        type:'DELETE',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data:JSON.stringify(elemento),
        url:"http://129.151.113.133:8080/api/Client/"+idElemnto,
        success:function(response){
            console.log(response);
            console.log("Se borro correctamente");
            alert("Se borro correctamente");
            window.location.reload()
        },

        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se borro correctamente");
        }
    })
}

function editarInformacionCliente (idElemento){
    $.ajax({
        url:"http://129.151.113.133:8080/api/Client/"+idElemento,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            $("#id").val(respuesta.idClient),
            $("#email").val(respuesta.email),
            $("#password").val(respuesta.password),
            $("#name").val(respuesta.name),
            $("#age").val(respuesta.age)
            $("#save").hide()
            $("#id").show()
            $("#email").hide()
            $("#update").show()
        }
    });
}

function InformacionCliente(){
    let var2 = {
        idClient:$("#id").val(),
        email:$("#email").val(),
        password:$("#password").val(),
        name:$("#name").val(),
        age:$("#age").val()
    };

        $.ajax({
            type:'PUT',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),
            url:"http://129.151.113.133:8080/api/Client/update",
        
            success:function(response) {
                console.log(response);
                console.log("Se actualizo correctamente");
                alert("Se actualizo correctamente");
                window.location.reload()
            },
        
            error: function(jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se actualizo correctamente");
            }
        })   
}
