class AuthService {
  private base_url = "http://127.0.0.1:8000/auth";

  loginIn = async (email: string, password: string) => {
    try {
      const response = await fetch(`${this.base_url}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();

        throw new Error(
          errorMessage || `HTTP error! status: ${response.status}`
        );
      }

      return response.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
}

const authService = new AuthService();

export default authService;
