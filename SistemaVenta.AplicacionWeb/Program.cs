using SistemaVenta.AplicacionWeb.Utilidades.Automapper;

using SistemaVenta.IOC;

using SistemaVenta.AplicacionWeb.Utilidades.Extensiones;
using DinkToPdf;
using DinkToPdf.Contracts;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.InyectarDependencia(builder.Configuration); // Con esto tomamos todas las inyecciones de depend. Dependencias.cs

builder.Services.AddAutoMapper(typeof(AutoMapperProfile)); // Agregamos la configuraci�n de automapper para poder usarla en todo el proyecto.

var context = new CustomAssemblyLoadContext();
context.LoadUnmanagedLibrary(Path.Combine(Directory.GetCurrentDirectory(), "Utilidades/LibreriaPDF/libwkhtmltox.dll"));
builder.Services.AddSingleton(typeof(IConverter), new SynchronizedConverter(new PdfTools())); //Aca aplicamos el singleton!


var app = builder.Build();



// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
