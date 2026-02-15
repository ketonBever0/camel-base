using CamelBackend.Features.Camels.Domain.Models;

namespace CamelBackend.Features.Camels.Application.Services
{
    public interface ICamelService
    {
        Task<IEnumerable<Camel>> GetAllCamelsAsync();
        Task<Camel?> GetCamelByIdAsync(int id);
        Task<Camel> AddCamelAsync(Camel camel);
        Task UpdateCamelAsync(Camel camel);
        Task DeleteCamelAsync(int id);
    }
}
