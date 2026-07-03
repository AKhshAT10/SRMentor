import { useEffect, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import SideBarSkeleton from './skeletons/SideBarSkeleton';
import { Users, GraduationCap, Sparkles } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const FILTERS = [
  { key: "all", label: "All", icon: Users },
  { key: "mentor", label: "Mentors", icon: GraduationCap },
  { key: "mentee", label: "Mentees", icon: Sparkles },
];

const SideBar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const [roleFilter, setRoleFilter] = useState("all");
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers(roleFilter === "all" ? undefined : roleFilter);
  }, [getUsers, roleFilter]);

  const filteredUsers = showOnlineOnly ? users.filter((user) => onlineUsers.includes(user._id)) : users;

  if (isUsersLoading) return <SideBarSkeleton />;

  return (
    <aside className='h-full w-20 lg:w-80 border-r border-base-300 flex flex-col transition-all duration-200'>
      <div className='border-b border-base-300 w-full p-4'>
        <div className='flex items-center gap-2'>
          <Users className='size-5 text-primary' />
          <span className='font-semibold hidden lg:block'>Find people</span>
        </div>

        {/* Role filter tabs */}
        <div className='mt-3 hidden lg:flex bg-base-200 rounded-full p-1'>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setRoleFilter(f.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-medium py-1.5 rounded-full transition-all ${
                roleFilter === f.key ? "bg-primary text-primary-content shadow-soft" : "text-base-content/60 hover:text-base-content"
              }`}
            >
              <f.icon className='size-3.5' /> {f.label}
            </button>
          ))}
        </div>

        <div className='mt-3 hidden lg:flex items-center gap-2'>
          <label className='cursor-pointer flex items-center gap-2'>
            <input
              type='checkbox'
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className='checkbox checkbox-sm checkbox-primary'
            />
            <span className='text-sm'>Online only</span>
          </label>
          <span className='text-xs text-base-content/50'>({Math.max(onlineUsers.length - 1, 0)} online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3 flex-1">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-base-200 transition-colors ${
              selectedUser?._id === user._id ? "bg-base-200" : ""
            }`}
          >
            <div className="relative mx-auto lg:mx-0 shrink-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="size-12 object-cover rounded-full border border-base-300"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-success rounded-full ring-2 ring-base-100" />
              )}
            </div>

            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium truncate">{user.fullName}</span>
                <span className={`badge badge-xs ${user.role === "mentor" ? "badge-primary" : "badge-secondary"}`}>
                  {user.role === "mentor" ? "Mentor" : "Mentee"}
                </span>
              </div>
              <div className="text-xs text-base-content/50 truncate">
                {[user.year, user.branch].filter(Boolean).join(" | ") || (onlineUsers.includes(user._id) ? "Online" : "Offline")}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className='text-center text-base-content/50 py-6 px-4'>No people to show here yet</div>
        )}
      </div>
    </aside>
  );
};

export default SideBar;
