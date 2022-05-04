namespace webAPI.graphQL.inputs
{

    public record AddDistanceInput(double latitude, double longitude, double? radius = null, int? quantity = null, int? groupId = null, bool? timeSort = null);

}