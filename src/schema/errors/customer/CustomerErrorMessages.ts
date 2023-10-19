import { type ErrorMapCtx, type ZodIssueOptionalMessage } from "zod";

export const phoneErrorMessages = {
  errorMap: (
    issue: ZodIssueOptionalMessage,
    _ctx: ErrorMapCtx,
  ): { message: string } => {
    switch (issue.code) {
      case "too_small":
        return { message: "Phone number must be 10 digits" };
      case "too_big":
        return { message: "Phone number must be 10 digits" };
      case "invalid_type":
        return { message: "Phone number must be a string" };
      default:
        return { message: "Invalid" };
    }
  },
};

export const nameErrorMessages = {
  errorMap: (
    issue: ZodIssueOptionalMessage,
    _ctx: ErrorMapCtx,
  ): { message: string } => {
    switch (issue.code) {
      case "too_small":
        return { message: "Name must be at least 2 characters" };
      case "too_big":
        return { message: "Name must be at most 50 characters" };
      case "invalid_type":
        return { message: "Nameame must be a string" };
      default:
        return { message: "Invalid" };
    }
  },
};
export const addressErrorMessages = {
  errorMap: (
    issue: ZodIssueOptionalMessage,
    _ctx: ErrorMapCtx,
  ): { message: string } => {
    switch (issue.code) {
      case "too_small":
        return { message: "Address must be at least 2 characters" };
      case "too_big":
        return { message: "Address must be at most 50 characters" };
      case "invalid_type":
        return { message: "Address must be a string" };
      default:
        return { message: "Invalid" };
    }
  },
};

export const customerNumberErrorMessages = {
  errorMap: (
    issue: ZodIssueOptionalMessage,
    _ctx: ErrorMapCtx,
  ): { message: string } => {
    switch (issue.code) {
      case "too_small":
        return { message: "Customer number must be at least 2 characters" };
      case "too_big":
        return { message: "Customer number must be at most 50 characters" };
      case "invalid_type":
        return { message: "Customer number must be a string" };
      default:
        return { message: "Invalid" };
    }
  },
};
