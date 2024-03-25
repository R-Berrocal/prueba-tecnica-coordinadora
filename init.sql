CREATE DATABASE IF NOT EXISTS "events-db";

DROP TABLE IF EXISTS "public"."user";
DROP TABLE IF EXISTS "public"."event";
DROP TABLE IF EXISTS "public"."event_registrations";
DROP TABLE IF EXISTS "public"."locations";

CREATE TABLE "public"."user" (
    "id" uuid NOT NULL,
    "name" varchar NOT NULL,
    "email" varchar NOT NULL,
    "password" varchar NOT NULL,
    "condition" bool NOT NULL DEFAULT true,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."user" ("id","name","email","password","condition","createdAt","updatedAt") VALUES ('02b8b305-6104-4df3-96f7-be040f24798d','Roberto Berrocal','test@test.com','$2a$10$q9L2KBFv6/9LRlGhpMqQfuwvxh6jc5tGHZAeiGi2G5nxnX.t0A7YC','TRUE','2024-03-22 22:45:55.121+00','2024-03-23 14:24:24.414+00');

CREATE TABLE "public"."event" (
    "id" uuid NOT NULL,
    "title" varchar NOT NULL,
    "description" text,
    "startDateTime" timestamptz NOT NULL,
    "endDateTime" timestamptz,
    "organizerId" uuid NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    "condition" bool NOT NULL DEFAULT true,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."event" ("id","title","description","startDateTime","endDateTime","organizerId","createdAt","updatedAt","condition") VALUES ('ac28eccd-ece3-49a5-b8d0-962bbbb81432','Primer evento','Este es un evento genial','2024-03-23 01:29:29.593+00','2024-03-26 01:29:29.593+00','02b8b305-6104-4df3-96f7-be040f24798d','2024-03-24 18:07:41.485+00','2024-03-24 18:07:41.485+00','TRUE');

CREATE TABLE "public"."event_registrations" (
    "id" uuid NOT NULL,
    "userId" uuid NOT NULL,
    "eventId" uuid NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."event_registrations" ("id","userId","eventId","createdAt","updatedAt") VALUES ('5c53b876-4ade-4bb0-8602-1601488aa4f3','02b8b305-6104-4df3-96f7-be040f24798d','ac28eccd-ece3-49a5-b8d0-962bbbb81432','2024-03-25 02:38:22.987+00','2024-03-25 02:38:22.987+00');

CREATE TABLE "public"."locations" (
    "id" uuid NOT NULL,
    "eventId" uuid NOT NULL,
    "latitude" float8 NOT NULL,
    "longitude" float8 NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."locations" ("id","eventId","latitude","longitude","createdAt","updatedAt") VALUES ('5e044f92-0212-448b-bcfe-aea4ac85bfa4','ac28eccd-ece3-49a5-b8d0-962bbbb81432',4.695014,-74.116591,'2024-03-24 18:07:41.494+00','2024-03-24 18:07:41.494+00');