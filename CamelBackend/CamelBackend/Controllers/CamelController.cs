using AutoMapper;
using CamelBackend.Features.Camels.Application.DTOs;
using CamelBackend.Features.Camels.Application.Services;
using CamelBackend.Features.Camels.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CamelBackend.Controllers
{
    [Route("api/camel")]
    [ApiController]
    public class CamelController : ControllerBase
    {
        private readonly ICamelService _camelService;
        private readonly IMapper _mapper;

        public CamelController(ICamelService camelService, IMapper mapper)
        {
            _camelService = camelService;
            _mapper = mapper;
        }


        // GET: api/<CamelController>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await _camelService.GetAllCamelsAsync();
            var camels = _mapper.Map<List<CamelReadDto>>(data);
            return Ok(camels);
        }

        // GET api/<CamelController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var data = await _camelService.GetCamelByIdAsync(id);
            if (data != null)
            {
                var camel = _mapper.Map<CamelReadDto>(data);
                return Ok(camel);
            }
            else
            {
                return NotFound();
            }
        }

        // POST api/<CamelController>
        [HttpPost]
        public async Task<IActionResult> Post(CamelCreateDto dto)
        {
            //var camel = new Camel
            //{
            //    Name = dto.Name,
            //    Color = dto.Color,
            //    HumpCount = dto.HumpCount,
            //    LastFed = dto.LastFed
            //};

            var camel = _mapper.Map<Camel>(dto);
            await _camelService.AddCamelAsync(camel);
            return StatusCode(201);
        }

        // PUT api/<CamelController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, CamelUpdateDto dto)
        {
            var camel = await _camelService.GetCamelByIdAsync(id);
            if (camel == null)
            {
                return NotFound();
            }

            _mapper.Map(dto, camel);

            await _camelService.UpdateCamelAsync(camel);
            return Ok();
        }

        // DELETE api/<CamelController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (await _camelService.GetCamelByIdAsync(id) != null)
            {
                await _camelService.DeleteCamelAsync(id);
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}
