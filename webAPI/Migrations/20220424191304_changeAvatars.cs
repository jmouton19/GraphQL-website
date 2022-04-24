using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webAPI.Migrations
{
    public partial class changeAvatars : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 1,
                column: "dateCreated",
                value: new DateTime(2022, 4, 24, 19, 13, 3, 780, DateTimeKind.Utc).AddTicks(6240));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 1,
                column: "dateCreated",
                value: new DateTime(2022, 4, 24, 19, 13, 3, 780, DateTimeKind.Utc).AddTicks(6230));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 2,
                column: "dateCreated",
                value: new DateTime(2022, 4, 24, 19, 13, 3, 780, DateTimeKind.Utc).AddTicks(6230));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "password",
                value: "$2a$11$x4k1jzhWmt3LzyezZYCiwOhnkcZbCeqkqklkIOlaN.HdAviafYzhC");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "avatar", "password" },
                values: new object[] { "https://i.ibb.co/SBLGDZW/jc.png", "$2a$11$WXo2BpWhYIX4o31jp0h2ReZDL21nS2VWNpEPttDUBlkv0wBaLaJVG" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "password",
                value: "$2a$11$nEfldvFXYFNf.WnfLGd3kOyGxI2mO9CKqCCYFlm7xPKctfptKIWq.");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                column: "password",
                value: "$2a$11$tda7FBjYOLh3bWWyuUO9TeuFt06UTWW5goRDfARibdoDaarDjq6q2");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "DOB", "avatar", "email", "firstName", "lastName", "password", "username" },
                values: new object[] { 5, new DateOnly(2000, 1, 3), "https://i.ibb.co/3cfRt6n/Image.png", "eduanuys@gmail.com", "Eduan", "Uys", "$2a$11$zYUOMsAo20i.atG3WOvQNujB.5UfLnn8FfLLYc74Xptbq1x2m31k.", "uysbeer" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 1,
                column: "dateCreated",
                value: new DateTime(2022, 4, 24, 18, 56, 9, 886, DateTimeKind.Utc).AddTicks(5480));

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
                columns: new[] { "avatar", "password" },
                values: new object[] { "https://i.ibb.co/mtRH6q9/Screenshot-2022-04-24-at-14-50-41.png", "$2a$11$yAOOLqPQU7szmdbhLN1g6uvi9jm/R4AKCXListowmOdas4MFCer/W" });

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
    }
}
