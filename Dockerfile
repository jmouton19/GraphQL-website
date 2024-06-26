FROM mcr.microsoft.com/dotnet/sdk:6.0 AS dotnet-build
WORKDIR /source
COPY ./webAPI /source
RUN dotnet restore "webAPI.csproj" 
RUN dotnet publish "webAPI.csproj" -c Release -o /app/build
# RUN dotnet dev-certs https --trust

FROM dotnet-build AS dotnet-publish
RUN dotnet publish "webAPI.csproj" -c Release -o /app/publish

FROM node AS node-builder
WORKDIR /node
COPY ./client /node
RUN npm install
RUN npm run-script build


FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app
RUN mkdir /app/wwwroot
# COPY --from=dotnet-build /root/.dotnet/corefx/cryptography/x509stores/my/* /root/.dotnet/corefx/cryptography/x509stores/my/
COPY --from=dotnet-publish /app/publish .
COPY --from=node-builder /node/build ./wwwroot
# ENTRYPOINT [ "dotnet","webAPI.dll" ]

CMD ASPNETCORE_URLS=http://*:$PORT dotnet webAPI.dll
ENV Logging__Console__FormatterName=