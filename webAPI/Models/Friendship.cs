using System.ComponentModel.DataAnnotations;

namespace webAPI.Models
{
    public class Friendship
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int userId1 { get; set; }


        [Required]
        public int userId2 { get; set; }

    }
}