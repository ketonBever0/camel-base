using AutoMapper;
using CamelBackend.DB;
using CamelBackend.Features.Camels.Application.DTOs;
using CamelBackend.Features.Camels.Application.Mapping;
using CamelBackend.Features.Camels.Application.Services;
using CamelBackend.Features.Camels.Application.Validators;
using CamelBackend.Features.Camels.Domain.Models;
using CamelBackend.Features.Camels.Infrastructure.Repositories;
using CamelBackend.Localization;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Localization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System.Globalization;

namespace CamelBackend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Localization
            //builder.Services.AddControllers().AddDataAnnotationsLocalization(
            //    options =>
            //        {
            //            options.DataAnnotationLocalizerProvider = (type, factory) =>
            //                factory.Create(typeof(SharedResource));
            //        }
            //    );

            builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");
            var supportedCultures = new[] { new CultureInfo("en-US"), new CultureInfo("hu-HU") };
            builder.Services.Configure<RequestLocalizationOptions>(options =>
            {
                options.DefaultRequestCulture = new RequestCulture("en-US");
                options.SupportedCultures = supportedCultures;
                options.SupportedUICultures = supportedCultures;
                options.RequestCultureProviders = [new AcceptLanguageHeaderRequestCultureProvider()];
            });
            builder.Services.AddScoped<IResourceLocalizer<SharedResource>, ResourceLocalizer<SharedResource>>();

            // Validators
            builder.Services.AddValidatorsFromAssemblyContaining<CamelCreateValidator>();
            builder.Services.AddValidatorsFromAssemblyContaining<CamelUpdateValidator>();
            builder.Services.AddFluentValidationAutoValidation();

            // Add services to the container.

            builder.Services.AddScoped<ICamelService, CamelService>();
            builder.Services.AddScoped<ICamelRepository, CamelRepository>();

            builder.Services.AddDbContext<AppDbContext>(
                options => options.UseSqlite("Data Source=./DB/app.db")
            );

            //builder.Services.AddDbContext<AppDbContext>(
            //    options => options.UseInMemoryDatabase("TestDb")
            //);

            builder.Services.AddAutoMapper(cfg => { }, typeof(CamelProfile));
            //builder.Services.AddAutoMapper(typeof(Program).Assembly);

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin", policy =>
                {
                    policy.WithOrigins("http://localhost:4200")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });


            var app = builder.Build();

            app.UseCors("AllowSpecificOrigin");

            app.UseRequestLocalization(app.Services.GetRequiredService<IOptions<RequestLocalizationOptions>>().Value);

            using (var scope = app.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                db.Database.EnsureCreated();
            }

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            //app.UseAuthorization();

            //app.MapControllers();

            var prefix = "/api/camels";

            app.MapGet(prefix, async (ICamelService service, IMapper mapper) =>
            {
                var data = await service.GetAllCamelsAsync();
                var camels = mapper.Map<List<CamelReadDto>>(data);
                return Results.Ok(camels);
            }).Produces(StatusCodes.Status200OK);

            app.MapGet(prefix + "/{id:int}", async (int id, ICamelService service, IMapper mapper) =>
            {
                var data = await service.GetCamelByIdAsync(id);
                if (data != null)
                {
                    var camel = mapper.Map<CamelReadDto>(data);
                    return Results.Ok(camel);
                }
                else
                {
                    return Results.NotFound();
                }
            }).Produces(StatusCodes.Status200OK).Produces(StatusCodes.Status404NotFound);

            app.MapPost(prefix, async (CamelCreateDto dto, ICamelService service, IMapper mapper) =>
            {
                var camel = mapper.Map<Camel>(dto);
                var created = await service.AddCamelAsync(camel);
                return Results.Created($"{prefix}/{camel.Id}", created);
            }).Produces(StatusCodes.Status201Created).Produces(StatusCodes.Status400BadRequest);

            app.MapPut(prefix + "/{id:int}", async (int id, CamelUpdateDto dto, ICamelService service, IMapper mapper) =>
            {
                var camel = await service.GetCamelByIdAsync(id);
                if (camel == null)
                {
                    return Results.NotFound();
                }

                mapper.Map(dto, camel);

                await service.UpdateCamelAsync(camel);
                return Results.Ok(camel);
            }).Produces(StatusCodes.Status200OK).Produces(StatusCodes.Status404NotFound).Produces(StatusCodes.Status400BadRequest);

            app.MapDelete(prefix + "/{id:int}", async (int id, ICamelService service) =>
            {
                if (await service.GetCamelByIdAsync(id) != null)
                {
                    await service.DeleteCamelAsync(id);
                    return Results.Ok();
                }
                else
                {
                    return Results.NotFound();
                }
            }).Produces(StatusCodes.Status200OK).Produces(StatusCodes.Status404NotFound);


            app.Run();
        }
    }
}
