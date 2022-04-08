using System.ComponentModel.DataAnnotations;
namespace webAPI.Models
{
    public class Comment{
        [Key]
        public int Id { get; set; }
        [Required]
        public Membership ?member { get; set; }
        [Required]
        public Post ?post { get; set; }
        [Required]
        public DateTime dateCreated { get; set; }
        [Required]
        public string ?body { get; set; }
    }
}