using Facturas.Server.Models;
using System.Text.Json.Serialization;
var builder = WebApplication.CreateBuilder(args);
var corsPolicy = "_myAllowSpecificOrigins";

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
    options.AddPolicy(name: corsPolicy, builder =>
    {
        builder.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
        .AllowAnyHeader().AllowAnyMethod();
    })
    );
builder.Services.AddDbContext<DbPruebaContext>();
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.WriteIndented = true;
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(corsPolicy);
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
