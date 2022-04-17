FROM mcr.microsoft.com/dotnet/sdk:6.0 AS dotnet-build
WORKDIR /source
COPY ./webAPI /source
RUN dotnet restore "webAPI.csproj" 
RUN dotnet publish "webAPI.csproj" -c Release -o /app/build

FROM dotnet-build AS dotnet-publish
RUN dotnet publish "webAPI.csproj" -c Release -o /app/publish

FROM node AS node-builder
WORKDIR /node
COPY ./client /node
RUN npm install
RUN npm run-script build


FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app
EXPOSE 5050
RUN mkdir /app/wwwroot
COPY --from=dotnet-publish /app/publish .
COPY --from=node-builder /node/build ./wwwroot
ENTRYPOINT [ "dotnet","webAPI.dll" ]