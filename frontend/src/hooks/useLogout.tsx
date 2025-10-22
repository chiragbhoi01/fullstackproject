import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();

  function logout() {
    // Remove token and user info from storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // If using sessionStorage for some logins, clear that as well (optional)
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    // Redirect to login page or homepage after logout
    router.push("/login");
  }

  return logout;
}
