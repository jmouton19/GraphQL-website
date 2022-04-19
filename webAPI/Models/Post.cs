using System.ComponentModel.DataAnnotations;

namespace webAPI.Models
{
    [GraphQLDescription("Represents a post made by a member of Kasie.")]
    public class Post
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int creatorId { get; set; }
        [Required]
        [GraphQLDescription("Member who created the post.")]
        public Membership? creator { get; set; }

        [Required]
        [GraphQLDescription("Specifies the type of post. Video or text.")]
        public bool video { get; set; }
        [Required]
        public DateTime dateCreated { get; set; }
        [Required]
        [GraphQLDescription("Body of post. Either text or video link. Depends on postType.")]
        public string body { get; set; } = string.Empty;
        [Required]
        [GraphQLDescription("Latitude coordiante of where the post was made.")]
        public float latitude { get; set; }
        [Required]
        [GraphQLDescription("Longitude coordiante of where the post was made.")]
        public float longitude { get; set; }
        [GraphQLDescription("Comments made on the post.")]
        public List<Comment>? comments { get; set; }
    }
}