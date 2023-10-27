import { redirect } from "react-router-dom";
import { AuthenticatedUser, CurrentUser, Token, User } from "./../models/user";

export const saveAuthenticatedUser = ({ user, tokens }: AuthenticatedUser) => {
  // Store user.
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  // Store access token.
  if (tokens && tokens.access) {
    localStorage.setItem("accessToken", JSON.stringify(tokens.access));
  }

  // Store access token.
  if (tokens && tokens.refresh) {
    localStorage.setItem("refreshToken", JSON.stringify(tokens.refresh));
  }
};

// export function getTokenDuration(key: string): number {
//   const stringifiedToken = localStorage.getItem(key);
//   if (!stringifiedToken) {
//     return -1;
//   }

//   const expirationDate = new Date(stringifiedToken);
//   const now = new Date();
//   const duration = expirationDate.getTime() - now.getTime();
//   return duration;
// }

export function getTokenDuration(expiresIn: string): number {
  const expirationDate = new Date(expiresIn);
  const now = new Date();
  // console.log(`expirationDate: ${expirationDate}`);
  // console.log(`now: ${now}`);
  return expirationDate.getTime() - now.getTime();
}

const getAccessToken = (): CurrentUser | null => {
  const stringifiedUser = localStorage.getItem("user");
  const user = stringifiedUser
    ? (JSON.parse(stringifiedUser) as User)
    : null;
  const stringifiedAccessToken = localStorage.getItem("accessToken");
  const accessToken = stringifiedAccessToken
    ? (JSON.parse(stringifiedAccessToken) as Token)
    : null;

  if (!accessToken) {
    return null;
  }

  const tokenDuration = getTokenDuration(accessToken.expiresIn);
  console.log(`tokenDuration: ${tokenDuration}`);

  if (!user || isNaN(tokenDuration) || tokenDuration < 0) {
    console.log(`logging out ${tokenDuration} ${user}`);
    logout();
    return null;
  }

  return { user, duration: tokenDuration };
};

export function privateRouteLoader() {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return redirect("/signup");
  }

  return accessToken;
}

export function publicRouteLoader() {
  const accessToken = getAccessToken();

  return accessToken ? redirect("/") : null;
}

export const logout = (): void => {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
