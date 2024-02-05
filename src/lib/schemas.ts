import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "Email é obrigatório",
    })
    .email({
      message: "Email inválido",
    }),
  password: z
    .string({
      required_error: "Senha é obrigatória",
    })
    .min(6, {
      message: "Senha deve ter no mínimo 6 caracteres",
    }),
});

export const AmazonLinkSchema = z.object({
  id: z
    .string({
      required_error: "Link é obrigatório",
    })
    .refine(
      (value) => {
        const code = value.split("/")[5]?.split("?")[0];
        if (code === undefined) return false;
        return code.length === 10;
      },
      {
        message: "Link inválido",
      }
    ),
});
