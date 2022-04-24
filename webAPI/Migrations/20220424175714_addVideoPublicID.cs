using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webAPI.Migrations
{
    public partial class addVideoPublicID : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 1,
                column: "dateCreated",
                value: new DateTime(2022, 4, 24, 17, 57, 14, 367, DateTimeKind.Utc).AddTicks(1100));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 1,
                column: "dateCreated",
                value: new DateTime(2022, 4, 24, 17, 57, 14, 367, DateTimeKind.Utc).AddTicks(980));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "body", "dateCreated" },
                values: new object[] { "u4vuh4i7wb9atdvj11rs", new DateTime(2022, 4, 24, 17, 57, 14, 367, DateTimeKind.Utc).AddTicks(990) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "password",
                value: "$2a$11$sJTcI9p4JinK3QbZU7eNmu7VJPcuwLL2UNmRDCgq6OSll0oEaf3bu");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "password",
                value: "$2a$11$au8i8Y2IqOypFiJa8FUOTOCvcTdyuBTnr6Q8W1NrUT/LRsEa9FH6i");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "password",
                value: "$2a$11$RbbanG586cXU8ZBhdbOQReygPLunvOksqXbSl/m4F7EllUBO1PZ7W");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "DOB", "password" },
                values: new object[] { new DateOnly(2000, 3, 11), "$2a$11$60BGz8ykH3UuRgXvckwot.ks47B3wn0VS235DJDF3RMoAgP8iqu82" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 1,
                column: "dateCreated",
                value: new DateTime(2022, 4, 19, 22, 9, 25, 109, DateTimeKind.Utc).AddTicks(3340));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 1,
                column: "dateCreated",
                value: new DateTime(2022, 4, 19, 22, 9, 25, 109, DateTimeKind.Utc).AddTicks(3317));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "body", "dateCreated" },
                values: new object[] { "insert some penguin video link here", new DateTime(2022, 4, 19, 22, 9, 25, 109, DateTimeKind.Utc).AddTicks(3319) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "password",
                value: "$2a$11$HasxdUQ6dQwamlSzkcQC6.HOvCSQa5GgC0i7G64bCQNFHbjL41V/S");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "password",
                value: "$2a$11$8V6yAvXy9krx8w4gLQZobe9cDpKez/zPztnN.UygyToPnuEXOVvje");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "password",
                value: "$2a$11$Cs8N28ioUWJNMY8v33ztHem8rCU5ysaY/rvnA.BX8taF4XduzIVAK");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "DOB", "password" },
                values: new object[] { new DateOnly(200, 3, 11), "$2a$11$VL29tc65BEcsE4A7EUcYIuOzbiMZTXMZJ4lvFGMf9BrbP6MJcUmei" });
        }
    }
}
