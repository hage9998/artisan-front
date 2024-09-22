class RegisterService {
  private base_url = "http://127.0.0.1:8000/users";

  signUp = async (email: string, password: string, name: string) => {
    try {
      const response = await fetch(`${this.base_url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          password,
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

const registerService = new RegisterService();

export default registerService;
