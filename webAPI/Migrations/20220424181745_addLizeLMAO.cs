using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webAPI.Migrations
{
    public partial class addLizeLMAO : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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
                column: "password",
                value: "$2a$11$K8Le8N28YlJg5bMhMU2Gguv4MbDVZuj2bmhbdDKx4K6YJK64ZgZgu");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "avatar", "password" },
                values: new object[] { "https://i.ibb.co/VYbZ60Q/38816802529d.jpg", "$2a$11$VPCxOiTSqfCX/JSgFOisIOIUO5lbt1.f7S8jkHUmUiWttMB39xCDK" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 1,
                column: "dateCreated",
                value: new DateTime(2022, 4, 24, 18, 13, 54, 454, DateTimeKind.Utc).AddTicks(1030));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 1,
                column: "dateCreated",
                value: new DateTime(2022, 4, 24, 18, 13, 54, 454, DateTimeKind.Utc).AddTicks(1010));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 2,
                column: "dateCreated",
                value: new DateTime(2022, 4, 24, 18, 13, 54, 454, DateTimeKind.Utc).AddTicks(1010));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "password",
                value: "$2a$11$zZkmoq1zC5xZ4DCVyZCcpukO4oQgZajJVjgRgRilv.LOv.4676UoW");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "password",
                value: "$2a$11$0YadUh1zvbFOf31LC.REkOg12pECwJUGqzFlQajiIV1xcsrtpobZW");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "password",
                value: "$2a$11$Kj01PljJnUrMEXbZ3Rs/TOTvmeL3o.94WASo/P6dwqaAYPvSC1OaC");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "avatar", "password" },
                values: new object[] { null, "$2a$11$viuIkzeob/Bqu0NzATYLhex9Sr7RxfR5pF/8eFis.z.XqjvkLoJFi" });
        }
    }
}
