namespace webAPI.graphQL.inputs
{

    public record AddCommentInput(DateTime dateCreated, string body, int creatorId, int postId);

}