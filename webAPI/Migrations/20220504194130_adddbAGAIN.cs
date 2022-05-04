using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace webAPI.Migrations
{
    public partial class adddbAGAIN : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    email = table.Column<string>(type: "text", nullable: false),
                    username = table.Column<string>(type: "text", nullable: false),
                    firstName = table.Column<string>(type: "text", nullable: true),
                    lastName = table.Column<string>(type: "text", nullable: true),
                    DOB = table.Column<DateOnly>(type: "date", nullable: true),
                    avatar = table.Column<string>(type: "text", nullable: true),
                    password = table.Column<string>(type: "text", nullable: false),
                    validated = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Friendships",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    senderId = table.Column<int>(type: "integer", nullable: false),
                    receiverId = table.Column<int>(type: "integer", nullable: false),
                    accepted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Friendships", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Friendships_Users_receiverId",
                        column: x => x.receiverId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Friendships_Users_senderId",
                        column: x => x.senderId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Groups",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ownerId = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    dateCreated = table.Column<DateOnly>(type: "date", nullable: false),
                    avatar = table.Column<string>(type: "text", nullable: true),
                    description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Groups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Groups_Users_ownerId",
                        column: x => x.ownerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Memberships",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    groupId = table.Column<int>(type: "integer", nullable: true),
                    userId = table.Column<int>(type: "integer", nullable: false),
                    admin = table.Column<bool>(type: "boolean", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Memberships", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Memberships_Groups_groupId",
                        column: x => x.groupId,
                        principalTable: "Groups",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Memberships_Users_userId",
                        column: x => x.userId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    creatorId = table.Column<int>(type: "integer", nullable: false),
                    video = table.Column<bool>(type: "boolean", nullable: false),
                    dateCreated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    body = table.Column<string>(type: "text", nullable: false),
                    latitude = table.Column<double>(type: "double precision", nullable: false),
                    longitude = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Posts_Memberships_creatorId",
                        column: x => x.creatorId,
                        principalTable: "Memberships",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    creatorId = table.Column<int>(type: "integer", nullable: false),
                    postId = table.Column<int>(type: "integer", nullable: false),
                    dateCreated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    body = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comments_Posts_postId",
                        column: x => x.postId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Comments_Users_creatorId",
                        column: x => x.creatorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "DOB", "avatar", "email", "firstName", "lastName", "password", "username", "validated" },
                values: new object[,]
                {
                    { 1, new DateOnly(1943, 11, 23), "https://i.ibb.co/hm99dG4/20d9de001ebe.png", "nicolvisser@yahoo.com", "Nicol", "Visser", "$2a$11$WiLkFUgHz1QGGNPzRWfjFunm6QKI5TihEqoI5Lq4QxCKU8XBbb0cO", "VisserMan", true },
                    { 2, new DateOnly(2000, 6, 3), "https://i.ibb.co/SBLGDZW/jc.png", "jcmouton@protonmail.com", "Jacques", "Mouton", "$2a$11$xcs39XLd.2y9Gre5Wvopdux.O3cOWh9XbAuGdfaQV/nS4E36Vy7dG", "JaySea", true },
                    { 3, new DateOnly(2000, 11, 23), "https://i.ibb.co/jg3970L/76cb8121601e.png", "philler@gmail.com", "Philip", "Schommarz", "$2a$11$y3kvImnsBrCyf9vS2xnec./pkkijFFiQ3cUcYKEjfKgjEqC/Qg7te", "Fillet", true },
                    { 4, new DateOnly(2000, 3, 11), "https://i.ibb.co/VYbZ60Q/38816802529d.jpg", "mssteyn@rocketmail.com", "Lize", "Steyn", "$2a$11$.19ogrZWSqMtN9biYuIko.F7g4lsCVm5QrRw5yDqZtxyTe1aBOCom", "MorneSteyn", true },
                    { 5, new DateOnly(2000, 1, 3), "https://i.ibb.co/3cfRt6n/Image.png", "eduanuys@gmail.com", "Eduan", "Uys", "$2a$11$MrSgB5erS32EZCVZ75goZex.I1I4KikfuwKipMO6T9gAwLPsufhyC", "uysbeer", true }
                });

            migrationBuilder.InsertData(
                table: "Friendships",
                columns: new[] { "Id", "accepted", "receiverId", "senderId" },
                values: new object[,]
                {
                    { 1, true, 2, 1 },
                    { 2, true, 1, 4 }
                });

            migrationBuilder.InsertData(
                table: "Groups",
                columns: new[] { "Id", "avatar", "dateCreated", "description", "name", "ownerId" },
                values: new object[,]
                {
                    { 1, "https://i.ibb.co/C61C35f/Screenshot-2022-04-24-at-20-49-25.png", new DateOnly(1947, 11, 3), "Chess group for nerds", "Nicol's Chess Club", 1 },
                    { 2, "https://i.ibb.co/TLCthzM/Screenshot-2022-04-24-at-20-52-57.png", new DateOnly(1969, 11, 3), "Hit ball with stick", "Maties Hockey", 4 }
                });

            migrationBuilder.InsertData(
                table: "Memberships",
                columns: new[] { "Id", "admin", "groupId", "userId" },
                values: new object[,]
                {
                    { 4, null, null, 1 },
                    { 5, null, null, 2 },
                    { 6, null, null, 3 },
                    { 7, null, null, 4 },
                    { 8, null, null, 5 }
                });

            migrationBuilder.InsertData(
                table: "Memberships",
                columns: new[] { "Id", "admin", "groupId", "userId" },
                values: new object[,]
                {
                    { 1, true, 1, 1 },
                    { 2, true, 2, 4 },
                    { 3, true, 1, 2 },
                    { 9, false, 2, 1 }
                });

            migrationBuilder.InsertData(
                table: "Posts",
                columns: new[] { "Id", "body", "creatorId", "dateCreated", "latitude", "longitude", "video" },
                values: new object[,]
                {
                    { 1, "I like penguins", 4, new DateTime(2012, 5, 4, 19, 20, 14, 774, DateTimeKind.Utc), 29.653700000000001, 79.948599999999999, false },
                    { 5, "Nicol is not my friend kek", 5, new DateTime(2016, 5, 4, 19, 20, 14, 774, DateTimeKind.Utc), 8.8628, 15.0, false },
                    { 6, "i love nicol visser", 7, new DateTime(2015, 5, 4, 19, 20, 14, 774, DateTimeKind.Utc), -82.862799999999993, -135.0, false }
                });

            migrationBuilder.InsertData(
                table: "Comments",
                columns: new[] { "Id", "body", "creatorId", "dateCreated", "postId" },
                values: new object[] { 1, "i also like pengins", 2, new DateTime(2014, 5, 4, 19, 20, 14, 774, DateTimeKind.Utc), 1 });

            migrationBuilder.InsertData(
                table: "Posts",
                columns: new[] { "Id", "body", "creatorId", "dateCreated", "latitude", "longitude", "video" },
                values: new object[,]
                {
                    { 2, "u4vuh4i7wb9atdvj11rs", 1, new DateTime(2019, 5, 4, 19, 20, 14, 774, DateTimeKind.Utc), 82.862799999999993, 135.0, true },
                    { 3, "chess is lekker", 1, new DateTime(2018, 5, 4, 19, 20, 14, 774, DateTimeKind.Utc), 2.8628, 35.0, false },
                    { 4, "chess is KAK!", 3, new DateTime(2017, 5, 4, 19, 20, 14, 774, DateTimeKind.Utc), -82.862799999999993, 35.0, false }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Comments_creatorId",
                table: "Comments",
                column: "creatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_postId",
                table: "Comments",
                column: "postId");

            migrationBuilder.CreateIndex(
                name: "IX_Friendships_receiverId",
                table: "Friendships",
                column: "receiverId");

            migrationBuilder.CreateIndex(
                name: "IX_Friendships_senderId",
                table: "Friendships",
                column: "senderId");

            migrationBuilder.CreateIndex(
                name: "IX_Groups_ownerId",
                table: "Groups",
                column: "ownerId");

            migrationBuilder.CreateIndex(
                name: "IX_Memberships_groupId",
                table: "Memberships",
                column: "groupId");

            migrationBuilder.CreateIndex(
                name: "IX_Memberships_userId",
                table: "Memberships",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_creatorId",
                table: "Posts",
                column: "creatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_email",
                table: "Users",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_username",
                table: "Users",
                column: "username",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "Friendships");

            migrationBuilder.DropTable(
                name: "Posts");

            migrationBuilder.DropTable(
                name: "Memberships");

            migrationBuilder.DropTable(
                name: "Groups");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
