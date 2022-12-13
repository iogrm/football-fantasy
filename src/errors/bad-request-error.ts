import { HttpError } from "./http-error";

export type BadRequestErrorTypes =
  | "LowCredit"
  | "DuplicatePlayer"
  | "MoreThanClubLimit"
  | "InvalidValidationCode"
  | "InvalidPassword"
  | "InvalidePosition"
  | "SamePosition"
  | "DifferentRole"
  | "SameIsPlaying"
  | "InvalidImageType";

const getMessage = (errType: BadRequestErrorTypes): string => {
  switch (errType) {
    case "MoreThanClubLimit":
      return "از هر تیم حداکثر می توانید سه بازیکن انتخاب کنید";
    case "DuplicatePlayer":
      return "این بازیکن در تیم شما حضور دارد";
    case "InvalidPassword":
      return "پسورد شما نامعتبر است";
    case "LowCredit":
      return "اعتبار شما کافی نیست";
    case "InvalidePosition":
      return " این بازیکن در این پوزیشن نمیتواند قرار بگیرد ";
    case "InvalidValidationCode":
      return "کد فعالسازی وارد شده نامعتبر است";
    case "SamePosition":
      return "پوزیشنهای بازیکنان نمیتواند یکسان باشند.";
    case "DifferentRole":
      return "دروازه بان را نمیتوانید با نقش دیگری تغییر دهید. ";
    case "SameIsPlaying":
      return "یک بازیکن باید از نیمکت باشد و بازیکن دیگر از تیم";
    case "InvalidImageType":
      return "فرمت فایل نامعتبر است.";
  }
};

export class BadRequestError extends HttpError {
  constructor(errorType: BadRequestErrorTypes, status: number = 400) {
    super(status, errorType, getMessage(errorType));
  }
}
