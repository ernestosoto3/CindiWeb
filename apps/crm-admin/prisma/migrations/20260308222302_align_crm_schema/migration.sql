/*
  Warnings:

  - The values [IN_PROGRESS,LAUNCHED,ON_HOLD] on the enum `ProjectStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `company_name` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `contact_info` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `billed_amount` on the `maintenance_requests` table. All the data in the column will be lost.
  - You are about to drop the column `completion_date` on the `maintenance_requests` table. All the data in the column will be lost.
  - You are about to drop the column `project_id` on the `maintenance_requests` table. All the data in the column will be lost.
  - You are about to drop the column `care_plan` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `client_id` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `production_url` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `renewal_date` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `repo_path` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `template_type` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `client_id` on the `touchpoints` table. All the data in the column will be lost.
  - You are about to drop the column `contact_date` on the `touchpoints` table. All the data in the column will be lost.
  - You are about to drop the column `followup_date` on the `touchpoints` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `maintenance_requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `templateType` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `touchpoints` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactDate` to the `touchpoints` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `method` on the `touchpoints` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ContactMethod" AS ENUM ('EMAIL', 'DM', 'CALL');

-- AlterEnum
BEGIN;
CREATE TYPE "ProjectStatus_new" AS ENUM ('ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED');
ALTER TABLE "projects" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "projects" ALTER COLUMN "status" TYPE "ProjectStatus_new" USING ("status"::text::"ProjectStatus_new");
ALTER TYPE "ProjectStatus" RENAME TO "ProjectStatus_old";
ALTER TYPE "ProjectStatus_new" RENAME TO "ProjectStatus";
DROP TYPE "ProjectStatus_old";
ALTER TABLE "projects" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- DropForeignKey
ALTER TABLE "maintenance_requests" DROP CONSTRAINT "maintenance_requests_project_id_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_client_id_fkey";

-- DropForeignKey
ALTER TABLE "touchpoints" DROP CONSTRAINT "touchpoints_client_id_fkey";

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "company_name",
DROP COLUMN "contact_info",
DROP COLUMN "created_at",
ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "contactInfo" JSONB,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "maintenance_requests" DROP COLUMN "billed_amount",
DROP COLUMN "completion_date",
DROP COLUMN "project_id",
ADD COLUMN     "billedAmount" DECIMAL(10,2),
ADD COLUMN     "completionDate" TIMESTAMP(3),
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "projectId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "care_plan",
DROP COLUMN "client_id",
DROP COLUMN "created_at",
DROP COLUMN "production_url",
DROP COLUMN "renewal_date",
DROP COLUMN "repo_path",
DROP COLUMN "template_type",
ADD COLUMN     "carePlan" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "clientId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "productionUrl" TEXT,
ADD COLUMN     "renewalDate" TIMESTAMP(3),
ADD COLUMN     "repoPath" TEXT,
ADD COLUMN     "templateType" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "touchpoints" DROP COLUMN "client_id",
DROP COLUMN "contact_date",
DROP COLUMN "followup_date",
ADD COLUMN     "clientId" TEXT NOT NULL,
ADD COLUMN     "contactDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "followupDate" TIMESTAMP(3),
DROP COLUMN "method",
ADD COLUMN     "method" "ContactMethod" NOT NULL;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "touchpoints" ADD CONSTRAINT "touchpoints_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_requests" ADD CONSTRAINT "maintenance_requests_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
