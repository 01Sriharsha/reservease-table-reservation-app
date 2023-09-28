import { ROLE } from "@prisma/client";
import * as jose from "jose";

export default async function GenerateJwtToken(payload: {
  email: string | undefined;
  role: ROLE | undefined;
}) {
  const alg = "HS512";

  const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

  const token = await new jose.SignJWT(payload)
    .setIssuedAt()
    .setExpirationTime("1hr")
    .setProtectedHeader({ alg })
    .sign(SECRET);

  return token;
}
