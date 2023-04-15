-- CreateEnum
CREATE TYPE "Age" AS ENUM ('cub', 'adolescent', 'elderly');

-- CreateEnum
CREATE TYPE "Sizes" AS ENUM ('small', 'medium', 'big');

-- CreateEnum
CREATE TYPE "Independences" AS ENUM ('low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "Types" AS ENUM ('cat', 'dog');

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "age" "Age" NOT NULL,
    "size" "Sizes" NOT NULL,
    "independence" "Independences" NOT NULL,
    "type" "Types" NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);
