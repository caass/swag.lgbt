import { type CookieOptions } from "@builder.io/qwik-city";

// ripped from https://github.com/BuilderIO/qwik/blob/main/packages/qwik-city/middleware/request-handler/cookie.ts#L17
const SAMESITE = {
  lax: "Lax",
  none: "None",
  strict: "Strict",
} as const;

const UNIT = {
  seconds: 1,
  minutes: 1 * 60,
  hours: 1 * 60 * 60,
  days: 1 * 60 * 60 * 24,
  weeks: 1 * 60 * 60 * 24 * 7,
};

function tryDecodeUriComponent(str: string) {
  try {
    return decodeURIComponent(str);
  } catch {
    return str;
  }
}

const createSetCookieValue = (
  cookieName: string,
  cookieValue: string,
  options: CookieOptions
) => {
  const c = [`${cookieName}=${cookieValue}`];

  if (typeof options.domain === "string") {
    c.push(`Domain=${options.domain}`);
  }

  // If both Expires and Max-Age are set, Max-Age has precedence.
  if (typeof options.maxAge === "number") {
    c.push(`Max-Age=${options.maxAge}`);
  } else if (Array.isArray(options.maxAge)) {
    c.push(`Max-Age=${options.maxAge[0] * UNIT[options.maxAge[1]]}`);
  } else if (
    typeof options.expires === "number" ||
    typeof options.expires == "string"
  ) {
    c.push(`Expires=${options.expires}`);
  } else if (options.expires instanceof Date) {
    c.push(`Expires=${options.expires.toUTCString()}`);
  }

  if (options.httpOnly) {
    c.push("HttpOnly");
  }

  if (typeof options.path === "string") {
    c.push(`Path=${options.path}`);
  }

  const sameSite = resolveSameSite(options.sameSite);
  if (sameSite) {
    c.push(`SameSite=${sameSite}`);
  }

  if (options.secure) {
    c.push("Secure");
  }

  return c.join("; ");
};

export const setCookie =
  (document: Document) =>
  (
    name: string,
    value: string | number | Record<string, unknown>,
    options?: CookieOptions
  ) => {
    const serializedValue =
      typeof value === "string"
        ? value
        : typeof value === "number"
        ? value.toString()
        : JSON.stringify(value);

    document.cookie = createSetCookieValue(
      name,
      serializedValue,
      options ?? {}
    );
  };

function resolveSameSite(
  sameSite: boolean | "strict" | "lax" | "none" | undefined
) {
  if (sameSite === true) {
    return "Strict";
  }
  if (sameSite === false) {
    return "None";
  }
  if (sameSite) {
    return SAMESITE[sameSite];
  }
  return undefined;
}

export const parseCookieString = (cookieString: string | undefined | null) => {
  const cookie: Record<string, string> = {};
  if (typeof cookieString === "string" && cookieString !== "") {
    const cookieSegments = cookieString.split(";");
    for (const cookieSegment of cookieSegments) {
      const separatorIndex = cookieSegment.indexOf("=");
      if (separatorIndex !== -1) {
        cookie[
          tryDecodeUriComponent(cookieSegment.slice(0, separatorIndex).trim())
        ] = tryDecodeUriComponent(
          cookieSegment.slice(separatorIndex + 1).trim()
        );
      }
    }
  }
  return cookie;
};
