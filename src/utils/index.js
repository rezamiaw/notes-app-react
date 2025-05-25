const BASE_URL = "https://notes-api.dicoding.dev/v1";

class APIError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "APIError";
    this.status = status;
  }
}

async function fetchWithAuth(url, options = {}) {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers,
    });

    const responseJson = await response.json();

    if (response.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      window.location.href = "/login";
      throw new APIError("Session expired. Please login again.", 401);
    }

    if (!response.ok) {
      throw new APIError(
        responseJson.message || "An error occurred",
        response.status
      );
    }

    return responseJson;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(
      "Network error. Please check your connection.",
      "NETWORK_ERROR"
    );
  }
}

// Function to register a new user
export async function register({ name, email, password }) {
  try {
    // Validate input
    if (!name || !email || !password) {
      throw new APIError("All fields are required", 400);
    }

    if (password.length < 6) {
      throw new APIError("Password must be at least 6 characters long", 400);
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new APIError("Invalid email format", 400);
    }

    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const responseJson = await response.json();

    if (!response.ok) {
      throw new APIError(
        responseJson.message || "Registration failed",
        response.status
      );
    }

    return responseJson;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(
      "Network error. Please check your connection.",
      "NETWORK_ERROR"
    );
  }
}

// Function to login
export async function login({ email, password }) {
  try {
    // Validate input
    if (!email || !password) {
      throw new APIError("Email and password are required", 400);
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new APIError("Invalid email format", 400);
    }

    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();

    if (!response.ok) {
      throw new APIError(
        responseJson.message || "Invalid email or password",
        response.status
      );
    }

    const { accessToken, user } = responseJson.data;
    localStorage.setItem("authToken", accessToken);
    localStorage.setItem("userData", JSON.stringify(user));
    return responseJson;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(
      "Network error. Please check your connection.",
      "NETWORK_ERROR"
    );
  }
}

// Function to fetch notes
export async function getNotes() {
  return fetchWithAuth("/notes");
}

// Function to fetch archived notes
export async function getArchivedNotes() {
  return fetchWithAuth("/notes/archived");
}

// Function to get note details
export async function getNoteDetail(id) {
  return fetchWithAuth(`/notes/${id}`);
}

// Function to add a new note
export async function addNote({ title, body }) {
  return fetchWithAuth("/notes", {
    method: "POST",
    body: JSON.stringify({ title, body }),
  });
}

// Function to archive a note
export async function archiveNote(id) {
  return fetchWithAuth(`/notes/${id}/archive`, {
    method: "POST",
  });
}

// Function to unarchive a note
export async function unarchiveNote(id) {
  return fetchWithAuth(`/notes/${id}/unarchive`, {
    method: "POST",
  });
}

// Function to delete a note
export async function deleteNote(id) {
  return fetchWithAuth(`/notes/${id}`, {
    method: "DELETE",
  });
}

const showFormattedDate = (date) => {
  try {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("id-ID", options);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};

export { showFormattedDate };
