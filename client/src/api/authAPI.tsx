import { UserLogin } from "../interfaces/UserLogin";  


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

const createUser = async (username: string, email: string, password: string) => {
  try {
    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });

    if (!response.ok) {
      const errorData = await response.json(); 
      throw new Error(`Error: ${errorData.message}`);   
    }

    return await response.json(); 
  } catch (err) {
    console.log('Error from user creation: ', err);  
    return Promise.reject('Could not create user');  
  }
}

export { login, createUser };  
