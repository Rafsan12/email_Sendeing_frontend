import { serverFetch } from "@/lib/server-fetch";
import z from "zod";

type RegisterType<T = undefined> = {
  success: boolean;
  message?: string;
  data?: T;
  errors?: { field: string; message: string }[];
};

const registerValidationZod = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerUser = async (
  currentState: RegisterType | null,
  formData: FormData,
): Promise<RegisterType | null> => {
  try {
    const registerData = {
      name: formData.get("name")?.toString(),
      email: formData.get("email")?.toString(),
      password: formData.get("password")?.toString(),
    };

    const validateFiled = registerValidationZod.safeParse(registerData);

    if (!validateFiled.success) {
      return {
        success: false,
        errors: validateFiled.error.issues.map((issue) => {
          return {
            field: issue.path[0] as string,
            message: issue.message,
          };
        }),
      };
    }

    const res = await serverFetch.post("/users/create-user", {
      body: JSON.stringify(registerData),
      headers: {
        "content-type": "application/json",
      },
    });

    if (!res.ok) {
      const error = await res.json();
      return {
        success: false,
        message: error.message ?? "Registration failed",
      };
    }

    const user = await res.json();
    return {
      success: true,
      data: user,
      message: "Registration successful",
    };

    console.log(user);
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return {
      success: false,
      message: "Unexpected error occurred",
    };
  }
};
