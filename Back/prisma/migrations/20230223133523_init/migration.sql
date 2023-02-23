/*
  Warnings:

  - Made the column `dataSaida` on table `operacao` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `operacao` MODIFY `dataSaida` DATETIME(3) NOT NULL;
