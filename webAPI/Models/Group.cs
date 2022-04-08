using System.ComponentModel.DataAnnotations;
namespace webAPI.Models
{
    public class Group{
        [Key]
        public int Id { get; set; }
        [Required]
        public User ?owner { get; set; }
        [Required]
        public string name { get; set; } = string.Empty;
        [Required]
        public DateOnly dateCreated { get; set; }
        public string ?avatar { get; set; }
        public string ?description { get; set; }
        public List<Membership> ?memberships { get; set; }
    }
}