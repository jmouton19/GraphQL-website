using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webAPI.Migrations
{
    public partial class addMemberShipForEduan : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 1,
                column: "dateCreated",
                value: new DateTime(2022, 4, 24, 19, 17, 6, 714, DateTimeKind.Utc).AddTicks(6960));

            migrationBuilder.InsertData(
                table: "Memberships",
                columns: new[] { "Id", "admin", "groupId", "userId" },
                values: new object[] { 8, null, null, 5 });

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 1,
                column: "dateCreated",
                value: new DateTime(2022, 4, 24, 19, 17, 6, 714, DateTimeKind.Utc).AddTicks(6950));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 2,
                column: "dateCreated",
                value: new DateTime(2022, 4, 24, 19, 17, 6, 714, DateTimeKind.Utc).AddTicks(6950));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "password",
                value: "$2a$11$4p6.3DOYnUYu8AvP6nMbqOk8qru9igoLfN76X5ZC1c7F1jd1OD8ma");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "password",
                value: "$2a$11$1Od4fE.DOFZRaik4y2MjweapzRmXac36s8D.4KhKNEjFZODap33ym");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "password",
                value: "$2a$11$n5lwCyUKppElXNQpq8z2wOZmof1h9x5.swBsjZDP8m5xz/VE9Ye6W");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                column: "password",
                value: "$2a$11$t6z0dMOUl/e.berQidbzpeuxXxfOq5wDTXsWK4Fm6LYI9ct.q9KU.");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5,
                column: "password",
                value: "$2a$11$aTwiI2tEn7lVeiNn0XejV./rVpoFguoeVJ7CgBYHU0T9j76IaB79K");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Memberships",
                keyColumn: "Id",
                keyValue: 8);

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
                column: "password",
                value: "$2a$11$WXo2BpWhYIX4o31jp0h2ReZDL21nS2VWNpEPttDUBlkv0wBaLaJVG");

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

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5,
                column: "password",
                value: "$2a$11$zYUOMsAo20i.atG3WOvQNujB.5UfLnn8FfLLYc74Xptbq1x2m31k.");
        }
    }
}
