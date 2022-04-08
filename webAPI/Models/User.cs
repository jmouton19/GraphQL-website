using System.ComponentModel.DataAnnotations;
namespace webAPI.Models
{
    [GraphQLDescription("Represents a user on Kasie.")]
    public class User{
        [Key]
        public int Id { get; set; }
        [Required]
        public string email { get; set; } = string.Empty;
        [Required]
        public string username { get; set; } = string.Empty;
        public string ?firstName { get; set; }
        public string ?lastName { get; set; }
        [GraphQLDescription("User date of birth.")]
        public DateOnly ?DOB { get; set; }
        [GraphQLDescription("Link of users profile avatar.")]
        public string ?avatar { get; set; }
        [Required]
        [GraphQLDescription("Hashed user password.")]
        public string password { get; set; } = string.Empty;
        [GraphQLDescription("Groups this user owns.")]
        public List<Group> ?groups { get; set; }
        [GraphQLDescription("Groups this user is part of, including the groups owned by user.")]
        public List<Membership> ?memberships { get; set; } 
    }
}