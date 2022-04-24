using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webAPI.Migrations
{
    public partial class addTestDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 1,
                column: "dateCreated",
                value: new DateTime(2022, 4, 24, 17, 41, 18, 450, DateTimeKind.Utc).AddTicks(8262));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 1,
                column: "dateCreated",
                value: new DateTime(2022, 4, 24, 17, 41, 18, 450, DateTimeKind.Utc).AddTicks(8245));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 2,
                column: "dateCreated",
                value: new DateTime(2022, 4, 24, 17, 41, 18, 450, DateTimeKind.Utc).AddTicks(8246));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "password",
                value: "$2a$11$VbWbRU.RtzUW0gcj/sOK3.N5ulMfeViEzXolMjruhqN7s4VflbWjC");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "firstName", "password" },
                values: new object[] { "Jacques", "$2a$11$0VxBpll3EEB5z5RrQfIqhO2rquVuv/aTbbOtfotl0VWPTqhncQmpC" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "password",
                value: "$2a$11$gOZIbyHkeSZ.OeIwAsSZguU0VmkFjrZotnVZODK12pd1AR7gDcsrm");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                column: "password",
                value: "$2a$11$aEUv32F.e.z.uUZWUQp8yOh5Ld00f0u7vDOOfJHvH6WPhSRGb6pSC");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 1,
                column: "dateCreated",
                value: new DateTime(2022, 4, 24, 15, 4, 49, 936, DateTimeKind.Utc).AddTicks(8274));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 1,
                column: "dateCreated",
                value: new DateTime(2022, 4, 24, 15, 4, 49, 936, DateTimeKind.Utc).AddTicks(8257));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 2,
                column: "dateCreated",
                value: new DateTime(2022, 4, 24, 15, 4, 49, 936, DateTimeKind.Utc).AddTicks(8259));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "password",
                value: "$2a$11$6XORnBVc.2RcL9087E1t/.qdI8TOkNpiE/3KxqMM0bJLgaAEEq82S");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "firstName", "password" },
                values: new object[] { "JC", "$2a$11$ONadLrWuCT1RwBJxqPjgR.Fn7MWWYt1YwIZAakhoAC5wFQAk8B35W" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "password",
                value: "$2a$11$dXlQ/HrlRcIFaTf.9jF3se1CpUZ8r5lHfrbJ4mQ9hFKyWa497Sn82");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                column: "password",
                value: "$2a$11$of2TYY2ED4mfhhB0AZfHW.YosQdCNwaJf/Di/DJYgiT/RX5TNLdw2");
        }
    }
}
