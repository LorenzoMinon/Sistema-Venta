using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using SistemaVenta.BLL.Interfaces;
using SistemaVenta.DAL.Interfaces;
using SistemaVenta.Entity;
using System.Globalization;

namespace SistemaVenta.BLL.Implementacion
{
    public class DashBoardService : IDashBoardService
    {
        public Task<Dictionary<string, int>> ProductosTopUltimaSemana()
        {
             
        }

        public Task<int> TotalCategorias()
        {

        }

        public Task<string> TotalIngresosUltimaSemana()
        {

        }

        public Task<int> TotalProductos()
        {

        }

        public Task<int> TotalVentasUltimaSemana()
        {

        }

        public Task<Dictionary<string, int>> VentasUltimaSemana()
        {

        }
    }
}
