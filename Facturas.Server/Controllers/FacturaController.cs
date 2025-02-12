using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Facturas.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Facturas.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacturaController : ControllerBase
    {
        private readonly DbPruebaContext _dbPruebaContext;

        public FacturaController(DbPruebaContext dbPruebaContext)
        {
            _dbPruebaContext = dbPruebaContext;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            List<Factura> lista = await _dbPruebaContext.Facturas.Include(e => e.IdClienteNavigation).OrderBy(e=> e.IdFolio).ToListAsync();
            
            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpGet]
        [Route("Filtro")]
        public async Task<IActionResult> Filtro(DateTime fechaInicio, DateTime fechaFin)
        {
            List<Factura> ordenes = await _dbPruebaContext.Facturas
                .Where(o => o.FechaRegistro >= fechaInicio && o.FechaRegistro <= fechaFin)
                .Include(o => o.IdClienteNavigation)
                .ToListAsync();

            if (ordenes == null || ordenes.Count == 0)
            {
                return StatusCode(StatusCodes.Status404NotFound, "No se encontraron registros.");
            }

            return StatusCode(StatusCodes.Status200OK, ordenes);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Factura factura)
        {
            var count = await _dbPruebaContext.Facturas.CountAsync();

            int id = count + 1;
            factura.IdFolio = id;

            float cantidad = float.Parse(factura.Cantidad.Value.ToString());
            float total = cantidad + (float)(cantidad * 0.16);

            factura.Total = decimal.Parse(total.ToString());

            await _dbPruebaContext.Facturas.AddAsync(factura);
            await _dbPruebaContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status201Created, "ok");
        }
    }
}
