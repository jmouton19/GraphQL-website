using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webAPI.Models
{
    public class Membership{
        [Key]
        public int Id { get; set; }
        [Required]
        public Group ?group { get; set; }
        [Required]
        public User ?user { get; set; }
        public Boolean ?admin { get; set; }
        public List<Post> ?posts { get; set; }
        public List<Comment> ?comments { get; set; }
    }
}