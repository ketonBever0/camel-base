using CamelBackend.Localization;
using System.ComponentModel.DataAnnotations;

namespace CamelBackend.Features.Camels.Application.DTOs
{
    public class CamelReadDto
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string? Color { get; set; }

        [AllowedValues(1, 2)]
        public int HumpCount { get; set; }

        public DateTimeOffset? LastFed { get; set; }
    }

    public class CamelCreateDto
    {

        [Required]
        public string Name { get; set; }

        public string? Color { get; set; }

        [AllowedValues(1, 2)]
        public int HumpCount { get; set; }

        public DateTimeOffset? LastFed { get; set; }
    }

    public class CamelUpdateDto
    {
        [Required]
        public string Name { get; set; }

        public string? Color { get; set; }

        [AllowedValues(1, 2)]
        public int HumpCount { get; set; }

        public DateTimeOffset? LastFed { get; set; }
    }
}
