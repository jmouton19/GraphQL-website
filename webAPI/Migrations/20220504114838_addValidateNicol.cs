using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webAPI.Migrations
{
    public partial class addValidateNicol : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 1,
                column: "dateCreated",
                value: new DateTime(2022, 5, 4, 11, 48, 38, 317, DateTimeKind.Utc).AddTicks(8037));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 1,
                column: "dateCreated",
                value: new DateTime(2022, 5, 4, 11, 48, 38, 317, DateTimeKind.Utc).AddTicks(8016));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 2,
                column: "dateCreated",
                value: new DateTime(2022, 5, 4, 11, 48, 38, 317, DateTimeKind.Utc).AddTicks(8018));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "password", "validated" },
                values: new object[] { "$2a$11$/3wMWWwMf.fIvhREng4VUOcqbe3qQtFE8h9/QaVi2lbHn2hCdRJk.", true });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "password",
                value: "$2a$11$TmQ2MzopwmpqkxDDSVuP1.sDIPm4KA.o3eVZ7M9kPcK6cHb5Ag9Be");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "password",
                value: "$2a$11$wnBzltMw3Q04cD04DEdB4eizcXaoeP13110Pn0e1ekAIvfQsbW8Fe");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                column: "password",
                value: "$2a$11$rP0i6PVoVXd7PIxFWIUYz.uq6cgbZwBQhCmMFWW5x3cvs7C8dh51S");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5,
                column: "password",
                value: "$2a$11$Ajkke1usxCA3Zrg1jxUfiu9JENPYWOnDH5ZVHEoe/IKCuamys36MS");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 1,
                column: "dateCreated",
                value: new DateTime(2022, 5, 4, 11, 46, 42, 515, DateTimeKind.Utc).AddTicks(184));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 1,
                column: "dateCreated",
                value: new DateTime(2022, 5, 4, 11, 46, 42, 515, DateTimeKind.Utc).AddTicks(162));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 2,
                column: "dateCreated",
                value: new DateTime(2022, 5, 4, 11, 46, 42, 515, DateTimeKind.Utc).AddTicks(167));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "password", "validated" },
                values: new object[] { "$2a$11$z3tkCT25s35tyozN984PRe4QjnYFVA0WbNJeJc.lbh7lYyTuR0Sja", false });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "password",
                value: "$2a$11$QMOx9Srw5y30RsEnZGHJu..sFsNgvwn7vV6ORjJke9QFrNoBtcjya");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "password",
                value: "$2a$11$9amDYJWysUP0x6SEIX9oouwMkm9jLqg2Sez2/D2TAu7BhJF/kBtLO");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                column: "password",
                value: "$2a$11$48o0ZdPjv9qF7Qx7uXOte.KZppq5rRDk/dyxIzaV0/s8pvpm.6aJu");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5,
                column: "password",
                value: "$2a$11$lBvTs8SXHeT7PGgNxHvtRelXSTRV35MB6sCoHUlBOhNhoQJO10jqm");
        }
    }
}
