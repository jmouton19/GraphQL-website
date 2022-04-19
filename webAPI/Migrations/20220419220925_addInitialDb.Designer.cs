﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using webAPI.data;

#nullable disable

namespace webAPI.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20220419220925_addInitialDb")]
    partial class addInitialDb
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

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

                    b.Property<int>("creatorId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("dateCreated")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("postId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("creatorId");

                    b.HasIndex("postId");

                    b.ToTable("Comments");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            body = "i also like pengins",
                            creatorId = 2,
                            dateCreated = new DateTime(2022, 4, 19, 22, 9, 25, 109, DateTimeKind.Utc).AddTicks(3340),
                            postId = 1
                        });
                });

            modelBuilder.Entity("webAPI.Models.Friendship", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<bool>("accepted")
                        .HasColumnType("boolean");

                    b.Property<int>("receiverId")
                        .HasColumnType("integer");

                    b.Property<int>("senderId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("receiverId");

                    b.HasIndex("senderId");

                    b.ToTable("Friendships");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            accepted = false,
                            receiverId = 2,
                            senderId = 1
                        },
                        new
                        {
                            Id = 2,
                            accepted = true,
                            receiverId = 4,
                            senderId = 3
                        });
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

                    b.HasData(
                        new
                        {
                            Id = 1,
                            dateCreated = new DateOnly(1947, 11, 3),
                            description = "Chess group for nerds",
                            name = "Nicol's Chess Club",
                            ownerId = 1
                        },
                        new
                        {
                            Id = 2,
                            dateCreated = new DateOnly(1969, 11, 3),
                            description = "Hit ball with stick",
                            name = "Maties Hockey",
                            ownerId = 4
                        });
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

                    b.HasData(
                        new
                        {
                            Id = 1,
                            admin = true,
                            groupId = 1,
                            userId = 1
                        },
                        new
                        {
                            Id = 2,
                            admin = true,
                            groupId = 2,
                            userId = 4
                        },
                        new
                        {
                            Id = 3,
                            admin = false,
                            groupId = 1,
                            userId = 2
                        });
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

                    b.Property<double>("latitude")
                        .HasColumnType("double precision");

                    b.Property<double>("longitude")
                        .HasColumnType("double precision");

                    b.Property<bool>("video")
                        .HasColumnType("boolean");

                    b.HasKey("Id");

                    b.HasIndex("creatorId");

                    b.ToTable("Posts");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            body = "I like penguins",
                            creatorId = 1,
                            dateCreated = new DateTime(2022, 4, 19, 22, 9, 25, 109, DateTimeKind.Utc).AddTicks(3317),
                            latitude = 29.653700000000001,
                            longitude = 79.948599999999999,
                            video = false
                        },
                        new
                        {
                            Id = 2,
                            body = "insert some penguin video link here",
                            creatorId = 2,
                            dateCreated = new DateTime(2022, 4, 19, 22, 9, 25, 109, DateTimeKind.Utc).AddTicks(3319),
                            latitude = 82.862799999999993,
                            longitude = 135.0,
                            video = true
                        });
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

                    b.HasIndex("email")
                        .IsUnique();

                    b.HasIndex("username")
                        .IsUnique();

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            DOB = new DateOnly(1943, 11, 23),
                            email = "nicolvisser@yahoo.com",
                            firstName = "Nicol",
                            lastName = "Visser",
                            password = "$2a$11$HasxdUQ6dQwamlSzkcQC6.HOvCSQa5GgC0i7G64bCQNFHbjL41V/S",
                            username = "VisserMan"
                        },
                        new
                        {
                            Id = 2,
                            DOB = new DateOnly(2000, 6, 3),
                            email = "jcmouton@protonmail.com",
                            firstName = "JC",
                            lastName = "Mouton",
                            password = "$2a$11$8V6yAvXy9krx8w4gLQZobe9cDpKez/zPztnN.UygyToPnuEXOVvje",
                            username = "JaySea"
                        },
                        new
                        {
                            Id = 3,
                            DOB = new DateOnly(2000, 11, 23),
                            email = "philler@gmail.com",
                            firstName = "Philip",
                            lastName = "Schommarz",
                            password = "$2a$11$Cs8N28ioUWJNMY8v33ztHem8rCU5ysaY/rvnA.BX8taF4XduzIVAK",
                            username = "Fillet"
                        },
                        new
                        {
                            Id = 4,
                            DOB = new DateOnly(200, 3, 11),
                            email = "mssteyn@rocketmail.com",
                            firstName = "Lize",
                            lastName = "Steyn",
                            password = "$2a$11$VL29tc65BEcsE4A7EUcYIuOzbiMZTXMZJ4lvFGMf9BrbP6MJcUmei",
                            username = "MorneSteyn"
                        });
                });

            modelBuilder.Entity("webAPI.Models.Comment", b =>
                {
                    b.HasOne("webAPI.Models.Membership", "creator")
                        .WithMany("comments")
                        .HasForeignKey("creatorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("webAPI.Models.Post", "post")
                        .WithMany("comments")
                        .HasForeignKey("postId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("creator");

                    b.Navigation("post");
                });

            modelBuilder.Entity("webAPI.Models.Friendship", b =>
                {
                    b.HasOne("webAPI.Models.User", "receiver")
                        .WithMany("FriendshipsReceived")
                        .HasForeignKey("receiverId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("webAPI.Models.User", "sender")
                        .WithMany("FriendshipsSent")
                        .HasForeignKey("senderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("receiver");

                    b.Navigation("sender");
                });

            modelBuilder.Entity("webAPI.Models.Group", b =>
                {
                    b.HasOne("webAPI.Models.User", "owner")
                        .WithMany("OwnedGroups")
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
                    b.Navigation("FriendshipsReceived");

                    b.Navigation("FriendshipsSent");

                    b.Navigation("OwnedGroups");

                    b.Navigation("memberships");
                });
#pragma warning restore 612, 618
        }
    }
}