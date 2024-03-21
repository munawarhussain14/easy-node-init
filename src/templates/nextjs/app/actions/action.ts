"use server";
import { revalidatePath } from "next/cache";
import { **schema_name** } from "@/app/actions/schemas/schema";
import **service_name** from "@/app/actions/service/country";
import formDataToJson from "../utils/FormDataToJson";
import { redirect } from "next/navigation";

export async function createCountry(previousState: any, formData: FormData) {
  const data: any = formDataToJson(formData, [
    "name"
  ]);
  const validation = postBase.safeParse(data);

  const validation = **schema_name**.safeParse(data);
  if (!validation.success) {
    const validationErrors = validation.error.errors.reduce(
      (prev, err) => ({ ...prev, [err.path[0]]: err.message }),
      {}
    );
    return { message: "Some Error", errors: validationErrors };
  }

  revalidatePath("/", "page");

  const response = await **service_name**.post(data);

  if (response.success) {
    return { message: response.message };
  } else {
    return { errorMessage: response.message };
  }
}
