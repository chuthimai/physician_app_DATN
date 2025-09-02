import { tokenStorage } from "./secureTokenStorage";

export async function logout() {
    await tokenStorage.deleteTokens();
    localStorage.clear();
    window.location.href = "/login";
}
