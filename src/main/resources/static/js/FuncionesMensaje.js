$(document).ready(function(){
    traerInformacionMensaje();
    $("#update").hide()
    itemBike();
    itemCliente();
})

/*  --- Mensaje ---*/
function itemBike(){
    $.ajax({
        url:"http://129.151.113.133:8080/api/Bike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let mySelect="<select id='bike' class='form-control mb-3'>";
            mySelect += "<option value='null' id='select-bike'>Seleccionar Bike</option>"
            for( i=0 ; i<respuesta.length ; i++ ){
                mySelect += "<option value="+respuesta[i].id+" id="+respuesta[i].id+">"+respuesta[i].name+"</option>";
            }
            mySelect += "</select>"
            $("#resultado_Bike").html(mySelect);
        }
    });
}

function itemCliente(){
    $.ajax({
        url:"http://129.151.113.133:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let mySelect="<select id='client' class='form-control mb-3'>";
            mySelect += "<option value='null' id='select-client'>Seleccionar Cliente</option>"
            for( i=0 ; i<respuesta.length ; i++ ){
                mySelect += "<option value="+respuesta[i].idClient+" id="+respuesta[i].ididClient+">"+respuesta[i].name+"</option>";
            }
            mySelect += "</select>"
            $("#resultado_Cliente").html(mySelect);
        }
    });
}

function traerInformacionMensaje(){
    $.ajax({
        url:"http://129.151.113.133:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaMensaje(respuesta);
        }
    });
}

function pintarRespuestaMensaje(respuesta){
    let myTable="<table><thead><tr><th>Nombre</th><th>Bike</th><th>Comentario</th><th>Acciones</th></tr></thead>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].bike.name+"</td>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+='<td><a class="btn btn-danger" onclick="borrarInformacionMensaje('+respuesta[i].idMessage+')" style="margin: 5px"><i class="las la-trash-alt"></i></a>'+'<a class="btn btn-success" onclick="editarInformacionMensaje('+respuesta[i].idMessage+')" style="margin: 5px"><i class="las la-edit"></i></a></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoMensaje").html(myTable);
}

function guardarInformacionMensaje(){
    let var2 = {
        client:{"idClient":$("#client").val()},
        bike:{"id":$("#bike").val()},
        messageText:$("#messageText").val()
    };

        $.ajax({
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),
            url:"http://129.151.113.133:8080/api/Message/save",
        
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
/* */
function borrarInformacionMensaje (idElemnto){
    var elemento={
        id:idElemnto
    };

    $.ajax({
        type:'DELETE',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data:JSON.stringify(elemento),
        url:"http://129.151.113.133:8080/api/Message/"+idElemnto,
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

function editarInformacionMensaje (idElemento){
    $.ajax({
        url:"http://129.151.113.133:8080/api/Message/"+idElemento,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            $("#id").val(respuesta.idMessage),
            $("#"+respuesta.client.idclient).attr("selected",true),
            $("#"+respuesta.bike.id).attr("selected",true),
            $("#messageText").val(respuesta.messageText)
            $("#save").hide()
            //$("#bike").hide()
            $("#update").show()
        }
    });
}

function InformacionMensaje(){
    let var2 = {
        idMessage:$("#id").val(),
        client:{"idClient":$("#client").val()},
        bike:{"id":$("#bike").val()},
        messageText:$("#messageText").val()
    }
        console.log(var2);
        $.ajax({
            type:'PUT',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),
            url:"http://129.151.113.133:8080/api/Message/update",
        
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
