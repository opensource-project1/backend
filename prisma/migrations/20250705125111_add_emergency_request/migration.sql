/*
  Warnings:

  - Added the required column `focusId` to the `EmergencyRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `emergencyrequest` ADD COLUMN `focusId` INTEGER NOT NULL;
