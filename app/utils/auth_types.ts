import z from "zod";

export const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export type SignUpFormValues = z.infer<typeof formSchema>;

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
