using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webAPI.Migrations
{
    public partial class addMoreAvatars : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 1,
                column: "dateCreated",
                value: new DateTime(2022, 4, 24, 18, 27, 20, 721, DateTimeKind.Utc).AddTicks(1410));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 1,
                column: "dateCreated",
                value: new DateTime(2022, 4, 24, 18, 27, 20, 721, DateTimeKind.Utc).AddTicks(1390));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 2,
                column: "dateCreated",
                value: new DateTime(2022, 4, 24, 18, 27, 20, 721, DateTimeKind.Utc).AddTicks(1390));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "avatar", "password" },
                values: new object[] { "https://i.ibb.co/hm99dG4/20d9de001ebe.png", "$2a$11$yd8M3aOx3ZVY/M5DzfbOteFJ5KzKTj2VOl2SkSdityLceHczv6M72" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "password",
                value: "$2a$11$mOmzeWLKFrizi7ZwQVZZd.VGwhUaINufQWsoyKToE6zX7qrkCW31e");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "avatar", "password" },
                values: new object[] { "https://i.ibb.co/jg3970L/76cb8121601e.png", "$2a$11$osGFyf/1eUs7igBbCArp5uSHdwm0D1Tm1hOVVInqhjbJE6KeMhY9G" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                column: "password",
                value: "$2a$11$bY3rOVtEfVhFA2pUZl99WeII.c/ujHtBROwTN.WDQ5jo41Kb9X2z2");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 1,
                column: "dateCreated",
                value: new DateTime(2022, 4, 24, 18, 17, 45, 288, DateTimeKind.Utc).AddTicks(9327));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 1,
                column: "dateCreated",
                value: new DateTime(2022, 4, 24, 18, 17, 45, 288, DateTimeKind.Utc).AddTicks(9310));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 2,
                column: "dateCreated",
                value: new DateTime(2022, 4, 24, 18, 17, 45, 288, DateTimeKind.Utc).AddTicks(9311));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "avatar", "password" },
                values: new object[] { null, "$2a$11$UqWeBxO0Hgug06GGUL6qHehvHavl3oT4aIxxTe.vg/KuUlnfzF7Dy" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "password",
                value: "$2a$11$lbfO0Q5XupT1tTBUadtiUeIMmXG9a1w84RkqFHw8UZDpQVDkfab5.");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "avatar", "password" },
                values: new object[] { null, "$2a$11$K8Le8N28YlJg5bMhMU2Gguv4MbDVZuj2bmhbdDKx4K6YJK64ZgZgu" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                column: "password",
                value: "$2a$11$VPCxOiTSqfCX/JSgFOisIOIUO5lbt1.f7S8jkHUmUiWttMB39xCDK");
        }
    }
}
