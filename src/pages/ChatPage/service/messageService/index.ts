class MessageService {
  private base_url = "http://127.0.0.1:8000/messages";

  getAllMessagesByUserId = async (userId: string) => {
    const authToken = sessionStorage.getItem("authToken");

    try {
      const response = await fetch(`${this.base_url}/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const messages = response.json();

      return messages;
    } catch (error) {
      console.error(error);
    }
  };
}

const messageService = new MessageService();

export default messageService;
