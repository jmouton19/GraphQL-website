using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webAPI.Migrations
{
    public partial class addPhilletTest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 1,
                column: "dateCreated",
                value: new DateTime(2022, 4, 24, 18, 24, 58, 444, DateTimeKind.Utc).AddTicks(9084));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 1,
                column: "dateCreated",
                value: new DateTime(2022, 4, 24, 18, 24, 58, 444, DateTimeKind.Utc).AddTicks(9061));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 2,
                column: "dateCreated",
                value: new DateTime(2022, 4, 24, 18, 24, 58, 444, DateTimeKind.Utc).AddTicks(9064));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "password",
                value: "$2a$11$tFfOTZrxjdxyWc8d1zuhl.DhDM9RNUv7kIkzZO6q5QrpUK/Ihg4d6");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "password",
                value: "$2a$11$l97wlaE7vaic7QQdEiTkEe5h7hFkbWti7lPAsbbeBb2fVSXgrpYHy");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "password", "username" },
                values: new object[] { "$2a$11$TY/6siBA7I5xW76v1C.lmO6o02zsx2u0UY6q4xK34Gdfg9sxtn9mO", "Filler" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                column: "password",
                value: "$2a$11$wdcbq3RMXXs5insxkCdj3ey0EcOqzHl0lFQbc/x6JWQ7jZMAhoT0.");
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
                column: "password",
                value: "$2a$11$UqWeBxO0Hgug06GGUL6qHehvHavl3oT4aIxxTe.vg/KuUlnfzF7Dy");

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
                columns: new[] { "password", "username" },
                values: new object[] { "$2a$11$K8Le8N28YlJg5bMhMU2Gguv4MbDVZuj2bmhbdDKx4K6YJK64ZgZgu", "Fillet" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                column: "password",
                value: "$2a$11$VPCxOiTSqfCX/JSgFOisIOIUO5lbt1.f7S8jkHUmUiWttMB39xCDK");
        }
    }
}
