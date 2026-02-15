using CamelBackend.DB;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CamelBackend.Tests.config
{
    public class ApiFactory : WebApplicationFactory<Program>
    {
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.UseEnvironment("Testing");
            builder.ConfigureServices(services =>
            {
                var descriptors = services.Where(
                    d => d.ServiceType == typeof(DbContextOptions<AppDbContext>)
                ).ToList();

                foreach (var d in descriptors)
                {
                    services.Remove(d);
                }

                var providerDescriptors = services.Where(
                    d => d.ImplementationType?.Namespace?.Contains("Sqlite") == true
                ).ToList();

                foreach (var d in providerDescriptors)
                {
                    services.Remove(d);
                }

                services.AddDbContext<AppDbContext>(
                    options => options.UseInMemoryDatabase("TestDb")
                );
            });
        }
    }
}
