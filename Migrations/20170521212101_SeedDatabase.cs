using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Vega.Migrations
{
    public partial class SeedDatabase : Migration
    {
            protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT into Makes (name) VALUES ('Toyota')");
            migrationBuilder.Sql("INSERT into Makes (name) VALUES ('Honda')");
            migrationBuilder.Sql("INSERT into Makes (name) VALUES ('Suzuki')");

            migrationBuilder.Sql("INSERT into Models (name, MakeId) VALUES ('Corolla', (SELECT Id from Makes where name='Toyota'))");
            migrationBuilder.Sql("INSERT into Models (name, MakeId) VALUES ('Crown', (SELECT Id from Makes where name='Toyota'))");
            migrationBuilder.Sql("INSERT into Models (name, MakeId) VALUES ('Prado', (SELECT Id from Makes where name='Toyota'))");

            migrationBuilder.Sql("INSERT into Models (name, MakeId) VALUES ('Civic', (SELECT Id from Makes where name='Honda'))");
            migrationBuilder.Sql("INSERT into Models (name, MakeId) VALUES ('City', (SELECT Id from Makes where name='Honda'))");
            migrationBuilder.Sql("INSERT into Models (name, MakeId) VALUES ('Vroom', (SELECT Id from Makes where name='Honda'))");

            migrationBuilder.Sql("INSERT into Models (name, MakeId) VALUES ('Alto', (SELECT Id from Makes where name='Suzuki'))");
            migrationBuilder.Sql("INSERT into Models (name, MakeId) VALUES ('Swift',(SELECT Id from Makes where name='Suzuki'))");
            migrationBuilder.Sql("INSERT into Models (name, MakeId) VALUES ('FX', (SELECT Id from Makes where name='Suzuki'))");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Delete from Makes");
            migrationBuilder.Sql("Delete from Models");
        }
    }
}
