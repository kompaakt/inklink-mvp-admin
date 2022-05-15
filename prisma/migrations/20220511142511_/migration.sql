-- CreateEnum
CREATE TYPE "MachineType" AS ENUM ('MACHINE', 'HANDPOKE', 'MACHINE_HANDPOKE');

-- AlterTable
ALTER TABLE "artists" ADD COLUMN     "machineType" "MachineType" NOT NULL DEFAULT E'MACHINE';
