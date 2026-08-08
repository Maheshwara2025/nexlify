"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type NewsItem = {
  id: number;
  title: string;
  content: string;
  sub_headline_1?: string;
  sub_headline_2?: string;
  sub_headline_3?: string;
  sub_headline_4?: string;
  sub_headline_5?: string;
  sub_headline_6?: string;
  image_url?: string;
  video_url?: string;
  location?: string;
  category?: string;
  created_at: string;
};

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sub1, setSub1] = useState("");
  const [sub2, setSub2] = useState("");
  const [sub3, setSub3] = useState("");
  const [sub4, setSub4] = useState("");
  const [sub5, setSub5] = useState("");
  const [sub6, setSub6] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("General");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    checkUser();
    fetchNews();
  }, []);

  // Copy-Paste image support
  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) {
            await uploadFile(file, "image");
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/admin/login");
    } else {
      setUser(user);
    }
    setLoading(false);
  }

  async function fetchNews() {
    const { data } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });
    setNews(data || []);
  }

  async function uploadFile(file: File, type: "image" | "video") {
    setUploading(true);
    setMessage("");

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

    const { error } = await supabase.storage
      .from("news-media")
      .upload(fileName, file);

    if (error) {
      setMessage("Upload error: " + error.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("news-media").getPublicUrl(fileName);
    const publicUrl = data.publicUrl;

    if (type === "image") {
      setImageUrl(publicUrl);
    } else {
      setVideoUrl(publicUrl);
    }

    setMessage(`${type === "image" ? "Image" : "Video"} uploaded successfully!`);
    setUploading(false);
  }

  async function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) await uploadFile(file, "image");
  }

  async function handleVideoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) await uploadFile(file, "video");
  }

  async function handleAddNews(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    const { error } = await supabase.from("news").insert([{
      title,
      content,
      sub_headline_1: sub1 || null,
      sub_headline_2: sub2 || null,
      sub_headline_3: sub3 || null,
      sub_headline_4: sub4 || null,
      sub_headline_5: sub5 || null,
      sub_headline_6: sub6 || null,
      image_url: imageUrl || null,
      video_url: videoUrl || null,
      location: location || null,
      category: category || "General",
    }]);

    setSubmitting(false);

    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("News published successfully!");
      setTitle("");
      setContent("");
      setSub1(""); setSub2(""); setSub3("");
      setSub4(""); setSub5(""); setSub6("");
      setImageUrl("");
      setVideoUrl("");
      setLocation("");
      setCategory("General");
      fetchNews();
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this news?")) return;
    await supabase.from("news").delete().eq("id", id);
    fetchNews();
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-sm text-gray-500">Nexlify Nucleus • Advanced News</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-gray-600 hover:text-orange-500">View Website</Link>
            <button onClick={handleLogout} className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-10">
          <h2 className="text-lg font-bold mb-6">Add Advanced News</h2>
          <form onSubmit={handleAddNews} className="space-y-5">

            {/* Category & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="General">General</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Panchayat">Panchayat</option>
                  <option value="Education">Education</option>
                  <option value="Business">Business</option>
                  <option value="CSC">CSC Services</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location / Town</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="ముత్తారం"
                />
              </div>
            </div>

            {/* Headline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Headline *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Main headline"
              />
            </div>

            {/* Sub Headlines */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Sub Headlines (optional)</label>
              {[sub1, sub2, sub3, sub4, sub5, sub6].map((val, i) => (
                <input
                  key={i}
                  type="text"
                  value={val}
                  onChange={(e) => {
                    const setters = [setSub1, setSub2, setSub3, setSub4, setSub5, setSub6];
                    setters[i](e.target.value);
                  }}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder={`Sub headline ${i + 1}`}
                />
              ))}
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Content *</label>
              <textarea
                required
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Full news content..."
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image (Upload or Ctrl+V Paste)
              </label>
              <div className="flex flex-wrap gap-3 items-center">
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  disabled={uploading}
                  className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium"
                >
                  {uploading ? "Uploading..." : "📷 Choose Image"}
                </button>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <span className="text-xs text-gray-400">or paste image with Ctrl+V</span>
              </div>
              {imageUrl && (
                <div className="mt-3">
                  <img src={imageUrl} alt="Preview" className="h-32 rounded-lg border object-cover" />
                  <button type="button" onClick={() => setImageUrl("")} className="text-xs text-red-500 mt-1">
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Video Upload */}
            {/* Video Section */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Video (Upload లేదా YouTube Link)
  </label>
  
  <div className="flex flex-wrap gap-3 items-center mb-3">
    <button
      type="button"
      onClick={() => videoInputRef.current?.click()}
      disabled={uploading}
      className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium"
    >
      {uploading ? "Uploading..." : "🎬 Upload Video File"}
    </button>
    <input
      ref={videoInputRef}
      type="file"
      accept="video/*"
      onChange={handleVideoSelect}
      className="hidden"
    />
  </div>

  <div>
    <input
      type="url"
      value={videoUrl}
      onChange={(e) => setVideoUrl(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
      placeholder="లేదా YouTube link పెట్టండి[](https://youtube.com/watch?v=...)"
    />
  </div>

  {videoUrl && (
    <div className="mt-2 flex items-center gap-3">
      <p className="text-sm text-green-600">Video ready ✓</p>
      <button type="button" onClick={() => setVideoUrl("")} className="text-xs text-red-500">
        Remove
      </button>
    </div>
  )}
</div>

            {message && (
              <p className={`text-sm ${message.includes("Error") || message.includes("error") ? "text-red-500" : "text-green-600"}`}>
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting || uploading}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition disabled:opacity-50"
            >
              {submitting ? "Publishing..." : "Publish News"}
            </button>
          </form>
        </div>

        {/* Existing News */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-lg font-bold mb-4">Published News ({news.length})</h2>
          {news.length === 0 ? (
            <p className="text-gray-500">No news yet.</p>
          ) : (
            <div className="space-y-4">
              {news.map((item) => (
                <div key={item.id} className="border rounded-xl p-4 flex justify-between items-start gap-4">
                  <div className="flex gap-4">
                    {item.image_url && (
                      <img src={item.image_url} alt="" className="w-20 h-20 rounded-lg object-cover" />
                    )}
                    <div>
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                        {item.category || "General"}
                      </span>
                      <h3 className="font-bold text-gray-900 mt-1">{item.title}</h3>
                      {item.location && <p className="text-xs text-gray-400">{item.location}</p>}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}