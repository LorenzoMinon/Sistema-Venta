
$(document).ready(function () {
    $(".card-body").LoadingOverlay("show");

    fetch("/Negocio/Obtener")
        .then(response => {
            $(".card-body").LoadingOverlay("hide");
            return response.ok ? response.json() : Promise.reject(response);
        })
        .then(responseJson => {

            console.log(responseJson)

            if (responseJson.estado) {
                const d = responseJson.objeto
                $("#txtNumeroDocumento").val(d.numeroDocumento)
                $("#txtRazonSocial").val(d.nombre)
                $("#txtCorreo").val(d.correo)
                $("#txtDireccion").val(d.direccion)
                $("#txtTelefono").val(d.telefono)
                $("#txtImpuesto").val(d.porcentajeImpuesto)
                $("#txtSimboloMoneda").val(d.simboloMoneda)
                $("#imgLogo").attr("src", d.urlLogo)

            } else {
                swal("Lo sentimos", responseJson.mensaje, "error")
            }
        })
})

$("#btnGuardarCambios").click(function () {

    const inputs = $("input.input-validar").serializeArray(); //obtiene las cajas de texto del index de negocio
    const inputs_sin_valor = inputs.filter((item) => item.value.trim() == "")
    // con esto validamos que inputs tienen valor o no. 

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo: "${inputs_sin_valor[0].name}"`;
        toastr.warning("", mensaje) // sale del wwwroot, vendor y el toastr.
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus()
        return;
    }

    const modelo = {
        numeroDocumento: $("#txtNumeroDocumento").val(),
        nombre: $("#txtRazonSocial").val(),
        correo: $("#txtCorreo").val(),
        direccion: $("#txtDireccion").val(),
        telefono: $("#txtTelefono").val(),
        porcentajeImpuesto: $("#txtImpuesto").val(),
        simboloMoneda: $("#txtSimboloMoneda").val(),
    }

    const inputLogo = document.getElementById("txtLogo")

    const formData = new FormData()

    formData.append("logo", inputLogo.files[0])
    formData.append("modelo", JSON.stringify(modelo)) 
    //Estos dos elementos son los que les vamos a pasar al metodo GuardarCambios

    $(".card-body").LoadingOverlay("show");


    fetch("/Negocio/GuardarCambios", {
        method: "POST",
        body: formData
    })
        .then(response => {
            $(".card-body").LoadingOverlay("hide");
            return response.ok ? response.json() : Promise.reject(response);
        })
        .then(responseJson => {

            if (responseJson.estado) {
                const d = responseJson.objeto

                $("#ImgLogo").attr("src", d.urlLogo)


            } else {
                swal("Lo sentimos", responseJson.mensaje, "error")
            }
        })

})