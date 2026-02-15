using CamelBackend.Features.Camels.Domain.Models;
using CamelBackend.Features.Camels.Infrastructure.Repositories;

namespace CamelBackend.Features.Camels.Application.Services
{
    public class CamelService(ICamelRepository repository) : ICamelService
    {
        private readonly ICamelRepository _repository = repository;

        public async Task<IEnumerable<Camel>> GetAllCamelsAsync() => await _repository.GetAllCamelsAsync();

        public async Task<Camel?> GetCamelByIdAsync(int id) => await _repository.GetCamelByIdAsync(id);

        public async Task<Camel> AddCamelAsync(Camel camel)
        {
            var created = await _repository.AddCamelAsync(camel);
            await _repository.SaveAsync();
            return created;
        }

        public async Task UpdateCamelAsync(Camel camel)
        {
            _repository.UpdateCamel(camel);
            await _repository.SaveAsync();
        }

        public async Task DeleteCamelAsync(int id)
        {
            await _repository.DeleteCamelAsync(id);
            await _repository.SaveAsync();
        }
    }
}
