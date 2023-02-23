/*
  Warnings:

  - Made the column `dataInicio` on table `manutencao` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `manutencao` MODIFY `dataInicio` DATETIME(3) NOT NULL;
