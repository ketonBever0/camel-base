using AutoMapper;
using CamelBackend.Models;

namespace CamelBackend.Mapping
{
    public class CamelProfile: Profile
    {
        public CamelProfile()
        {
            CreateMap<Camel, CamelReadDto>();
            CreateMap<CamelCreateDto, Camel>();
            CreateMap<CamelUpdateDto, Camel>();
        }
    }
}
