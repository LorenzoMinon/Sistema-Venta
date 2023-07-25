namespace SistemaVenta.AplicacionWeb.Utilidades.Response
{
    public class GenericResponse<TObject> // Clase para respuesta a todas las solicitudes 
    {
        public bool Estado { get; set; }
        public string? Mensaje { get; set; }
        public TObject? Objeto { get; set; }
        public List<TObject>? ListaObjeto { get; set; }

        //Le damos el formato de respuesta para cualquier solicitud.
    }
}
