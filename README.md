
### Docker開発環境

1. `.env` を作成し、少なくとも以下を設定してください。

   ```env
   DATABASE_URL="postgresql://postgres:postgres@db:5432/cafe_diary?schema=public"
   ```

2. コンテナを起動します。

   ```bash
   docker compose up --build
   ```

   - アプリ: http://localhost:3000
   - データベース: localhost:5432（ユーザー名/パスワードともに `postgres`）
   - Prisma Studio: http://localhost:5555

3. Prisma のマイグレーションやスキーマ反映が必要な場合は、別ターミナルで以下を実行します。

   ```bash
   docker compose exec app npx prisma migrate dev
   ```

4. Prisma Studio だけを起動したい場合は以下を実行します。

   ```bash
   docker compose up studio
   ```

### ローカルで直接実行する場合

```bash
npm run dev
```

