// User/seed.js

import { prisma } from "./db.js";
async function main() {
  const user = await prisma.user.create({
    data: {
      firstName: "Rakesh",
      lastName: "K",
      email: "rakesh@example.com",
      password: "securepassword123",
    },
  });

  console.log("User created:", user);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
