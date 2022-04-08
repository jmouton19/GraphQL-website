using System.ComponentModel.DataAnnotations;

namespace webAPI.Models
{
    public class Post{
        [Key]
        public int Id { get; set; }
        [Required]
        public Membership ?creator { get; set; }
        [Required]
        public string postType { get; set; } = string.Empty;
        [Required]
        public DateTime dateCreated { get; set; }
        [Required]
        public string body { get; set; } = string.Empty;
        public List<Comment> ?comments { get; set; }
    }
}