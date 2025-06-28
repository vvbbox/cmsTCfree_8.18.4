# См. статью по ссылке https://aka.ms/customizecontainer, чтобы узнать как настроить контейнер отладки и как Visual Studio использует этот Dockerfile для создания образов для ускорения отладки.

# Этот этап используется при запуске из VS в быстром режиме (по умолчанию для конфигурации отладки)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080


# Этот этап используется для сборки проекта службы
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS with-node
RUN apt-get update
RUN apt-get install curl
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash
RUN apt-get -y install nodejs


FROM with-node AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["cmsTC.Server/cmsTC.Server.csproj", "cmsTC.Server/"]
COPY ["cmstc.client/cmstc.client.esproj", "cmstc.client/"]
RUN dotnet restore "./cmsTC.Server/cmsTC.Server.csproj"
COPY . .
WORKDIR "/src/cmsTC.Server"
RUN dotnet build "./cmsTC.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Этот этап используется для публикации проекта службы, который будет скопирован на последний этап
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./cmsTC.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Этот этап используется в рабочей среде или при запуске из VS в обычном режиме (по умолчанию, когда конфигурация отладки не используется)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
RUN mkdir /app/dbase 
RUN chmod -R 755 /app/dbase
VOLUME ["/app/dbase"]
#COPY --from=build --chmod=777 /src/cmsTC.Server/dbase/*.db dbase/
COPY /cmsTC.Server/dbase/*.db dbase/
ENTRYPOINT ["dotnet", "cmsTC.Server.dll"]
