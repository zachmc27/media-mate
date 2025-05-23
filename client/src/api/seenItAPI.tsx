import Auth from "../utils/auth";

export const fetchSeenIt = async (userId: number) => {
  try {
    const response = await fetch(`/api/seen/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });
    if (!response.ok) {
      if (response.status === 404) {
        console.log("No data found for this user");
        return [];
      }
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("An error occurred while fetching seen data");
  }
};

export const getUserGenrePreferences = async (userId: number) => {
  try {
    const response = await fetch(`/api/seen/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();

    // Extract all genre IDs into a single array
    interface MediaItem {
      media: {
        genre: number[];
      };
    }

    const allGenreIds: number[] = data.flatMap((item: MediaItem) => item.media.genre);

    // Count occurrences of each genre ID
    const frequencyMap = allGenreIds.reduce<Record<number, number>>((acc, genreId) => {
      acc[genreId] = (acc[genreId] || 0) + 1;
      return acc;
    }, {});

    // Find the genre ID with the highest occurrence
    const mostCommonGenreId = Object.entries(frequencyMap).reduce((a, b) =>
      b[1] > a[1] ? b : a
    )[0];

    return parseInt(mostCommonGenreId);
  } catch (error) {
    console.error("An error occurred while fetching genre preferences:", error);
  }
};

// this call is meant to add a media to the seen it list through either the matched or discovery pages
export const addMediaToSeenIt = async (userID: number, mediaID: number) => {
  try {
    const response = await fetch(`/api/seen/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
      body: JSON.stringify({ userId: userID, mediaId: mediaID }),
    });

    if (!response.ok) {
      throw new Error("Failed to move to Seen it");
    }
    // console.log("Sending request with data:", { userId: userID, mediaId: mediaID, mediaTitle: mediaTitle });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error in moving media to Seen It:", error);
    throw error;
  }
};

// this call is meant to remove a media from the seen it list
export const removeMediaFromSeenIt = async (
  userId: number,
  mediaId: number
) => {
  const response = await fetch(`/api/seen/remove`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Auth.getToken()}`,
    },
    body: JSON.stringify({ userId: userId, mediaId: mediaId }),
  });
  console.log(userId, mediaId);
  return response.json();
};

export default { fetchSeenIt, addMediaToSeenIt, removeMediaFromSeenIt };
