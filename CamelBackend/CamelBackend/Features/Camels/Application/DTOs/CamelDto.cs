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

        [Required(ErrorMessage = "Name is required.")]
        [MinLength(2, ErrorMessage = "Name must be at least 2 characters long.")]
        public string Name { get; set; }

        public string? Color { get; set; }

        [AllowedValues(1, 2, ErrorMessage = "Hump Count can be 1 or 2.")]
        public int HumpCount { get; set; }

        public DateTimeOffset? LastFed { get; set; }
    }

    public class CamelUpdateDto
    {
        [Required(ErrorMessage = "Name is required.")]
        [MinLength(2, ErrorMessage = "Name must be at least 2 characters long.")]
        public string Name { get; set; }

        public string? Color { get; set; }

        [AllowedValues(1, 2, ErrorMessage = "Hump Count can be 1 or 2.")]
        public int HumpCount { get; set; }

        public DateTimeOffset? LastFed { get; set; }
    }
}
