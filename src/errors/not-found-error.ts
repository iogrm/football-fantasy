import { HttpError } from "./http-error";

export type FieldNames =
  | "Route"
  | "User"
  | "Player"
  | "Team"
  | "Username"
  | "Email"
  | "Week"
  | "Image";

export const translateFieldName = (field: FieldNames): string => {
  switch (field) {
    case "Email":
      return "ایمیل";
    case "Player":
      return "بازیکن";
    case "Route":
      return "وب پیج";
    case "Team":
      return "تیم";
    case "User":
      return "کاربر";
    case "Username":
      return "نام کاربری";
    case "Week":
      return " هفته ";
    case "Image":
      return "تصویر";
  }
};

export class NotFoundError extends HttpError {
  constructor(field: FieldNames) {
    super(404, "NotFoundError", `${translateFieldName(field)} یافت نشد`);
  }
}
