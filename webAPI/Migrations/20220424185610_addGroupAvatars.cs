using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webAPI.Migrations
{
    public partial class addGroupAvatars : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 1,
                column: "dateCreated",
                value: new DateTime(2022, 4, 24, 18, 56, 9, 886, DateTimeKind.Utc).AddTicks(5480));

            migrationBuilder.UpdateData(
                table: "Groups",
                keyColumn: "Id",
                keyValue: 1,
                column: "avatar",
                value: "https://i.ibb.co/C61C35f/Screenshot-2022-04-24-at-20-49-25.png");

            migrationBuilder.UpdateData(
                table: "Groups",
                keyColumn: "Id",
                keyValue: 2,
                column: "avatar",
                value: "https://i.ibb.co/TLCthzM/Screenshot-2022-04-24-at-20-52-57.png");

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 1,
                column: "dateCreated",
                value: new DateTime(2022, 4, 24, 18, 56, 9, 886, DateTimeKind.Utc).AddTicks(5460));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 2,
                column: "dateCreated",
                value: new DateTime(2022, 4, 24, 18, 56, 9, 886, DateTimeKind.Utc).AddTicks(5460));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "password",
                value: "$2a$11$gvWjOjF41WdrV1gc05cL5eKUUgb5VVs7Mr4T49/YuwVz.8R7M0GXC");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "password",
                value: "$2a$11$yAOOLqPQU7szmdbhLN1g6uvi9jm/R4AKCXListowmOdas4MFCer/W");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "password",
                value: "$2a$11$LdeAoZVK.qhN6XxOSgXZ9u1K8yYEYWyfN3IfgV/qwQC2l0aTw2hR2");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                column: "password",
                value: "$2a$11$4nuKqcanSSPm/dnYeqlhHu9wi1jkq5xMp1GkZAULexnruO.ubQs.m");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 1,
                column: "dateCreated",
                value: new DateTime(2022, 4, 24, 18, 27, 20, 721, DateTimeKind.Utc).AddTicks(1410));

            migrationBuilder.UpdateData(
                table: "Groups",
                keyColumn: "Id",
                keyValue: 1,
                column: "avatar",
                value: null);

            migrationBuilder.UpdateData(
                table: "Groups",
                keyColumn: "Id",
                keyValue: 2,
                column: "avatar",
                value: null);

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
                column: "password",
                value: "$2a$11$yd8M3aOx3ZVY/M5DzfbOteFJ5KzKTj2VOl2SkSdityLceHczv6M72");

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
                column: "password",
                value: "$2a$11$osGFyf/1eUs7igBbCArp5uSHdwm0D1Tm1hOVVInqhjbJE6KeMhY9G");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                column: "password",
                value: "$2a$11$bY3rOVtEfVhFA2pUZl99WeII.c/ujHtBROwTN.WDQ5jo41Kb9X2z2");
        }
    }
}
