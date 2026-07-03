import { useThemeStore } from "../store/useThemeStore";
import { THEMES, THEME_LABELS } from "../constants/index.js";
import { Send, Check } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hi senior, how do I join a club?", isSent: false },
  { id: 2, content: "Easy! Come to the orientation, I will introduce you.", isSent: true },
];

function SettingsPage() {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen container mx-auto px-4 pt-24 pb-12 max-w-4xl">
      <div className="space-y-8">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold">Appearance</h2>
          <p className="text-base-content/60">Choose how SRMentor looks</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`relative rounded-2xl border p-4 text-left transition-all ${
                theme === t ? "border-primary ring-1 ring-primary" : "border-base-300 hover:border-primary/50"
              }`}
              onClick={() => setTheme(t)}
            >
              {theme === t && (
                <span className="absolute top-3 right-3 text-primary"><Check className="size-5" /></span>
              )}
              <div className="h-16 w-full rounded-xl overflow-hidden mb-3" data-theme={t}>
                <div className="h-full w-full grid grid-cols-4 gap-1 p-2 bg-base-100">
                  <div className="rounded bg-primary" />
                  <div className="rounded bg-secondary" />
                  <div className="rounded bg-accent" />
                  <div className="rounded bg-base-300" />
                </div>
              </div>
              <span className="font-semibold">{THEME_LABELS[t] || t}</span>
            </button>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Preview</h3>
          <div className="rounded-2xl border border-base-300 overflow-hidden bg-base-100 shadow-soft">
            <div className="p-6 bg-base-200">
              <div className="max-w-lg mx-auto">
                <div className="bg-base-100 rounded-2xl shadow-sm overflow-hidden border border-base-300">
                  <div className="px-4 py-3 border-b border-base-300">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                        A
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">Aarav (Mentor)</h3>
                        <p className="text-xs text-base-content/60">Online</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-4 min-h-52 max-h-52 overflow-y-auto">
                    {PREVIEW_MESSAGES.map((message) => (
                      <div key={message.id} className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] rounded-2xl p-3 shadow-sm ${
                            message.isSent ? "bg-primary text-primary-content" : "bg-base-200"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-[10px] mt-1.5 ${message.isSent ? "text-primary-content/70" : "text-base-content/60"}`}>
                            12:00
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border-t border-base-300">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="input input-bordered flex-1 text-sm h-10 rounded-xl"
                        placeholder="Type a message..."
                        value="Thank you so much!"
                        readOnly
                      />
                      <button className="btn btn-primary h-10 min-h-0 rounded-xl">
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
