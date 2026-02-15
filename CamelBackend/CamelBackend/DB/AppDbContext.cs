using CamelBackend.Features.Camels.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace CamelBackend.DB
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        protected AppDbContext()
        {
        }

        

        public DbSet<Camel> Camels { get; set; }


    }
}
