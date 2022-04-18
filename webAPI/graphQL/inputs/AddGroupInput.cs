namespace webAPI.graphQL.inputs
{

    public record AddGroupInput(string name, DateOnly dateCreated, string? avatar, string? description, int ownerId);

}