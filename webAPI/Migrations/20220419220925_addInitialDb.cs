﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace webAPI.Migrations
{
    public partial class addInitialDb : Migration
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
                    password = table.Column<string>(type: "text", nullable: false)
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
                    groupId = table.Column<int>(type: "integer", nullable: false),
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
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                        name: "FK_Comments_Memberships_creatorId",
                        column: x => x.creatorId,
                        principalTable: "Memberships",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Comments_Posts_postId",
                        column: x => x.postId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "DOB", "avatar", "email", "firstName", "lastName", "password", "username" },
                values: new object[,]
                {
                    { 1, new DateOnly(1943, 11, 23), null, "nicolvisser@yahoo.com", "Nicol", "Visser", "$2a$11$HasxdUQ6dQwamlSzkcQC6.HOvCSQa5GgC0i7G64bCQNFHbjL41V/S", "VisserMan" },
                    { 2, new DateOnly(2000, 6, 3), null, "jcmouton@protonmail.com", "JC", "Mouton", "$2a$11$8V6yAvXy9krx8w4gLQZobe9cDpKez/zPztnN.UygyToPnuEXOVvje", "JaySea" },
                    { 3, new DateOnly(2000, 11, 23), null, "philler@gmail.com", "Philip", "Schommarz", "$2a$11$Cs8N28ioUWJNMY8v33ztHem8rCU5ysaY/rvnA.BX8taF4XduzIVAK", "Fillet" },
                    { 4, new DateOnly(200, 3, 11), null, "mssteyn@rocketmail.com", "Lize", "Steyn", "$2a$11$VL29tc65BEcsE4A7EUcYIuOzbiMZTXMZJ4lvFGMf9BrbP6MJcUmei", "MorneSteyn" }
                });

            migrationBuilder.InsertData(
                table: "Friendships",
                columns: new[] { "Id", "accepted", "receiverId", "senderId" },
                values: new object[,]
                {
                    { 1, false, 2, 1 },
                    { 2, true, 4, 3 }
                });

            migrationBuilder.InsertData(
                table: "Groups",
                columns: new[] { "Id", "avatar", "dateCreated", "description", "name", "ownerId" },
                values: new object[,]
                {
                    { 1, null, new DateOnly(1947, 11, 3), "Chess group for nerds", "Nicol's Chess Club", 1 },
                    { 2, null, new DateOnly(1969, 11, 3), "Hit ball with stick", "Maties Hockey", 4 }
                });

            migrationBuilder.InsertData(
                table: "Memberships",
                columns: new[] { "Id", "admin", "groupId", "userId" },
                values: new object[,]
                {
                    { 1, true, 1, 1 },
                    { 2, true, 2, 4 },
                    { 3, false, 1, 2 }
                });

            migrationBuilder.InsertData(
                table: "Posts",
                columns: new[] { "Id", "body", "creatorId", "dateCreated", "latitude", "longitude", "video" },
                values: new object[,]
                {
                    { 1, "I like penguins", 1, new DateTime(2022, 4, 19, 22, 9, 25, 109, DateTimeKind.Utc).AddTicks(3317), 29.653700000000001, 79.948599999999999, false },
                    { 2, "insert some penguin video link here", 2, new DateTime(2022, 4, 19, 22, 9, 25, 109, DateTimeKind.Utc).AddTicks(3319), 82.862799999999993, 135.0, true }
                });

            migrationBuilder.InsertData(
                table: "Comments",
                columns: new[] { "Id", "body", "creatorId", "dateCreated", "postId" },
                values: new object[] { 1, "i also like pengins", 2, new DateTime(2022, 4, 19, 22, 9, 25, 109, DateTimeKind.Utc).AddTicks(3340), 1 });

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