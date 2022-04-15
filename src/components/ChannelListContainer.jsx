import React, { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';

import { ChannelSearch, TeamChannelList, TeamChannelPreview, SideBar } from './';

import { AiOutlineLogin } from "react-icons/ai";

const CompanyHeader = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text">Group Chat</p>
    </div>
)

const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === "team");
};

const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === "messaging");
};

const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer, setIsChannelActive }) => {
    const { client } = useChatContext();

    const filters = { members: { $in: [client.userID] } };

  return (
    <>
        <SideBar 
            setIsChannelActive={setIsChannelActive} 
            setIsCreating={setIsCreating}
            setIsEditing={setIsEditing}
            setToggleContainer={setToggleContainer}
        />
        <div className="channel-list__list__wrapper">
            <CompanyHeader />
            <ChannelSearch setToggleContainer={setToggleContainer} />
            <ChannelList 
                filters={filters}
                channelRenderFilterFn={customChannelTeamFilter}
                List={(listprops) => (
                    <TeamChannelList 
                        {...listprops}
                        type="team"
                        isCreating={isCreating}
                        setIsCreating={setIsCreating}
                        setCreateType={setCreateType}
                        setIsEditing={setIsEditing}
                        setToggleContainer={setToggleContainer}
                    />
                )}
                Preview={(previewProps) => (
                    <TeamChannelPreview 
                        {...previewProps}
                        setIsCreating={setIsCreating}
                        setIsEditing={setIsEditing}
                        setToggleContainer={setToggleContainer}
                        type="team"
                        setIsChannelActive={setIsChannelActive}
                    />
                )}
            />
            <ChannelList 
                filters={filters}
                channelRenderFilterFn={customChannelMessagingFilter}
                List={(listprops) => (
                    <TeamChannelList 
                        {...listprops}
                        type="messaging"
                        isCreating={isCreating}
                        setIsCreating={setIsCreating}
                        setCreateType={setCreateType}
                        setIsEditing={setIsEditing}
                        setToggleContainer={setToggleContainer}
                    />
                )}
                Preview={(previewProps) => (
                    <TeamChannelPreview 
                        {...previewProps}
                        setIsCreating={setIsCreating}
                        setIsEditing={setIsEditing}
                        setToggleContainer={setToggleContainer}
                        type="messaging"
                        setIsChannelActive={setIsChannelActive}
                    />
                )}
            />
        </div>
    </>
  );
}

const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing, setIsChannelActive }) => {
    const [toggleContainer, setToggleContainer] = useState(false);

    return (
        <>
            <div className="channel-list__container">
                <ChannelListContent 
                    setIsCreating={setIsCreating} 
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing} 
                    setIsChannelActive={setIsChannelActive}
                />
            </div>

            <div className="channel-list__container-responsive"
                style={{ left: toggleContainer ? "0%" : "-88%", backgroundColor: "#005fff" }}
            >
                <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
                    <AiOutlineLogin />
                </div>
                <ChannelListContent 
                    setIsCreating={setIsCreating} 
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer} 
                    setIsChannelActive={setIsChannelActive}
                />
            </div>
        </>
    )
}

export default ChannelListContainer;