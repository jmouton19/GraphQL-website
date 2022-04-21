namespace webAPI.graphQL.inputs
{
    public record UpdateUserInput(int userId, string? email, string? username, string? firstName, string? lastName, DateOnly? DOB, string? avatar, string? oldPassword, string? newPassword);

}