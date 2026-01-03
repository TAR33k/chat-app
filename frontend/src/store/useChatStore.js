import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  unreadCounts: {},
  typingUserId: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance.get("/messages/users");
      set({ users: response.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const response = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: response.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (data) => {
    const { selectedUser, messages } = get();
    try {
      const response = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        data
      );
      set({ messages: [...messages, response.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  handleIncomingMessage: (newMessage) => {
    const { selectedUser, messages, unreadCounts } = get();

    const isCurrentChat =
      selectedUser && newMessage.senderId === selectedUser._id;

    if (isCurrentChat) {
      set({ messages: [...messages, newMessage] });
    } else {
      const currentCount = unreadCounts[newMessage.senderId] || 0;
      set({
        unreadCounts: {
          ...unreadCounts,
          [newMessage.senderId]: currentCount + 1,
        },
      });
    }
  },

  setTypingUser: (userId) => set({ typingUserId: userId }),

  clearTypingUser: (userId) => {
    const { typingUserId } = get();
    if (typingUserId === userId) {
      set({ typingUserId: null });
    }
  },

  setSelectedUser: (selectedUser) => {
    const { unreadCounts } = get();

    if (selectedUser && unreadCounts[selectedUser._id]) {
      const { [selectedUser._id]: _removed, ...rest } = unreadCounts;
      set({ selectedUser, unreadCounts: rest });
    } else {
      set({ selectedUser });
    }
  },
}));
