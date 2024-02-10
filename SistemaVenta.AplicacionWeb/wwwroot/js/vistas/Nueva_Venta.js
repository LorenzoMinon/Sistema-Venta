$(document).ready(function () {

    fetch("/Venta/ListaTipoDocumentoVenta")
        .then(response => {
            return response.ok ? response.json() : Promise.reject(response);
        })
        .then(responseJson => {
            if (responseJson.length > 0) {
                responseJson.forEach((item) => {
                    $("#cboTipoDocumentoVenta").append(
                        $("<option>").val(item.idTipoDocumentoVenta).text(item.descripcion)
                    )
                })
            }
        })
    fetch("/Negocio/Obtener")
        .then(response => {
            return response.ok ? response.json() : Promise.reject(response);
        })
        .then(responseJson => {
            if (responseJson.estado) {
                const d = responseJson.objeto;
                console.log(d)

                $("#inputGroupSubTotal").text(`Sub total - ${d.simboloMoneda}`);
                $("#inputGroupIGV").text(`IGV(${d.porcentajeImpuesto}%) - ${d.simboloMoneda}`);
                $("#inputGroupTotal").text(`Total - ${d.simboloMoneda}`);
            }

        })

    $("#cboBuscarProducto").select2({ //que exista un option vacio
        ajax: {
            url: "/Venta/ObtenerProductos",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            delay: 250,
            data: function (params) {
                return {
                    busqueda: params.term // parametro busqueda de obt.productos
                };
            },
            processResults: function (data,) {
                return {
                    results: data.map((item) => (
                        {
                        id: item.idProducto,
                        text: item.descripcion,

                        marca: item.marca,
                        categoria: item.nombreCategoria,
                        urlImagen: item.urlImagen,
                        precio: parseFloat(item.precio)
                        }
                    ))
                };
            },
        },
        language: "es",
        placeholder: 'Buscar producto',
        minimumInputLength: 1,
        templateResult: formatoResultados,
    });

    function formatoResultados(data) {
        if (data.loading) {
            return data.text;
        }
        var contenedor = $(
            `<table width="100%">
            <tr>
                <td style="width:60px">
                    <img style="height:60px;width:60px;margin-right:10px" src="${data.urlImagen}"/>
                </td>
                <td>
                    <p style="font-weight: bolder;margin:2px">${data.marca}</p>
                    <p style="margin:2px">${data.text}</p>
                </td>
            </tr>
         </table>`
        );
        return contenedor;
    }
    $("#cboBuscarProducto").on("select2:select", function (e){
        const data = e.params.data;

        console.log(data)
    })
})