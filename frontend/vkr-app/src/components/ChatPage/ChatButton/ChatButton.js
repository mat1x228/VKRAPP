import React, { useState } from 'react';
import './ChatButton.css';
import UserList from '../UserList/UserList';

function ChatButton() {
  const [isUserListOpen, setIsUserListOpen] = useState(false);

  const handleChatButtonClick = () => {
    setIsUserListOpen(true);
  };

  const handleCloseUserList = () => {
    setIsUserListOpen(false);
  };

  if (!isUserListOpen) {
    return (
      <div className="chat-button-container">
        <button className="chat-button" onClick={handleChatButtonClick}>
          <div className="chat-button-image" />
          <span className="chat-button-text">test_conf</span>
        </button>
      </div>
    );
  }

  return <UserList onClose={handleCloseUserList} />;
}

export default ChatButton;
