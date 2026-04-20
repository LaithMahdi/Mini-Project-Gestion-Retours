import { describe, expect, it } from "vitest";
import { decodeJWT, formatToSentenceCase, getCookieExpiryDate } from "./utils";

describe("formatToSentenceCase", () => {
  it("formats enum-like values", () => {
    expect(formatToSentenceCase("EN_ATTENTE")).toBe("En attente");
  });

  it("formats camel case values", () => {
    expect(formatToSentenceCase("etatTraitementValide")).toBe(
      "Etat traitement valide",
    );
  });
});

describe("decodeJWT", () => {
  it("returns exp claim when token is valid", () => {
    const payload = Buffer.from(JSON.stringify({ exp: 1710000000 })).toString(
      "base64url",
    );

    const token = `header.${payload}.signature`;
    expect(decodeJWT(token)).toEqual({ exp: 1710000000 });
  });

  it("returns empty object for invalid token", () => {
    expect(decodeJWT("invalid-token")).toEqual({});
  });
});

describe("getCookieExpiryDate", () => {
  it("returns undefined when exp is missing", () => {
    expect(getCookieExpiryDate(undefined)).toBeUndefined();
  });

  it("returns date when exp is provided", () => {
    const exp = 1710000000;
    const date = getCookieExpiryDate(exp);

    expect(date).toBeInstanceOf(Date);
    expect(date?.getTime()).toBe(exp * 1000);
  });
});
