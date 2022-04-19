namespace webAPI.graphQL.inputs
{

    public record AddPostInput(DateOnly dateCreated, bool video, string body, int creatorId, float latitude, float longitude);

}