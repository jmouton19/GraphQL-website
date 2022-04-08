using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webAPI.Models
{
    [GraphQLDescription("Represents a connection between a group and a user.")]
    public class Membership{
        [Key]
        public int Id { get; set; }
        [Required]
        [GraphQLDescription("Group the member is part of.")]
        public Group ?group { get; set; }
        [Required]
        [GraphQLDescription("User connected to the membership.")]
        public User ?user { get; set; }
        [GraphQLDescription("Specifies whether this member is an admin of the connected group.")]
        public Boolean ?admin { get; set; }
        [GraphQLDescription("Posts made by this member.")]
        public List<Post> ?posts { get; set; }
        [GraphQLDescription("Comments made by this member.")]
        public List<Comment> ?comments { get; set; }
    }
}