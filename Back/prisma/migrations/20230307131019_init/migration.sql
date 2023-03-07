/*
  Warnings:

  - You are about to drop the column `disponivel` on the `usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `motorista` ADD COLUMN `disponivel` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `disponivel`;
