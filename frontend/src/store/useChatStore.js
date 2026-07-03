import { create } from "zustand";
import toast from 'react-hot-toast';
import {axiosInstance} from "../lib/axios.js";
import {useAuthStore} from './useAuthStore.js';

export const useChatStore = create((set,get)=>({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async (role) => {
        set({isUsersLoading: true});
        try{
           const url = role === "mentor" || role === "mentee" ? `/messages/users?role=${role}` : "/messages/users";
           const res = await axiosInstance.get(url);
           set({users: res.data});
        }catch(error){
           toast.error(error.response?.data?.message || "Could not load people");
        }finally{
           set({isUsersLoading: false});
        }
    },

    getMessages: async (userId) => {
         set({isMessagesLoading: true});
         try{
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages: res.data});
         }catch(error){
            toast.error(error.response.data.message); 
         }finally{
            set({isMessagesLoading: false});
         }
    },

    sendMessage: async (messageData) => {
        const {selectedUser,messages} = get()
        try{
         const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData);
         set({messages:[...messages,res.data]});
        }catch(error){
          toast.error(error.response.data.error);
        }
    },

    subscribeToMessages: () => {
      const {selectedUser} = get()
      if(!selectedUser) return;

      const socket = useAuthStore.getState().socket;

      //optimize later 
     socket.on("newMessage",(newMessage)=>{
     const isFromCurrentChat = newMessage.senderId === selectedUser._id;
     if(!isFromCurrentChat) return;

     set({
    messages: [...get().messages,newMessage],
     });
   });
   }, 

    unsubscribeFromMessages: () => {
      const socket = useAuthStore.getState().socket;
      socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => set({selectedUser}),
}));