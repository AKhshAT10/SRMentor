import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, GraduationCap, BookOpen, Sparkles, Save, Loader2 } from "lucide-react";
import { BRANCHES, YEARS } from "../constants";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [form, setForm] = useState({
    role: authUser?.role || "mentee",
    year: authUser?.year || "1st Year",
    branch: authUser?.branch || "CSE",
    bio: authUser?.bio || "",
    interests: (authUser?.interests || []).join(", "),
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const handleSave = async () => {
    await updateProfile({
      role: form.role,
      year: form.year,
      branch: form.branch,
      bio: form.bio,
      interests: form.interests
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-base-200 rounded-3xl p-8 space-y-8 shadow-soft border border-base-300/60">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Your profile</h1>
            <p className="mt-1 text-base-content/60">Keep your details fresh so the right people find you</p>
          </div>

          {/* avatar upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-base-100 shadow-soft"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-primary text-primary-content hover:scale-105 p-2.5 rounded-full cursor-pointer transition-all duration-200 shadow-soft ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="size-5" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <div className="flex items-center gap-2">
              <span className={`badge ${authUser?.role === "mentor" ? "badge-primary" : "badge-secondary"} badge-lg`}>
                {authUser?.role === "mentor" ? "Mentor" : "Mentee"}
              </span>
              <p className="text-sm text-base-content/50">
                {isUpdatingProfile ? "Uploading..." : "Tap the camera to update your photo"}
              </p>
            </div>
          </div>

          {/* read only identity */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="text-sm text-base-content/60 flex items-center gap-2">
                <User className="size-4" /> Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-100 rounded-xl border border-base-300">{authUser?.fullName}</p>
            </div>
            <div className="space-y-1.5">
              <div className="text-sm text-base-content/60 flex items-center gap-2">
                <Mail className="size-4" /> Email
              </div>
              <p className="px-4 py-2.5 bg-base-100 rounded-xl border border-base-300 truncate">{authUser?.email}</p>
            </div>
          </div>

          {/* editable mentor details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="form-control">
                <label className="label"><span className="label-text flex items-center gap-1.5"><Sparkles className="size-4" /> Role</span></label>
                <select className="select select-bordered rounded-xl" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                  <option value="mentee">Mentee</option>
                  <option value="mentor">Mentor</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text flex items-center gap-1.5"><GraduationCap className="size-4" /> Year</span></label>
                <select className="select select-bordered rounded-xl" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })}>
                  {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div className="form-control col-span-2 sm:col-span-1">
                <label className="label"><span className="label-text flex items-center gap-1.5"><BookOpen className="size-4" /> Branch</span></label>
                <select className="select select-bordered rounded-xl" value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })}>
                  {BRANCHES.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">About you</span></label>
              <textarea
                className="textarea textarea-bordered rounded-xl min-h-24"
                placeholder="Tell others what you can help with or what you want to learn"
                maxLength={300}
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Interests (comma separated)</span></label>
              <input
                type="text"
                className="input input-bordered rounded-xl"
                placeholder="DSA, Internships, Robotics"
                value={form.interests}
                onChange={(e) => setForm({ ...form, interests: e.target.value })}
              />
            </div>

            <button className="btn btn-primary w-full rounded-xl shadow-soft" onClick={handleSave} disabled={isUpdatingProfile}>
              {isUpdatingProfile ? <Loader2 className="size-5 animate-spin" /> : <Save className="size-5" />}
              Save changes
            </button>
          </div>

          <div className="bg-base-100 rounded-2xl p-5 border border-base-300">
            <h2 className="text-lg font-semibold mb-3">Account information</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between py-1.5 border-b border-base-300">
                <span className="text-base-content/60">Member since</span>
                <span>{authUser?.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-base-content/60">Status</span>
                <span className="text-success font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
