using AutoMapper;
using CamelBackend.Features.Camels.Application.DTOs;
using CamelBackend.Features.Camels.Domain.Models;

namespace CamelBackend.Features.Camels.Application.Mapping
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
