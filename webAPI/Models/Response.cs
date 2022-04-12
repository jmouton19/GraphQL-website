using System.ComponentModel.DataAnnotations;

namespace webAPI.Models
{
        public class Response
        {
            [Required]
            public bool success { get; set; }
            [Required]
            public string message { get; set; }= string.Empty;
        }
    }