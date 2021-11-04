$(document).ready(function(){
    traerInformacionCategorias();
    $("#update").hide()
    $("#id").hide()
})

function traerInformacionCategorias(){
    $.ajax({
        url:"http://129.151.113.133:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaCategorias(respuesta);
        }
    });
}

function pintarRespuestaCategorias(respuesta){
    let myTable="<table><thead><tr><th>Nombre</th><th>Descripcion</th><th>Acciones</th></tr></thead>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+='<td><a class="btn btn-danger" onclick="borrarInformacionCategorias('+respuesta[i].id+')" style="margin: 5px"><i class="las la-trash-alt"></i></a>'+'<a class="btn btn-success" onclick=" editarInformacionCategorias('+respuesta[i].id+')" style="margin: 5px"><i class="las la-edit"></i></a></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoCategoria").html(myTable);
}

function guardarInformacionCategorias(){
    let var2 = {
        name:$("#name").val(),
        description:$("#description").val()
    };

        $.ajax({
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),
            url:"http://129.151.113.133:8080/api/Category/save",
        
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

function borrarInformacionCategorias (idElemnto){
    var elemento={
        id:idElemnto
    };

    $.ajax({
        type:'DELETE',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data:JSON.stringify(elemento),
        url:"http://129.151.113.133:8080/api/Category/"+idElemnto,
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

function editarInformacionCategorias (idElemento){
    $.ajax({
        url:"http://129.151.113.133:8080/api/Category/"+idElemento,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            $("#id").val(respuesta.id),
            $("#name").val(respuesta.name),
            $("#description").val(respuesta.description)
            $("#save").hide()
            $("#id").show()
            $("#update").show()
        }
    });
}

function InformacionCategorias(){
    let var2 = {
        id:$("#id").val(),
        name:$("#name").val(),
        description:$("#description").val()
    }

        $.ajax({
            type:'PUT',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),
            url:"http://129.151.113.133:8080/api/Category/update",
        
            success:function(response) {
                console.log(response);
                console.log("Se edito correctamente");
                alert("Se edito correctamente");
                window.location.reload()
            },
        
            error: function(jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se edito correctamente");
            }
        });
}