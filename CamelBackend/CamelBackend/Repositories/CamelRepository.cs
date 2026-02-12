using CamelBackend.DB;
using CamelBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace CamelBackend.Repositories
{
    public class CamelRepository : ICamelRepository
    {
        private readonly AppDbContext _context;

        public CamelRepository(AppDbContext context) => _context = context;

        public async Task<IEnumerable<Camel>> GetAllCamelsAsync() => await _context.Camels.ToListAsync();

        public async Task<Camel?> GetCamelByIdAsync(int id) => await _context.Camels.FindAsync(id);

        public async Task<Camel> AddCamelAsync(Camel camel)
        {
            await _context.Camels.AddAsync(camel);
            return camel;
        }

        public void UpdateCamel(Camel camel)
        {
            _context.Camels.Update(camel);
        }

        public async Task DeleteCamelAsync(int id)
        {
            var camel = await _context.Camels.FirstOrDefaultAsync(x => x.Id == id);
            if (camel != null)
            {
                _context.Camels.Remove(camel);
            }

        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

    }
}
