using System.ComponentModel.DataAnnotations;
namespace webAPI.Models
{
    [GraphQLDescription("Represents a group on Kasie.")]
    public class Group{
        [Key]
        public int Id { get; set; }
        [Required]
        public User ?owner { get; set; }
        [Required]
        public string name { get; set; } = string.Empty;
        [Required]
        public DateOnly dateCreated { get; set; }
        [GraphQLDescription("Link of groups profile avatar.")]
        public string ?avatar { get; set; }
        public string ?description { get; set; }
        [GraphQLDescription("Members of the group.")]
        public List<Membership> ?memberships { get; set; }
    }
}