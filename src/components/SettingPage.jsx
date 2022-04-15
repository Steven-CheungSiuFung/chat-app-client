import React, { useEffect, useState } from 'react';
import { useChatContext } from 'stream-chat-react';
import { Avatar } from 'stream-chat-react';

import { CloseCreateChannel } from '../assets/CloseCreateChannel';

const ListContainer = ({children}) => {
    return (
        <div className="user-list__container">
            <div className="user-list__header">
                <p>User</p>
                <p>Info</p>
            </div>
            {children}
        </div>
    )
};

const SettingPage = ({ setIsChannelActive }) => {
    const { client } = useChatContext();
    const [error, setError] = useState(false);
    const [user, setUser] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await client.queryUsers(
                    { id: client.userID }
                );
                if (response.users.length) {
                    setUser(response.users[0]);
                }
            } catch (error) {
                setError(error);
            }
        }
        if (client) getUser();
    }, [])

    if (error) {
        return (
            <ListContainer>
                <div className="user-list__message">
                    Error loading, please refresh and try agin.
                </div>
            </ListContainer>
        )
    }

    return (
        <div className="setting-page__conatiner">
            <div className="setting-page__header">
                <p>Profile</p>
                <CloseCreateChannel setIsChannelActive={setIsChannelActive} />
            </div>
            <div className="setting-page__profile">
                <div className="setting-page__profile-image">
                    <Avatar image={user.image} name={user.fullName || user.id} size={128} />
                </div>      
                <p className="setting-page__profile-info">Full Name: {user.fullName || user.id}</p>
                <p className="setting-page__profile-info">Username: {user.name || user.id}</p>
                <p className="setting-page__profile-info">Email: {user.email || "N/A"}</p>
            </div>
        </div>
    )
};

export default SettingPage;