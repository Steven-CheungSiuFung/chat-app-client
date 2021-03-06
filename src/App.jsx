import React, { useState } from 'react';
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChannelContainer, ChannelListContainer, Auth } from './components';

import "stream-chat-react/dist/css/index.css";
import "./App.css";

const cookies = new Cookies();

const apiKey = "g8cpznn58mtv";
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if (authToken) {
  client.connectUser({
    name: cookies.get("username"),
    fullName: cookies.get("fullName"),
    id: cookies.get("userId"),
    email: cookies.get("email"),
    image: cookies.get("avatarURL"),
    hashedPassword: cookies.get("hashedPassword"),
  }, authToken)
}

const App = () => {
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isChannelActive, setIsChannelActive] = useState(false);

  if (!authToken) return <Auth />

  return (
    <div className="app__wrapper">
        <Chat client={client} theme="team light">
            <ChannelListContainer 
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setIsChannelActive={setIsChannelActive}
            />
            <ChannelContainer 
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              createType={createType}
              isChannelActive={isChannelActive}
              setIsChannelActive={setIsChannelActive}
            />
        </Chat>
    </div>
  );
}

export default App