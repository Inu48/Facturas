using System;
using System.Collections.Generic;

namespace Facturas.Server.Models;

public partial class Factura
{
    public int IdFolio { get; set; }

    public DateTime? FechaRegistro { get; set; }

    public string? Concepto { get; set; }

    public decimal? Cantidad { get; set; }

    public decimal? Total { get; set; }

    public int? IdCliente { get; set; }

    public virtual Cliente? IdClienteNavigation { get; set; }
}
