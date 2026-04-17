/*
  Warnings:

  - A unique constraint covering the columns `[lrn]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lrn` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "students" ADD COLUMN     "lrn" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "students_lrn_key" ON "students"("lrn");
