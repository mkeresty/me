/**
 * Inlined at build time by Next. Plain <a href> and <img src> do not get
 * the basePath treatment that next/link and next/image do, so anything
 * pointing at /public has to go through here.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${basePath}${path}`;
