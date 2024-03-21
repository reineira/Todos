/*
  Warnings:

  - Added the required column `deadline` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "deadline" DATE NOT NULL,
ADD COLUMN     "title" VARCHAR(255) NOT NULL;
