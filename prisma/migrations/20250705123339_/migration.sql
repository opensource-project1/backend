/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `FocusLog` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `FocusLog_userId_date_key` ON `FocusLog`(`userId`, `date`);
