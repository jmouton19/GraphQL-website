namespace webAPI.graphQL.inputs
{
    public record AddUserInput(string email, string username, string? firstName, string? lastName, DateOnly? DOB, string? avatar, string password);

}