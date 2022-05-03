using System.ComponentModel.DataAnnotations;

namespace webAPI.Models
{
    [GraphQLDescription("Represents a comment made by a member on a post.")]
    public class Comment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int creatorId { get; set; }
        [Required]
        [GraphQLDescription("Specifies which USER made the comment.")]
        public User? creator { get; set; }

        [Required]
        [GraphQLDescription("Specifies on which post the comment was made.")]
        public Post? post { get; set; }
        [Required]
        public int postId { get; set; }
        [Required]
        public DateTime dateCreated { get; set; }
        [Required]
        [GraphQLDescription("Text body of the comment.")]
        public string? body { get; set; }
    }
}