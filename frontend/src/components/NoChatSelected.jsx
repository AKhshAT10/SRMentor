import { GraduationCap } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center mb-4">
          <div className="size-16 rounded-3xl bg-primary/10 flex items-center justify-center animate-bounce">
            <GraduationCap className="size-8 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold">Welcome to SRMentor</h2>
        <p className="text-base-content/60">
          Pick a mentor or mentee from the list to start a conversation.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
