using System.ComponentModel.DataAnnotations;

namespace webAPI.Models
{
    public class LoginInput
    {
        [Required]
        public string email { get; set; } = string.Empty;
        [Required]
        public string password { get; set; } = string.Empty;
    }
}