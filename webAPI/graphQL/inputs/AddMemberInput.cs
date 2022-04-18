namespace webAPI.graphQL.inputs
{

    public record AddMemberInput(int groupId, int userId, bool? admin);

}