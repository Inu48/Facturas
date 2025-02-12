using Facturas.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Facturas.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly DbPruebaContext _dbPruebaContext;

        public ClienteController(DbPruebaContext dbPruebaContext)
        {
            _dbPruebaContext = dbPruebaContext;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            List<Cliente> lista = await _dbPruebaContext.Clientes.OrderBy(c => c.Nombre).ToListAsync();

            return StatusCode(StatusCodes.Status200OK, lista);
        }
    }
}
