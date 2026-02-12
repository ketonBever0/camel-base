using CamelBackend.Models;

namespace CamelBackend.Services
{
    public interface ICamelService
    {
        Task<IEnumerable<Camel>> GetAllCamelsAsync();
        Task<Camel?> GetCamelByIdAsync(int id);
        Task AddCamelAsync(Camel camel);
        Task UpdateCamelAsync(Camel camel);
        Task DeleteCamelAsync(int id);
    }
}
