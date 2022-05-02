namespace webAPI.graphQL.inputs
{

    public record AddDistanceInput(double latitude, double longitude, double? radius = null);

}