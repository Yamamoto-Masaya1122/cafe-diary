import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "管理者ユーザー",
      email: "admin@example.com",
      password: hashedPassword,
      cafeDiaries: {
        create: [
          {
            name: "Mola Cafe",
            location: "大阪府大阪市中央区和泉町1-3-3",
            visitDate: new Date(),
            rating: 5,
            notes: "バスクチーズケーキとコーヒーが美味しかったです。",
          },
          {
            name: "Bird COFFEE",
            location: "大阪府大阪市鶴見区緑4-1-16",
            visitDate: new Date(),
            rating: 5,
            notes: "ツタに包まれた静かな隠れ家カフェで癒しのひととき",
          },
          {
            name: "とれぽ珈琲",
            location: "大阪府大阪市福島区野田3-1-6",
            visitDate: new Date(),
            rating: 5,
            notes: "天井の高い古民家カフェ！注文したプリンと珈琲が美味しかったです。",
          },
        ],
      },
    },
  });

  console.log("✅管理者ユーザーを作成しました", adminUser);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
