import React from 'react';
// import { fetchFriends, sendFriendRequest, fetchPendingFriends, acceptFriendRequest, rejectFriendRequest } from "../api/friendAPI";
import type { UserData } from "../interfaces/UserData";
// import auth from '../utils/auth';


interface UserListProps {
    users: UserData[] | null;
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    return (
        <>
            <h2 className="pb-5">
                Check out all your friends!
            </h2>
            {users && users.map((user) => (
                <div className="row align-center mb-5" key={user.id}>
                    <div className="col-md-6">
                        <h3>{user.id}. {user.username}</h3>
                    </div>
                    <div className="col-md-6">
                        <h4><a href={`mailto:${user.email}`}>{user.email}</a></h4>
                    </div>
                </div>
            ))}
        </>
    );
};

export default UserList;
