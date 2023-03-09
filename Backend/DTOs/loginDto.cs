using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs
{
    public class loginDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
