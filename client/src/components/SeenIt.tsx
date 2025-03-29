import { useEffect, useState } from "react";
import { fetchSeenIt, removeMediaFromSeenIt } from "../api/seenItAPI";
import Media from "../interfaces/Media.tsx";
import auth from '../utils/auth';
// import "../styles/SeenIt.css";

export default function SeenItList() {
    const [seenList, setSeenList] = useState<Media[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const userId: number | null = auth.getUserId();    

    useEffect(() => {
      if (userId === null) {
        setError("You must be logged in to access this page.");
        setLoading(false);
        return;
      }

      const fetchData = async () => {
        try {
          const data = await fetchSeenIt(userId);
          if (data) {
            setSeenList(data);
          } else {
            setError("Failed to fetch data.");
          }
        } catch (error) {
          setError("An error occurred while fetching seen it data.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [userId]);
  
    if (loading) return <p>Loading your Seen It list...</p>;
    if (error) return <p className="error">{error}</p>;
  
    return (
      <div className="cards-row">
        <div className="list-section">
          <div className="list-title">Seen It</div>
          <div className="list-1">
            {seenList.length > 0 ? (
              seenList.map((item) => (
                <div key={item.id} className="card">
                  <h4 className="card-title">{item.mediaTitle}</h4>
                  <button onClick={() => removeMediaFromSeenIt(userId!, item.mediaId)}>Remove</button>
                </div>
              ))
            ) : (
              <p>No watched movies yet.</p>
            )}
          </div>
        </div>
      </div>
    );
  }