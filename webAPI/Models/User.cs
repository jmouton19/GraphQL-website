using System.ComponentModel.DataAnnotations;

namespace webAPI.Models
{
    public class User{
        [Key]
        public int Id { get; set; }
        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string email { get; set; } = string.Empty;
        [Required]
        public string username { get; set; } = string.Empty;
        public string ?firstName { get; set; }
        public string ?lastName { get; set; }
        public DateTime ?DOB { get; set; }
        public string ?avatar { get; set; }
        [Required]
        public string password { get; set; } = string.Empty;
    }
}