### 概要
プロジェクトのフォルダの構成の例を示したドキュメントです。

### フォルダ構成
src/
├─ app/
│   ├─ layout.tsx
│   ├─ page.tsx
│   │
│   ├─ auth/
│   │   ├─ sign-in/
│   │   │   ├─ page.tsx                  # ログイン画面
│   │   │   └─ components/
│   │   │       └─ SignInForm.tsx
│   │   ├─ sign-up/
│   │   │   ├─ page.tsx                  # 会員登録画面
│   │   │   └─ components/
│   │   │       └─ SignUpForm.tsx
│   │   └─ reset-password/
│   │       ├─ page.tsx                  # パスワードリセット画面
│   │       └─ components/
│   │           └─ ResetPasswordForm.tsx
│   │
│   ├─ shop/
│   │   ├─ page.tsx
│   │   ├─ components/
│   │   │   ├─ ShopCard.tsx
│   │   │   └─ ShopFilter.tsx
│   │   └─ [id]/page.tsx
│   │
│   ├─ cafe-diary/
│   │   ├─ page.tsx
│   │   ├─ new/page.tsx
│   │   ├─ [id]/page.tsx
│   │   └─ components/
│   │       ├─ CafeDiaryCard.tsx
│   │       └─ CafeDiaryForm.tsx
│   │
│   ├─ profile/
│   │   ├─ page.tsx
│   │   └─ components/
│   │       └─ UserProfileForm.tsx
│   │
│   ├─ admin/
│   │   ├─ shops/
│   │   │   ├─ page.tsx
│   │   │   ├─ new/page.tsx
│   │   │   └─ [id]/edit/page.tsx
│   │   │   └─ components/
│   │   │       └─ AdminShopTable.tsx
│   │   │
│   │   └─ cafe-diary/
│   │       ├─ page.tsx
│   │       └─ components/
│   │           └─ AdminCafeDiaryTable.tsx
│   │
│   └─ api/
│       ├─ auth/[…nextauth]/route.ts      # NextAuth endpoint
│       ├─ shops/
│       │   ├─ route.ts
│       │   └─ [id]/route.ts
│       ├─ cafe-diary/
│       │   ├─ route.ts
│       │   └─ [id]/route.ts
│       └─ users/
│
├─ components/                           # 汎用UI（Atomic Design）
│   ├─ 1_atoms/
│   ├─ 2_molecules/
│   └─ 3_organisms/
│
├─ services/
│   ├─ shopService.ts
│   ├─ cafeDiaryService.ts
│   └─ userService.ts
│
├─ repositories/
│   ├─ shopRepository.ts
│   ├─ cafeDiaryRepository.ts
│   └─ userRepository.ts
│
├─ hooks/
│   ├─ useShop.ts
│   ├─ useCafeDiary.ts
│   ├─ useAuth.ts                        # 認証専用フック
│   └─ usePasswordReset.ts
│
├─ types/
│   ├─ shop.ts
│   ├─ cafeDiary.ts
│   └─ user.ts
│
├─ validations/
│   ├─ shopSchema.ts
│   ├─ cafeDiarySchema.ts
│   └─ authSchema.ts                    # SignIn / SignUp 用 Zod スキーマ
│
├─ utils/
│   ├─ distanceCalculator.ts
│   ├─ zipcloud.ts
│   ├─ formatters.ts
│   └─ errorHandlers.ts
│
├─ lib/
     ├─ prisma.ts
     ├─ auth.ts                          # NextAuth 設定
     └─ axios.ts

