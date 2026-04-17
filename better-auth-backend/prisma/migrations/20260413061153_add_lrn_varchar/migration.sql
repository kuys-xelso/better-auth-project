/*
  Warnings:

  - You are about to alter the column `lrn` on the `students` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(12)`.

*/
-- AlterTable
ALTER TABLE "students" ALTER COLUMN "lrn" SET DATA TYPE VARCHAR(12);
