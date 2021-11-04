$(document).ready(function(){
    traerInformacionBike();
    itemCategoria();
    $("#update").hide()
    $("#id").hide()
})

function itemCategoria(){
    $.ajax({
        url:"http://129.151.113.133:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let mySelect="<select id='category' class='form-control mb-3'>";
            mySelect += "<option value='null' id='select-category'>Seleccionar</option>"
            for( i=0 ; i<respuesta.length ; i++ ){
                mySelect += "<option value="+respuesta[i].id+" id="+respuesta[i].id+">"+respuesta[i].name+"</option>";
            }
            mySelect += "</select>"
            $("#resultado_Categoria").html(mySelect);
        }
    });
}

function traerInformacionBike(){
    $.ajax({
        url:"http://129.151.113.133:8080/api/Bike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaBike(respuesta);
        }
    });
}

function pintarRespuestaBike(respuesta){
    let myTable="<table><thead><tr><th>Nombre</th><th>Marca</th><th>Año</th><th>Categoria</th><th>Descripcion</th><th>Acciones</th></tr></thead>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].category.name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+='<td><a class="btn btn-danger" onclick="borrarInformacionBike('+respuesta[i].id+')" style="margin: 5px"><i class="las la-trash-alt"></i></a>'+'<a class="btn btn-success" onclick=" editarInformacionBike('+respuesta[i].id+')" style="margin: 5px"><i class="las la-edit"></i></a></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoBike").html(myTable);
}

function guardarInformacionBike(){
    let var2 = {
        name:$("#name").val(),
        brand:$("#brand").val(),
        year:$("#year").val(),
        category:{"id":$("#category").val()},
        description:$("#description").val()
    };

        $.ajax({
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),
            url:"http://129.151.113.133:8080/api/Bike/save",
        
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
        });
}

function borrarInformacionBike (idElemnto){
    var elemento={
        id:idElemnto
    };

    $.ajax({
        type:'DELETE',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data:JSON.stringify(elemento),
        url:"http://129.151.113.133:8080/api/Bike/"+idElemnto,
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

function editarInformacionBike (idElemento){
    $.ajax({
        url:"http://129.151.113.133:8080/api/Bike/"+idElemento,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            $("#id").val(respuesta.id),
            $("#name").val(respuesta.name),
            $("#brand").val(respuesta.brand),
            $("#year").val(respuesta.year),
            $("#"+respuesta.category.id).attr("selected",true),
            $("#description").val(respuesta.description)
            $("#save").hide()
            $("#category").hide()
            $("#update").show()
            
        }
    });
}

function InformacionBike(){
    let var2 = {
        id:$("#id").val(),
        name:$("#name").val(),
        brand:$("#brand").val(),
        year:$("#year").val(),
        category:{"id":$("#category").val()},
        description:$("#description").val()
    }

        $.ajax({
            type:'PUT',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),
            url:"http://129.151.113.133:8080/api/Bike/update",
        
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