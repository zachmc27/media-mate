import Auth from '../utils/auth';
import { FlickpickSession } from '../interfaces/FlickpickInterface';

// gets the unique CallabList for a userId

export async function getCollabLists(userId: number){

try {
    const response = await fetch(`/api/flickpicks/collabs/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`
            }
        });
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

    const collabList = await response.json();
    return (collabList);
}catch (error) {
    console.error('An error occurred while fetching flickPicks data');
}
}
// expected output: [
  // [
  //   {
  //     "name": "Sunny Scribe & Radiant Comet",
  //     "userOneId": 1,
  //     "userTwoId": 2,
  //     "flickPickListId": [
  //       1
  //     ],
  //     "matches": [
  //       1125899
  //     ]
  //   },
  //   {
  //     "name": "Sunny Scribe & Unknown",
  //     "userOneId": 1,
  //     "userTwoId": 4,
  //     "flickPickListId": [
  //       1
  //     ],
  //     "matches": [
  //       1125899
  //     ]
  //   }
  // ]

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

//sends a post request to initiate matching between two users and the flickPickList

export async function initiateFlickPickMatching(userOneId: number, userTwoId: number, flickPickListId: number){
try {
    const response = await fetch(`api/flickpicks/matches/compare`, {
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
    console.log(data.message);
    return data;
}
catch (error) {
    console.error('An error occurred while initiating flickPick matching');
}
}




//gets flickPickList by userId for Friends List

export const getFlickPicksListByUserId = async (userId: number) => {
try {
    const response = await fetch(`/api/flickpicks/${userId}`, {
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
} catch (error) {
    console.error('An error occurred while fetching flickPicks data');
} 
}

// creates a new flickPickListMatchingSession
/**
 * Creates a FlickPickList matching session for a user.
 *
 * This function sends a POST request to the `/api/flickpicks/matches` endpoint
 * to create a new matching session for the specified user and FlickPickList.
 * It includes the user's authentication token in the request headers and
 * sends the user ID and FlickPickList ID in the request body.
 *
 * @param userId - The ID of the user for whom the FlickPickList matching session is being created.
 * @param flickPickListId - The ID of the FlickPickList to be associated with the matching session.
 * @returns A promise that resolves to the created FlickPickList matching session data.
 *          The returned data includes the session ID, user ID, FlickPickList ID, and list of choices.
 * @throws An error if the request fails or the response is not OK.
 *
 * @example
 * ```typescript
 * const session = await createUserFlickPickList(123, 456);
 * console.log(session);
 * ```
 */
export const createUserFlickPickList = async (userId: number, flickPickListId: number) => {

try {
  const response = await fetch('/api/flickpicks/matches', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Auth.getToken()}`
    },
    body: JSON.stringify({ userId, flickPickListId }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data = await response.json();

  const deconstructedData: FlickpickSession = {
    id: data.id,
    userId: data.userId,
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
export const submitMatchListResponses = async (id: number, answer : number[], userId: number) => {

try {
  const response = await fetch(`/api/flickpicks/matches/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Auth.getToken()}`
    },
    body: JSON.stringify({ answer, userId }),
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
export const getFlickPickListResponses = async (userId: number) => {
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
      console.log('Tried to get completed flickpicks' + response);
    const data = await response.json();
    return (data);
}
catch (error) {
    console.error('An error occurred while fetching flickPickList matching sessions');
  }
}

// deletes a flickPickListMatchingSession by id
export const deleteFlickPickList = async (id: number) => {
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