
using System.ComponentModel.DataAnnotations;

namespace CamelBackend.Models
{
    public class Camel
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string? Color { get; set; }

        public int HumpCount { get; set; }

        public DateTimeOffset? LastFed { get; set; }
    }
}
