using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Facturas.Server.Models;

public partial class DbPruebaContext : DbContext
{
    public DbPruebaContext()
    {
    }

    public DbPruebaContext(DbContextOptions<DbPruebaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cliente> Clientes { get; set; }

    public virtual DbSet<Factura> Facturas { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB; DataBase=DB_Prueba; Integrated Security=true");


    //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    //    => optionsBuilder.UseSqlServer("Server=OXNEOM000216\\SQLEXPRESS; DataBase=DB_Prueba;Trusted_Connection=SSPI;MultipleActiveResultSets=true;Trust Server Certificate=true");


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.HasKey(e => e.IdCliente).HasName("PK__Cliente__D59466421F992B0E");

            entity.ToTable("Cliente");

            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Factura>(entity =>
        {
            entity.HasKey(e => e.IdFolio).HasName("PK__Factura__FFE7DA344FBB5910");

            entity.ToTable("Factura");

            entity.Property(e => e.IdFolio).ValueGeneratedNever();
            entity.Property(e => e.Cantidad).HasColumnType("decimal(8, 2)");
            entity.Property(e => e.Concepto)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FechaRegistro).HasColumnType("datetime");
            entity.Property(e => e.Total).HasColumnType("decimal(8, 2)");

            entity.HasOne(d => d.IdClienteNavigation).WithMany(p => p.Facturas)
                .HasForeignKey(d => d.IdCliente)
                .HasConstraintName("FK__Factura__IdClien__3B75D760");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
