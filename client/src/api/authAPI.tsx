import { UserLogin } from "../interfaces/UserLogin";  
import { UserSignup } from "../interfaces/UserSignup";


const login = async (userInfo: UserLogin) => {
  try {

    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

 
    if (!response.ok) {
      const errorData = await response.json(); 
      throw new Error(`Error: ${errorData.message}`);   
    }

   
    const data = await response.json();

    return data;  
  } catch (err) {
    console.log('Error from user login: ', err);  
    return Promise.reject('Could not fetch user info');  
  }
}


const register = async (userInfo: UserSignup) => {
  try {
    const response = await fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to register user");
    }

    console.log("User registered successfully:", data);
    return data;
  } catch (err) {
    console.error("Error during registration:", err);
    throw err;
  }
}

export { login, register };  
