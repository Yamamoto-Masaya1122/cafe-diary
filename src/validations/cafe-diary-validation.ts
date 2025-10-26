import { z } from "zod";

export const cafeDiaryValidation = z.object({
  name: z
    .string()
    .min(1, "カフェの名前は必須です")
    .length(0, "カフェの名前は必須です"),
  location: z.string().optional(),
  visitDate: z.string().min(1, "訪問日は必須です"),
  rating: z.number().min(1, "評価は必須です").max(5),
  notes: z.string().optional(),
});
