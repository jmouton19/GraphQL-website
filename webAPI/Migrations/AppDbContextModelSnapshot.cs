﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using webAPI.data;

#nullable disable

namespace webAPI.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.HasPostgresExtension(modelBuilder, "postgis");
            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("webAPI.Models.Comment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("body")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("dateCreated")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("memberId")
                        .HasColumnType("integer");

                    b.Property<int>("postId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("memberId");

                    b.HasIndex("postId");

                    b.ToTable("Comment");
                });

            modelBuilder.Entity("webAPI.Models.Group", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("avatar")
                        .HasColumnType("text");

                    b.Property<DateOnly>("dateCreated")
                        .HasColumnType("date");

                    b.Property<string>("description")
                        .HasColumnType("text");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("ownerId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ownerId");

                    b.ToTable("Groups");
                });

            modelBuilder.Entity("webAPI.Models.Membership", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<bool?>("admin")
                        .HasColumnType("boolean");

                    b.Property<int>("groupId")
                        .HasColumnType("integer");

                    b.Property<int>("userId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("groupId");

                    b.HasIndex("userId");

                    b.ToTable("Memberships");
                });

            modelBuilder.Entity("webAPI.Models.Post", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("body")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("creatorId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("dateCreated")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("postType")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("creatorId");

                    b.ToTable("Post");
                });

            modelBuilder.Entity("webAPI.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateOnly?>("DOB")
                        .HasColumnType("date");

                    b.Property<string>("avatar")
                        .HasColumnType("text");

                    b.Property<string>("email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("firstName")
                        .HasColumnType("text");

                    b.Property<string>("lastName")
                        .HasColumnType("text");

                    b.Property<string>("password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            DOB = new DateOnly(1943, 11, 23),
                            email = "nicolvisser@yahoo.com",
                            firstName = "Nicol",
                            lastName = "Visser",
                            password = "1234",
                            username = "VisserMan"
                        });
                });

            modelBuilder.Entity("webAPI.Models.Comment", b =>
                {
                    b.HasOne("webAPI.Models.Membership", "member")
                        .WithMany("comments")
                        .HasForeignKey("memberId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("webAPI.Models.Post", "post")
                        .WithMany("comments")
                        .HasForeignKey("postId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("member");

                    b.Navigation("post");
                });

            modelBuilder.Entity("webAPI.Models.Group", b =>
                {
                    b.HasOne("webAPI.Models.User", "owner")
                        .WithMany("groups")
                        .HasForeignKey("ownerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("owner");
                });

            modelBuilder.Entity("webAPI.Models.Membership", b =>
                {
                    b.HasOne("webAPI.Models.Group", "group")
                        .WithMany("memberships")
                        .HasForeignKey("groupId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("webAPI.Models.User", "user")
                        .WithMany("memberships")
                        .HasForeignKey("userId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("group");

                    b.Navigation("user");
                });

            modelBuilder.Entity("webAPI.Models.Post", b =>
                {
                    b.HasOne("webAPI.Models.Membership", "creator")
                        .WithMany("posts")
                        .HasForeignKey("creatorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("creator");
                });

            modelBuilder.Entity("webAPI.Models.Group", b =>
                {
                    b.Navigation("memberships");
                });

            modelBuilder.Entity("webAPI.Models.Membership", b =>
                {
                    b.Navigation("comments");

                    b.Navigation("posts");
                });

            modelBuilder.Entity("webAPI.Models.Post", b =>
                {
                    b.Navigation("comments");
                });

            modelBuilder.Entity("webAPI.Models.User", b =>
                {
                    b.Navigation("groups");

                    b.Navigation("memberships");
                });
#pragma warning restore 612, 618
        }
    }
}
