using System.ComponentModel.DataAnnotations;

namespace webAPI.Models.other
{
    public class PostDist
    {
        [Required]
        public Post? post { get; set; }
        [Required]
        public double distance { get; set; }
    }

    public class DistanceOutput
    {
        [Required]
        public bool success { get; set; }
        [Required]
        public string message { get; set; } = string.Empty;
        [Required]
        public List<PostDist> posts { get; set; } = new List<PostDist>();
    }
}