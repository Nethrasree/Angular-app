
using System.IO;
using angularapi.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Serilog;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
//Json Serializer
 builder.Services.AddControllersWithViews().AddNewtonsoftJson(options =>
 
 options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
 .AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(option =>
{
    
    option.AddPolicy("MyPolicy",builder =>
    {
        builder.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});
builder.Host.UseSerilog((context, config)=> {

  config.WriteTo.File("Logs/log.txt",rollingInterval:RollingInterval.Day);

  if(context.HostingEnvironment.IsProduction() == false)
  {
    config.WriteTo.Console();
  }
});
builder.Services.AddDbContext<AppDbContext>(option=>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("Default"));
});

//adding service for token
builder.Services.AddAuthentication(x=>
{
    x.DefaultAuthenticateScheme =  JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(x => 
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("veryverysecretveryverysecret")),
        ValidateAudience = false,
        ValidateIssuer = false,
        ClockSkew = TimeSpan.Zero
    };
});

// builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//     .AddJwtBearer(options =>
//     {
//         options.TokenValidationParameters = new TokenValidationParameters
//         {
//             ValidateIssuer = true, // Set to true if you want to validate the issuer
//             ValidateAudience = true, // Set to true if you want to validate the audience
//             ValidateIssuerSigningKey = true, // Set to true if you want to validate the signing key
//             ValidIssuer = "your_issuer", // Specify the valid issuer
//             ValidAudience = "your_audience", // Specify the valid audience
//             IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your_secret_key")) // Set the symmetric signing key
//         };
//     });
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// app.UseCors(options=>
// options.WithOrigins("http://localhost:4200")
// .AllowAnyMethod()
// .AllowAnyHeader()
// );
app.UseHttpsRedirection();
app.UseCors("MyPolicy");
app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles(new StaticFileOptions
{
        FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(),"photos")),
        RequestPath = "/Photos"

});
app.MapControllers();
// app.UseSerilog();
app.Run();
