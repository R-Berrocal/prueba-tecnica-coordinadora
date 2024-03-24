CREATE DATABASE IF NOT EXISTS "events-db";

DROP TABLE IF EXISTS "public"."user";
DROP TABLE IF EXISTS "public"."event";
DROP TABLE IF EXISTS "public"."event_registrations";

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

INSERT INTO "public"."user" ("id","name","email","password","condition","createdAt","updatedAt") VALUES 
('02b8b305-6104-4df3-96f7-be040f24798d','Roberto Berrocal','test@test.com','$2a$10$q9L2KBFv6/9LRlGhpMqQfuwvxh6jc5tGHZAeiGi2G5nxnX.t0A7YC','TRUE','2024-03-22 22:45:55.121+00','2024-03-23 14:24:24.414+00');


CREATE TABLE "public"."event" (
    "id" uuid NOT NULL,
    "title" varchar NOT NULL,
    "description" text,
    "location" varchar,
    "startDateTime" timestamptz NOT NULL,
    "endDateTime" timestamptz,
    "organizerId" uuid NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    "condition" bool NOT NULL DEFAULT true,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."event" ("id","title","description","location","startDateTime","endDateTime","organizerId","createdAt","updatedAt","condition") VALUES 
('81f0aa5b-bd7c-4cdf-9075-e4b213d58d2a','Primer evento actualizado','Este es un evento genial','En Bogota','2024-03-23 01:29:29.593+00','2024-03-26 01:29:29.593+00','02b8b305-6104-4df3-96f7-be040f24798d','2024-03-23 01:33:47.509+00','2024-03-23 14:22:41.04+00','TRUE');


CREATE TABLE "public"."event_registrations" (
    "id" uuid NOT NULL,
    "userId" uuid NOT NULL,
    "eventId" uuid NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."event_registrations" ("id","userId","eventId","createdAt","updatedAt") VALUES 
('7553b9c0-5639-4768-9681-48c458245c0d','02b8b305-6104-4df3-96f7-be040f24798d','81f0aa5b-bd7c-4cdf-9075-e4b213d58d2a','2024-03-22 22:45:55.121+00','2024-03-23 14:24:24.414+00');
