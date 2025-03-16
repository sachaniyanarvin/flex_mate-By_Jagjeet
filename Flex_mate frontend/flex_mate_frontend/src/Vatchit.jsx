import React, { useState, useEffect } from 'react';
import { FaUser, FaPhone, FaVideo, FaPaperclip, FaSmile, FaPaperPlane, FaSearch } from 'react-icons/fa';

function App() {
  const [selectedUser, setSelectedUser] = useState(null); // Selected user ka state
  const [messages, setMessages] = useState([]); // Chat messages ka state
  const [inputText, setInputText] = useState(''); // Input field ka state
  const currentUserId = 'me'; // Current user ki ID (abhi ke liye hardcoded, real app mein dynamic hoga)

  // Dummy user data (abhi ke liye static, real app mein backend se ayega)
  const users = [
    { id: '1', name: 'Neel sir', messageCount: 5, lastSeen: 'today at 7:58 PM' },
  ];

  // Jab selectedUser change ho, messages fetch karo
  useEffect(() => {
    if (selectedUser) {
      fetchMessages();
    }
  }, [selectedUser]);

  // Messages backend se fetch karne ka function
  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://localhost:3000/messages?userId1=${currentUserId}&userId2=${selectedUser.id}`);
      const data = await response.json();
      const formattedMessages = data.map(msg => ({
        id: msg._id, // Backend se message ID
        text: msg.text, // Message ka text
        isSent: msg.senderId === currentUserId, // Agar sender current user hai toh true
      }));
      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Naya message send karne ka function
  const handleSendMessage = async () => {
    if (inputText.trim() === '') return; // Agar input khali hai toh return
    const newMessage = {
      senderId: currentUserId,
      receiverId: selectedUser.id,
      text: inputText,
    };
    try {
      const response = await fetch('http://localhost:3000/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
      });
      const data = await response.json();
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: data._id, // Backend se nayi message ki ID
          text: data.text,
          isSent: true, // Kyunki yeh current user ne bheja
        },
      ]);
      setInputText(''); // Input field ko clear karo
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Sidebar se user select karne ka function
  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="flex h-[97vh] bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-200">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-4 p-2 border rounded-lg">
            <FaSearch className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                onClick={() => handleUserClick(user)}
              >
                <div className="flex items-center space-x-2">
                  <FaUser className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-500">Last seen {user.lastSeen}</p>
                  </div>
                </div>
                <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                  {user.messageCount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="w-3/4 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <FaUser className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-semibold">{selectedUser.name}</p>
                  <p className="text-sm text-gray-500">Last seen {selectedUser.lastSeen}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <FaVideo className="w-6 h-6 text-gray-500 cursor-pointer" />
                <FaPhone className="w-6 h-6 text-gray-500 cursor-pointer" />
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isSent ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs p-2 rounded-lg ${
                      msg.isSent ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <FaSmile className="w-6 h-6 text-gray-500 cursor-pointer" />
                <FaPaperclip className="w-6 h-6 text-gray-500 cursor-pointer" />
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="w-full p-2 border rounded-lg"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <FaPaperPlane
                  className="w-6 h-6 text-gray-500 cursor-pointer"
                  onClick={handleSendMessage}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-100">
            <p className="text-gray-500 text-lg">Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;