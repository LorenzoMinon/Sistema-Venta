namespace SistemaVenta.AplicacionWeb.Models.ViewModels
{
    public class VMPDFVenta
    {
        public VMNegocio? negocio { get; set; }

        public VMVenta? venta { get; set; }

        // En este VM usamos a otro vms como propiedades. 
    }
}
