import Auth from '../utils/auth';

const retrieveUsers = async () => {
  try {
    const response = await fetch('/api/users', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('Invalid user API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

const retrieveUser = async (userId: number) => {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    if (!response.ok) {
      throw new Error (`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data
  } catch (error) {
    console.error('An error occured while fetching user')
  }
}
export { retrieveUsers, retrieveUser };
