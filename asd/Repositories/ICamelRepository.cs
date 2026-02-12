using CamelBackend.Models;

namespace CamelBackend.Repositories
{
    public interface ICamelRepository
    {
        Task<IEnumerable<Camel>> GetAllCamelsAsync();
        Task<Camel?> GetCamelByIdAsync(int id);
        Task AddCamelAsync(Camel camel);
        void UpdateCamel(Camel camel);
        Task DeleteCamelAsync(int id);
        Task SaveAsync();
    }
}
