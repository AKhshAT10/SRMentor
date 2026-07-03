import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from '../store/useAuthStore';
import { X } from 'lucide-react';

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="p-3 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="size-11 rounded-full object-cover border border-base-300"
            />
            {isOnline && (
              <span className="absolute bottom-0 right-0 size-3 bg-success rounded-full ring-2 ring-base-100" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{selectedUser.fullName}</h3>
              <span className={`badge badge-xs ${selectedUser.role === "mentor" ? "badge-primary" : "badge-secondary"}`}>
                {selectedUser.role === "mentor" ? "Mentor" : "Mentee"}
              </span>
            </div>
            <p className="text-xs text-base-content/60">
              {[selectedUser.year, selectedUser.branch].filter(Boolean).join(" | ")}
              {selectedUser.year || selectedUser.branch ? " | " : ""}
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <button onClick={() => setSelectedUser(null)} className="btn btn-sm btn-ghost btn-circle">
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
