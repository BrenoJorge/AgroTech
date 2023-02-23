/*
  Warnings:

  - Added the required column `idFrota` to the `Operacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `operacao` ADD COLUMN `idFrota` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Operacao` ADD CONSTRAINT `Operacao_idFrota_fkey` FOREIGN KEY (`idFrota`) REFERENCES `Frota`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
