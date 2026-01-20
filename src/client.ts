import { PrismaClient, Prisma } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import config from "./config/config";

export * from "./generated/prisma/client";

function createPrismaClient() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
    ...(process.env.DB_SERVER && process.env.DB_SERVER !== "localhost" && {
      ssl: { rejectUnauthorized: false },
    }),
  });

  const prisma = new PrismaClient({ adapter });

  const softDeleteExtension = Prisma.defineExtension((client) => {
    return client.$extends({
      name: "SoftDelete",
      query: {
        $allModels: {
          delete({ model, args }) {
            const data = (args as { data?: Record<string, any> }).data ?? {};

            return (client as any)[model].update({
              ...(args as object),
              data: {
                ...data,
                deleted: true,
              },
            });
          },

          deleteMany({ model, args }) {
            const data = (args as { data?: Record<string, any> }).data ?? {};

            return (client as any)[model].updateMany({
              ...(args as object),
              data: {
                ...data,
                deleted: true,
              },
            });
          },
        },
      },
    });
  });

  return prisma.$extends(softDeleteExtension);
}

const globalForPrisma = globalThis as unknown as {
  prisma?: ReturnType<typeof createPrismaClient>;
};

const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (config.env === "development") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
