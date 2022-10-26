let fac0 = "FEDV104846"
let fac1 = "FEDV104858"
let fac2 = "FEDV104943"
let fac3 = "FEDV104944"

let step = 0

function getDocument(index, fileType) {
    var dataTable = $("#table").bootstrapTable('getData');
    var data = jQuery.parseJSON(JSON.stringify(dataTable[index]));
    var id = "";
    var usuarioConsulto = $("#usuarioLogin").val();
    var empresa = $("#CompanyId").text();
    var funcionalidad = $("#titulo").val();
    var noDocumento = data.numero_documento;
    if (fileType === 'PDF') {
        id = data.id_storage_pdf;
    }

    $.ajax({
        type: 'GET',
        url: $("#urlDocumento").val() + '/almacendocumentos/validarArchivo/' + id,
        success: function (result) {
            var storageData = JSON.parse(result);
            var fileName = noDocumento.replace(/FEDV/g, '');
            console.log('fileName ', fileName);
            window.location.href = $("#urlDocumento").val() + '/almacendocumentos/obtenerArchivo?archivo=' + id + '&nombre=' + fileName + '&noDocumento=' + noDocumento + '&usuario=' + usuarioConsulto + '&funcionalidad=' + funcionalidad + '&tipoArchivo=' + fileType + '&empresa=' + empresa;
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (fileType === 'PDF') {
                showMsgModal("ERROR AL OBTENER EL ARCHIVO PDF<br /><br />Por favor, int\u00e9ntelo m\u00e1s tarde.<br />Si el problema persiste, contáctese con servicio técnico.");
            }
        }
    });
}

function download() {
    let nameFac = eval("fac" + step)
    console.log(nameFac);
    document.getElementById('numeroDocumento').value = nameFac;
    // Change id for buscarBtn in html document
    buscarBtn = document.getElementById('buscarBtn');
    (() => {
        buscarBtn.click();
    })();
    setTimeout(() => {
        getDocument(0, 'PDF')
    }, 3000)
    step++
}

setInterval('download()', 4000);