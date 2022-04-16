FROM mcr.microsoft.com/dotnet/sdk:6.0 AS dotnet-build
WORKDIR /source
COPY . /source
RUN dotnet restore "./webAPI/webAPI.csproj" -c Release -o /app/build

FROM dotnet-build AS dotnet-publish
RUN dotnet publish "./webAPI/webAPI.csproj" -c Release -o /app/publish

FROM node AS node-builder
WORKDIR /node
COPY ./client /node
RUN npm install
RUN npm build


FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app
RUN mkdir /app/wwwroot
COPY --from=dotnet-publish /app/publish .
COPY --from=node-builder /app/build ./wwwroot
ENTRYPOINT [ "dotnet","webAPI.dll" ]