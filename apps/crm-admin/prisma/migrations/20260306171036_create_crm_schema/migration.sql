-- CreateEnum
CREATE TYPE "ClientStatus" AS ENUM ('LEAD', 'ACTIVE', 'PAST');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('IN_PROGRESS', 'LAUNCHED', 'ON_HOLD', 'CANCELLED');

-- CreateEnum
CREATE TYPE "MaintenanceType" AS ENUM ('NORMAL', 'EMERGENCY');

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company_name" TEXT,
    "industry" TEXT,
    "status" "ClientStatus" NOT NULL DEFAULT 'LEAD',
    "contact_info" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "template_type" TEXT,
    "repo_path" TEXT,
    "production_url" TEXT,
    "care_plan" BOOLEAN NOT NULL DEFAULT false,
    "renewal_date" TIMESTAMP(3),
    "status" "ProjectStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "touchpoints" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "contact_date" TIMESTAMP(3) NOT NULL,
    "followup_date" TIMESTAMP(3),
    "method" TEXT NOT NULL,
    "outcome" TEXT,

    CONSTRAINT "touchpoints_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance_requests" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "type" "MaintenanceType" NOT NULL,
    "hours" DOUBLE PRECISION,
    "billed_amount" DECIMAL(65,30),
    "completion_date" TIMESTAMP(3),
    "notes" TEXT,

    CONSTRAINT "maintenance_requests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "touchpoints" ADD CONSTRAINT "touchpoints_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_requests" ADD CONSTRAINT "maintenance_requests_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
