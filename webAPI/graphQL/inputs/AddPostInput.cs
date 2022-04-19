namespace webAPI.graphQL.inputs
{

    public record AddPostInput(DateTime dateCreated, bool video, string body, int creatorId, double latitude, double longitude);

}