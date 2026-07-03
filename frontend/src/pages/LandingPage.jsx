import { Link } from "react-router-dom";
import { GraduationCap, MessagesSquare, Users, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import Scene3D from "../components/Scene3D";
import { useAuthStore } from "../store/useAuthStore";

const features = [
  {
    icon: Users,
    title: "Same college, real seniors",
    text: "Every mentor is a verified SRM senior, so the advice actually fits your campus, branch and clubs.",
  },
  {
    icon: MessagesSquare,
    title: "Chat in real time",
    text: "Message a mentor instantly, share screenshots of doubts and get replies the moment they come online.",
  },
  {
    icon: ShieldCheck,
    title: "Guidance you can trust",
    text: "From first week nerves to internships, ask anything in a friendly space made only for SRM students.",
  },
];

const steps = [
  { n: "1", title: "Create your account", text: "Sign up as a first year mentee in under a minute." },
  { n: "2", title: "Find your mentor", text: "Browse seniors by branch, year and interests." },
  { n: "3", title: "Start the conversation", text: "Say hello and get guidance whenever you need it." },
];

const LandingPage = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-24 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute top-40 -right-24 w-96 h-96 rounded-full bg-secondary/20 blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-5 pt-28 pb-16 grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              <Sparkles className="size-4" />
              Made for SRM first year students
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Find a senior mentor from your own college
            </h1>
            <p className="mt-5 text-lg text-base-content/70 max-w-xl mx-auto lg:mx-0">
              SRMentor pairs new students with experienced seniors from the same campus.
              Ask questions, settle in faster and grow with someone who has been exactly where you are.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
              {authUser ? (
                <Link to="/chat" className="btn btn-primary btn-lg rounded-full gap-2 shadow-soft">
                  Open your dashboard <ArrowRight className="size-5" />
                </Link>
              ) : (
                <>
                  <Link to="/signup" className="btn btn-primary btn-lg rounded-full gap-2 shadow-soft">
                    Get started free <ArrowRight className="size-5" />
                  </Link>
                  <Link to="/login" className="btn btn-outline btn-lg rounded-full">
                    I already have an account
                  </Link>
                </>
              )}
            </div>
            <div className="mt-8 flex items-center gap-6 justify-center lg:justify-start text-sm text-base-content/60">
              <div className="flex items-center gap-2">
                <GraduationCap className="size-5 text-primary" /> Verified seniors
              </div>
              <div className="flex items-center gap-2">
                <MessagesSquare className="size-5 text-primary" /> Live chat
              </div>
            </div>
          </div>

          {/* 3D scene */}
          <div className="rounded-[2rem] glass shadow-glass border border-base-300/60 p-4">
            <Scene3D />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Why students love it</h2>
          <p className="mt-3 text-base-content/70">
            A calm, friendly place to get real answers from people who understand SRM.
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-3xl bg-base-100 border border-base-300/70 p-7 shadow-soft hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <f.icon className="size-6 text-primary" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-base-content/70 leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="rounded-[2rem] bg-base-200 border border-base-300/60 p-8 sm:p-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-center tracking-tight">How it works</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.n} className="text-center">
                <div className="mx-auto size-14 rounded-full bg-primary text-primary-content flex items-center justify-center text-2xl font-bold shadow-soft">
                  {s.n}
                </div>
                <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-base-content/70">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-5 pb-24">
        <div className="rounded-[2rem] bg-primary text-primary-content p-10 sm:p-14 text-center shadow-glass">
          <h2 className="text-3xl sm:text-4xl font-bold">Your SRM journey is easier with a mentor</h2>
          <p className="mt-3 text-primary-content/80 max-w-xl mx-auto">
            Join today and connect with a senior who can guide you through your first year.
          </p>
          <div className="mt-8">
            <Link
              to={authUser ? "/chat" : "/signup"}
              className="btn btn-lg rounded-full bg-base-100 text-primary hover:bg-base-100/90 border-0 gap-2"
            >
              {authUser ? "Go to dashboard" : "Create my free account"} <ArrowRight className="size-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-base-300/60 py-8">
        <div className="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-base-content/60">
          <div className="flex items-center gap-2">
            <GraduationCap className="size-5 text-primary" />
            <span className="font-semibold">SRMentor</span>
          </div>
          <p>Built for SRM students, by SRM students.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
