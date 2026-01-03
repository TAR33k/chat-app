import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser, handleIncomingMessage, setTypingUser, clearTypingUser } =
    useChatStore();
  const { socket } = useAuthStore();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      handleIncomingMessage(newMessage);
    };

    const handleUserTyping = ({ senderId }) => {
      setTypingUser(senderId);
    };

    const handleUserStopTyping = ({ senderId }) => {
      clearTypingUser(senderId);
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("userTyping", handleUserTyping);
    socket.on("userStopTyping", handleUserStopTyping);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("userTyping", handleUserTyping);
      socket.off("userStopTyping", handleUserStopTyping);
    };
  }, [socket, handleIncomingMessage, setTypingUser, clearTypingUser]);

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
