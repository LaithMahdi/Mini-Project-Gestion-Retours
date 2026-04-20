import { describe, expect, it } from "vitest";
import { loginFormSchema } from "./index";

describe("loginFormSchema", () => {
  it("accepts valid credentials", () => {
    const result = loginFormSchema.safeParse({
      email: "user@example.com",
      password: "secret123",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = loginFormSchema.safeParse({
      email: "invalid-email",
      password: "secret123",
    });

    expect(result.success).toBe(false);
  });

  it("rejects short password", () => {
    const result = loginFormSchema.safeParse({
      email: "user@example.com",
      password: "1234",
    });

    expect(result.success).toBe(false);
  });
});
