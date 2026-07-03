import { GraduationCap, MessagesSquare, Users } from "lucide-react";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center bg-base-200 p-12 relative overflow-hidden">
      <div className="absolute -top-24 -left-16 w-80 h-80 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute bottom-0 -right-16 w-80 h-80 rounded-full bg-secondary/15 blur-3xl" />

      <div className="relative max-w-md text-center">
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[GraduationCap, MessagesSquare, Users, Users, GraduationCap, MessagesSquare, MessagesSquare, Users, GraduationCap].map(
            (Icon, i) => (
              <div
                key={i}
                className={`aspect-square rounded-3xl bg-primary/10 flex items-center justify-center ${
                  i % 2 === 0 ? "animate-pulse" : ""
                }`}
              >
                <Icon className="size-7 text-primary/70" />
              </div>
            )
          )}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60 leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
