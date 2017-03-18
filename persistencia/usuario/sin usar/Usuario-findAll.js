
urlLista = "";

function mostrarFiltro(){

    var datos = "<div id='caja-filtro'>\n\
                    <p id='filtro-titulo'>OPCIONES DE FILTRADO DE LISTA</p>\n\
                    <label for='filtro-campo' class='registro-label'>Campo: </label>\n\
                    <select id='filtro-campo' name='campo' class='registro-select' autofocus='autofocus'>\n\
                        <option value='nombreUsuario' selected='selected'>Nombre</option>\n\
                        <option value='apellido1Usuario'>Primer apellido</option>\n\
                    </select>\n\
                    <label for='filtro-valor' class='registro-label'>Valor: </label>\n\
                    <input id='filtro-valor' name='filtro-valor' type='text' class='registro-input'/>\n\
                    <div id='botonera-filtro'>\n\
                        <input id='filtro-boton-enviar' type='button' value='Aplicar filtro' class='btn btn-primary btn-filtro'/>\n\
                        <input id='filtro-boton-reset' type='button' value='Reset' class='btn btn-success btn-filtro'/>\n\
                    </div>\n\
                    <hr/>\n\
                </div>";

    $("#contenidos").html(datos);

    $("#filtro-boton-enviar").on("click", function(){
        campoFiltro = $("#filtro-campo").val();
        valorFiltro = $("#filtro-valor").val();
        // console.log(campoFiltro + " - " + valorFiltro);
        promesa = getAjaxDatosFiltro(campoFiltro,valorFiltro);
        promesa.success(function(data){
            // console.log(data);
            $("#cajaLista").remove();
            mostrarListaUsuarios();
        });
    });

    $("#filtro-boton-reset").on("click", function(){
        valorFiltro = $("#filtro-valor").val("");
        $("#cajaLista").remove();
        mostrarListaUsuarios();
    });
}


function mostrarListaUsuarios() {

    var datos = "<div id='cajaLista'>\n\
                    <table id='lista-usuarios'></table>\n\
                    <div id='pager-usuarios'></div>\n\
                </div>";

    $("#contenidos").append(datos);

    if($("#filtro-valor").val() != ""){
        urlLista = "persistencia/usuario/Usuario-findAll-filtro.php";
    } else {
        urlLista = "persistencia/usuario/Usuario-findAll.php"
    }
    

    jQuery("#lista-usuarios").jqGrid({
        url: urlLista,
        // data: {'campoFiltro': 'nombreUsuario', 'valorFiltro': 'admin'},
        datatype: "json",
        colNames: ['Id', 'Rol', 'Nombre', 'Apellido1', 'Apellido2', 'Dni', 'Tfno.', 'eMail', 'Login', 'Password'],
        colModel: [
            {name: 'idUsuario', index: 'idUsuario', width: 50, align: "center", resizable: true},
            {name: 'rolUsuario', index: 'rolUsuario', width: 90, resizable: true},
            {name: 'nombreUsuario', index: 'nombreUsuario', width: 80, resizable: true},
            {name: 'apellido1Usuario', index: 'apellido1Usuario', width: 80, resizable: true},
            {name: 'apellido2Usuario', index: 'apellido2Usuario', width: 80, resizable: true},
            {name: 'dniUsuario', index: 'dniUsuario', width: 80, align: "right", resizable: true},
            {name: 'telefonoUsuario', index: 'telefonoUsuario', width: 80, align: "right", resizable: true},
            {name: 'emailUsuario', index: 'emailUsuario', width: 160, resizable: true, formatter: 'email'},
            {name: 'loginUsuario', index: 'loginUsuario', width: 90, resizable: true},
            {name: 'passwordUsuario', index: 'passwordUsuario', width: 90, resizable: true}
        ],
        rowNum: 5,
        rowList: [5, 10, 20, 30],
        pager: '#pager-usuarios',
        sortname: 'idUsuario',
        viewrecords: true,
        sortorder: "asc",
        caption: "Gestión de usuarios",
        multiselect: true,
        height: "100%",
        rownumbers: true
    });
    jQuery("#lista-usuarios").jqGrid('navGrid', '#pager-usuarios', {add: false, edit: false, del: false, search: false})
            .navSeparatorAdd('#pager-usuarios', {
                position: "first"
            })
            //DELETE
            .navButtonAdd('#pager-usuarios', {
                caption: "",
                buttonicon: "ui-icon-trash",
                onClickButton: function() {
                    if(usuarioLogueado.rolUsuario === "administrador"){
                        if(confirm("¿ESTÁ SEGURO DE QUE DESEA BORRAR LOS REGISTROS SELECCIONADOS?")){
                            var idFila = jQuery("#lista-usuarios").jqGrid('getGridParam', 'selarrrow');
                            //Parámetro 'selrow' para recoger un solo id
                            if (idFila.length !== 0) {
                                for (var i = 0; i < idFila.length; i++) {
                                    $promesa = delAjaxById("usuario", idFila[i]);
                                    $promesa.success(function(data) {
                                        alert("Los registros se han eliminado correctamente");
                                    });
                                }
                                jQuery("#lista-usuarios").jqGrid().trigger("reloadGrid");
                            } else {
                                alert("No ha seleccionado ningún registro a borrar!");
                            }
                        }
                            
                    } else {
                        alert("¡No dispone de privilegios de administrador!");
                    }
                },
                position: "first"
            })
            //UPDATE
            .navButtonAdd('#pager-usuarios', {
                caption: "",
                buttonicon: "ui-icon-pencil",
                onClickButton: function() {
                    var idFila = jQuery("#lista-usuarios").jqGrid('getGridParam', 'selarrrow');
                    if (idFila.length === 1 && (usuarioLogueado.idUsuario === idFila[0] || usuarioLogueado.rolUsuario === "administrador")) {
                        $promesa = getAjaxById("usuario", idFila[0]);
                        $promesa.success(function(data) {
                            if (data[0] !== null) {
                                
                                $("#editUsuario-select-rol option[value='" + data[0].rolUsuario + "']").attr("selected", "selected");
                                $("#editUsuario-input-id").val(data[0].idUsuario);
                                $("#editUsuario-input-correo").val(data[0].emailUsuario);
                                $("#editUsuario-input-usuario").val(data[0].loginUsuario);
                                $("#editUsuario-input-password").val(data[0].passwordUsuario);
                                $("#editUsuario-input-nombre").val(data[0].nombreUsuario);
                                $("#editUsuario-input-ape1").val(data[0].apellido1Usuario);
                                $("#editUsuario-input-ape2").val(data[0].apellido2Usuario);
                                $("#editUsuario-input-nif").val(data[0].dniUsuario);
                                $("#editUsuario-input-tf").val(data[0].telefonoUsuario);
                                
                                $("#bloqueEditUsuario").dialog("open");

                                if(usuarioLogueado.rolUsuario !== "administrador"){
                                    $("#editUsuario-select-rol").attr("disabled", "true");
                                }
                            }
                        });
                    } else if (idFila.length === 0) {
                        alert("¡Seleccione un registro para editar!");
                    } else if (idFila.length > 1) {
                        alert("¡No es posible editar varios registros a la vez!");
                        // $(".cbox").prop("checked","");
                        // $("tr[role='row']").attr("aria-selected","false");
                        // $("tr[role='row']").attr("class","ui-widget-content jqgrow ui-row-ltr");
                    } else if (usuarioLogueado.idUsuario !== idFila[0] && usuarioLogueado.rolUsuario !== "administrador") {
                        alert("¡¡SÓLO PUEDE EDITAR SU PROPIO USUARIO!!");
                        // $(".cbox").prop("checked","");
                        // $("tr[role='row']").attr("aria-selected","false");
                        // $("tr[role='row']").attr("class","ui-widget-content jqgrow ui-row-ltr");
                    }
                },
                position: "first"
            })
            //INSERT
            .navButtonAdd('#pager-usuarios', {
                caption: "",
                buttonicon: "ui-icon-plus",
                onClickButton: function() {
                    accionPrevia = this.id;
                    $("#registro-admin-boton-listar").hide();
                    $("#bloqueRegistro-admin").dialog("open");
                },
                position: "first"
            });


            // activate the toolbar searching
            // $("#lista-usuarios").jqGrid('filterToolbar');


    if(usuarioLogueado.rolUsuario !== "administrador"){
        $(".ui-icon-trash, .ui-icon-plus").css("display", "none");
    }

}




