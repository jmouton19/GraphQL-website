using webAPI.data;
using webAPI.Models;
namespace webAPI.graphQL.Login{
public class LoginType : ObjectType<LoginInput>
{
    protected override void Configure(IObjectTypeDescriptor<LoginInput> descriptor)
    {
        descriptor.Description("Allows user to login on Kasie with email and password.");
    }
}
}
