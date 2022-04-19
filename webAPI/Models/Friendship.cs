using System.ComponentModel.DataAnnotations;

namespace webAPI.Models
{
    public class Friendship
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int senderId { get; set; }


        [Required]
        public int receiverId { get; set; }
        [Required]
        public bool accepted { get; set; } = false;

    }
}