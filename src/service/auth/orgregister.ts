import { serverFetch } from "@/lib/server-fetch";
import z from "zod";

const orgRegisterZodSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  orgName: z.string().min(1, "Organization name is required"),
  orgType: z.string(),
});

type RegisterType<T = undefined> = {
  success: boolean;
  message?: string;
  data?: T;
  errors?: { field: string; message: string }[];
};

export const orgRegister = async (
  currentState: RegisterType | null,
  formData: FormData,
): Promise<RegisterType | null> => {
  try {
    const registerData = {
      name: formData.get("name")?.toString(),
      orgName: formData.get("orgName")?.toString(),
      orgType: formData.get("orgType")?.toString(),
      email: formData.get("email")?.toString(),
      password: formData.get("password")?.toString(),
    };

    const validationFiled = orgRegisterZodSchema.safeParse(registerData);

    if (!validationFiled.success) {
      return {
        success: false,
        errors: validationFiled.error.issues.map((issue) => {
          return {
            field: issue.path[0] as string,
            message: issue.message,
          };
        }),
      };
    }

    const res = await serverFetch.post("/users/create-org-admin", {
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

    const orgUser = await res.json();
    return {
      success: true,
      data: orgUser,
      message: "Registration successful",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Unexpected error occurred",
    };
  }
};
