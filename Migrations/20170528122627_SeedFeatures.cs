using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Vega.Migrations
{
    public partial class SeedFeatures : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT into Features (name) VALUES ('Air Conditioner')");
            migrationBuilder.Sql("INSERT into Features (name) VALUES ('Power Windows')");
            migrationBuilder.Sql("INSERT into Features (name) VALUES ('Automatic')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Delete from Features");
        }
    }
}
