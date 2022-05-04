using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Web;
using FluentEmail.Core;
using Microsoft.IdentityModel.Tokens;
using webAPI.data;

namespace webAPI.Models.other
{
#nullable enable
    public class Utilities
    {
        public string getJWT(string inputEmail, string inputPassword, IConfiguration config, AppDbContext context)
        {
            var currentUser = context.Users.Where(u => u.email == inputEmail).FirstOrDefault();

            if (currentUser != null)
            {
                bool verified = BCrypt.Net.BCrypt.Verify(inputPassword, currentUser.password);
                if (verified)
                {
                    var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["tokenSettings:Key"]));
                    var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
                    var claims = new[]{
                        new Claim(ClaimTypes.Sid,currentUser.Id.ToString())
                    };

                    var jwtToken = new JwtSecurityToken(
                        issuer: config["tokenSettings:Issuer"],
                        audience: config["tokenSettings:Audience"],
                        claims,
                        expires: DateTime.Now.AddMinutes(30),
                        signingCredentials: credentials
                    );
                    string token = new JwtSecurityTokenHandler().WriteToken(jwtToken);
                    return token;
                }

            }

            return "false";
        }

        public async Task validationEmailAsync(User addedUser, IConfiguration config, IFluentEmail email)
        {
            string tokenString = addedUser.email + addedUser.username;
            var key = BCrypt.Net.BCrypt.HashPassword(tokenString);
            var uriBuilder = new UriBuilder(config["SMPTsettings:http"], config["SMPTsettings:domain"], Int32.Parse(config["SMPTsettings:port"]), "/confirmEmail");
            var parameters = HttpUtility.ParseQueryString(string.Empty);
            parameters["key"] = key;
            parameters["userId"] = addedUser.Id.ToString();
            uriBuilder.Query = parameters.ToString();
            string urlString = uriBuilder.ToString();
            var emailTemplate =
                        @"<p>Dear @Model.user.username,</p> 
                                <p>Thanks for signing up to Kasie! Please click the link below to activate your account.</p>
                                <p>@Model.url</p>
                                <p>Sincerely,<br>Kasie Team</p>";

            var newEmail = email.To(addedUser.email)
                .Subject($"Thanks for signing up to Kasie {addedUser.username}")
                .UsingTemplate(emailTemplate, new { user = addedUser, url = urlString });

            await newEmail.SendAsync();
        }

    }

}