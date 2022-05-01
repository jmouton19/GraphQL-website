namespace webAPI.graphQL.inputs
{
    public record UpdateGroupInput(int? groupId, string? description, string? name, string? avatar);

}