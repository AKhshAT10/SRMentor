import { useChatStore } from '../store/useChatStore';
import SideBar from '../components/SideBar';
import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from '../components/ChatContainer';

function HomePage() {
  const { selectedUser } = useChatStore();
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='flex items-center justify-center pt-20 px-4'>
        <div className='bg-base-100 rounded-3xl shadow-soft border border-base-300/60 w-full max-w-6xl h-[calc(100vh-7rem)]'>
          <div className='flex h-full rounded-3xl overflow-hidden'>
            <SideBar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
