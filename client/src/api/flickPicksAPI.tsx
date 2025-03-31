import Auth from '../utils/auth';
import { FlickpickSession } from '../interfaces/FlickpickInterface';

// sends a get Request to the server to get the list of flickPickList
export async function getFlickPicksList(){
try {
    const response = await fetch(`/api/flickpicks/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`
            }
        });
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      // returns the list of flickPicks

    const flickPicksList = await response.json();
    console.log(flickPicksList.message);
    return (flickPicksList);
} catch (error) {
    console.error('An error occurred while fetching flickPicks data');       
}
}

// creates a new flickPickListMatchingSession
export const createFlickPickListMatchingSession = async (userOneId: number, userTwoId: number, flickPickListId: number) => {

try {
  const response = await fetch('/api/flickpicks/matches', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Auth.getToken()}`
    },
    body: JSON.stringify({ userOneId, userTwoId, flickPickListId }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data = await response.json();

  const deconstructedData: FlickpickSession = {
    userOneId: data.userOneId,
    userTwoId: data.userTwoId,
    flickPickListId: data.flickPickListId,
    listOfChoices: data.listOfChoices,
  }

  console.log("FlickPickList Matching Session Created: " + deconstructedData);



  return data;
}
catch (error) {
  console.error('An error occurred while creating a flickPickList matching session');
}
}

// adds a userResponse to a flickPickListMatchingSession
// id is the flickPickListMatchingSession id or id of the session
export const addFlickPickListMatchingSessionResponse = async (id: number, userResponse: string, userId: number) => {

try {
  const response = await fetch(`/api/flickpicks/matches/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Auth.getToken()}`
    },
    body: JSON.stringify({ userResponse, userId }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data = await response.json();
  console.log("FlickPickList Matching Session Updated: " + data.message);
}
catch (error) {
  console.error('An error occurred while updating a flickPickList matching session');
}
}


// gets all flickPickListMatchingSessions for a user
export const getFlickPickListMatchingSessions = async (userId: number) => {
try {
    const response = await fetch(`/api/flickpicks/matches/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`
            }
        });
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

    const data = await response.json();
    return (data);
}
catch (error) {
    console.error('An error occurred while fetching flickPickList matching sessions');
}
}

// deletes a flickPickListMatchingSession by id
export const deleteFlickPickListMatchingSession = async (id: number) => {
try {
    const response = await fetch(`/api/flickpicks/matches/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`
            }
        });
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

    const data = await response.json();
    console.log("FlickPickList Matching Session Deleted: " + data.message);
}
catch (error) {
    console.error('An error occurred while deleting a flickPickList matching session');
}
}