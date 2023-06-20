import React, { useState } from 'react';
import { FaTelegram, FaDiscord } from 'react-icons/fa';
import ChatButton from './ChatButton/ChatButton';
import './ChatPage.css';

function ChatPage() {
  const [showChatButton, setShowChatButton] = useState(true);

  const handleTelegramClick = () => {
    setShowChatButton(false);
  };

  return (
    <div className="chat-page">
      {showChatButton ? (
        <div className="chat-buttons">
          <button className="chat-button" onClick={handleTelegramClick}>
            <FaTelegram className="chat-icon" />
          </button>
          <button className="chat-button">
            <FaDiscord className="chat-icon" />
          </button>
        </div>
      ) : (
        <ChatButton />
      )}
    </div>
  );
}

export default ChatPage;

