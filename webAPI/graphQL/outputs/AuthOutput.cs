using webAPI.Models;

namespace webAPI.graphQL.outputs
{
  public class AuthOutput
  {
    public bool success { get; set; }
    public string? message { get; set; }
    public User? user { get; set; }
    public string? jwt { get; set; }
  }
}
