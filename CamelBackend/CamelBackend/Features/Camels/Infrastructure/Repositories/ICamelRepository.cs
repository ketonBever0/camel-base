using CamelBackend.Features.Camels.Domain.Models;

namespace CamelBackend.Features.Camels.Infrastructure.Repositories
{
    public interface ICamelRepository
    {
        Task<IEnumerable<Camel>> GetAllCamelsAsync();
        Task<Camel?> GetCamelByIdAsync(int id);
        Task<Camel> AddCamelAsync(Camel camel);
        void UpdateCamel(Camel camel);
        Task DeleteCamelAsync(int id);
        Task SaveAsync();
    }
}
