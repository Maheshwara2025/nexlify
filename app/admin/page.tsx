"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  // Flash
  const [flashMsg, setFlashMsg] = useState("");
  const [flashLink, setFlashLink] = useState("https://wa.me/919502336495");
  const [flashSaving, setFlashSaving] = useState(false);
  const [flashStatus, setFlashStatus] = useState("");
  const [currentFlash, setCurrentFlash] = useState("");

  // News
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
  const [location, setLocation] = useState("Mutharam");
  const [category, setCategory] = useState("General");
  const [newsSaving, setNewsSaving] = useState(false);
  const [newsStatus, setNewsStatus] = useState("");
  const [uploading, setUploading] = useState(false);
  const [recentNews, setRecentNews] = useState<any[]>([]);

  // Gallery
  const [gTitle, setGTitle] = useState("");
  const [gDesc, setGDesc] = useState("");
  const [gCategory, setGCategory] = useState("General");
  const [gImageUrl, setGImageUrl] = useState("");
  const [gUploading, setGUploading] = useState(false);
  const [gSaving, setGSaving] = useState(false);
  const [gStatus, setGStatus] = useState("");

  // Contacts
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    async function init() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/admin/login");
        return;
      }
      setEmail(user.email || "");
      setLoading(false);

      const { data: flash } = await supabase
        .from("flash_messages")
        .select("message")
        .eq("active", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (flash) setCurrentFlash(flash.message);

      const { data: news } = await supabase
        .from("news")
        .select("id, title, created_at")
        .order("created_at", { ascending: false })
        .limit(5);
      setRecentNews(news || []);

      const { data: msgs } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);
      setContacts(msgs || []);
    }
    init();
  }, [router]);

  async function saveFlash() {
    if (!flashMsg.trim()) {
      setFlashStatus("Message type చేయండి");
      return;
    }
    setFlashSaving(true);
    setFlashStatus("");
    await supabase.from("flash_messages").update({ active: false }).eq("active", true);
    const { error } = await supabase.from("flash_messages").insert({
      message: flashMsg.trim(),
      link: flashLink.trim() || null,
      active: true,
    });
    setFlashSaving(false);
    if (error) setFlashStatus("Error: " + error.message);
    else {
      setFlashStatus("✅ Flash saved");
      setCurrentFlash(flashMsg.trim());
      setFlashMsg("");
    }
  }

  async function clearFlash() {
    await supabase.from("flash_messages").update({ active: false }).eq("active", true);
    setCurrentFlash("");
    setFlashStatus("Flash cleared");
  }

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setNewsStatus("");
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("news-media").upload(fileName, file);
    if (error) {
      setNewsStatus("Upload error: " + error.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("news-media").getPublicUrl(fileName);
    setImageUrl(data.publicUrl);
    setUploading(false);
    setNewsStatus("✅ Image uploaded");
  }

  async function saveNews() {
    if (!title.trim() || !content.trim()) {
      setNewsStatus("Title & content required");
      return;
    }
    setNewsSaving(true);
    setNewsStatus("");
    const { error } = await supabase.from("news").insert({
      title: title.trim(),
      content: content.trim(),
      sub_headline_1: sub1.trim() || null,
      sub_headline_2: sub2.trim() || null,
      sub_headline_3: sub3.trim() || null,
      sub_headline_4: sub4.trim() || null,
      sub_headline_5: sub5.trim() || null,
      sub_headline_6: sub6.trim() || null,
      image_url: imageUrl.trim() || null,
      video_url: videoUrl.trim() || null,
      location: location.trim() || "Mutharam",
      category: category.trim() || "General",
    });
    setNewsSaving(false);
    if (error) setNewsStatus("Error: " + error.message);
    else {
      setNewsStatus("✅ News published!");
      setTitle("");
      setContent("");
      setSub1("");
      setSub2("");
      setSub3("");
      setSub4("");
      setSub5("");
      setSub6("");
      setImageUrl("");
      setVideoUrl("");
      const { data } = await supabase
        .from("news")
        .select("id, title, created_at")
        .order("created_at", { ascending: false })
        .limit(5);
      setRecentNews(data || []);
    }
  }

  async function uploadGalleryImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setGUploading(true);
    setGStatus("");
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("gallery").upload(fileName, file);
    if (error) {
      setGStatus("Upload error: " + error.message);
      setGUploading(false);
      return;
    }
    const { data } = supabase.storage.from("gallery").getPublicUrl(fileName);
    setGImageUrl(data.publicUrl);
    setGUploading(false);
    setGStatus("✅ Image uploaded");
  }

  async function saveGallery() {
    if (!gTitle.trim() || !gImageUrl.trim()) {
      setGStatus("Title + image required");
      return;
    }
    setGSaving(true);
    setGStatus("");
    const { error } = await supabase.from("gallery").insert({
      title: gTitle.trim(),
      description: gDesc.trim() || null,
      image_url: gImageUrl.trim(),
      category: gCategory.trim() || "General",
    });
    setGSaving(false);
    if (error) setGStatus("Error: " + error.message);
    else {
      setGStatus("✅ Photo saved! /gallery refresh చేయండి");
      setGTitle("");
      setGDesc("");
      setGCategory("General");
      setGImageUrl("");
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
        Loading admin...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div>
          <p className="font-bold">Admin Panel</p>
          <p className="text-xs text-slate-400">{email}</p>
        </div>
        <div className="flex gap-4 text-sm">
          <Link href="/" className="text-slate-300 hover:text-white">View site</Link>
          <Link href="/gallery" className="text-slate-300 hover:text-white">Gallery</Link>
          <button onClick={logout} className="text-red-300 hover:text-red-200">Logout</button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* FLASH */}
        <section className="bg-white rounded-2xl border shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-1">⚡ Flash Message</h2>
          <p className="text-sm text-slate-500 mb-4">Home LIVE bar</p>
          {currentFlash ? (
            <div className="mb-4 p-3 bg-slate-900 text-white rounded-xl text-sm">
              <span className="bg-red-500 text-[10px] font-black px-1.5 py-0.5 rounded mr-2">LIVE</span>
              {currentFlash}
              <button onClick={clearFlash} className="block mt-2 text-red-300 text-xs hover:underline">Clear</button>
            </div>
          ) : (
            <p className="text-sm text-slate-400 mb-4">No active flash</p>
          )}
          <div className="space-y-3">
            <input value={flashMsg} onChange={(e) => setFlashMsg(e.target.value)} placeholder="Message" className="w-full border rounded-xl px-4 py-3 text-sm" />
            <input value={flashLink} onChange={(e) => setFlashLink(e.target.value)} placeholder="Link optional" className="w-full border rounded-xl px-4 py-3 text-sm" />
            <button onClick={saveFlash} disabled={flashSaving} className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl text-sm disabled:opacity-50">
              {flashSaving ? "Saving..." : "Save Flash"}
            </button>
            {flashStatus && <p className="text-sm text-green-600 text-center">{flashStatus}</p>}
          </div>
        </section>

        {/* GALLERY */}
        <section className="bg-white rounded-2xl border shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-1">📷 Gallery upload</h2>
          <p className="text-sm text-slate-500 mb-4">Photo → /gallery page</p>
          <div className="space-y-3">
            <input
              value={gTitle}
              onChange={(e) => setGTitle(e.target.value)}
              placeholder="Title * (e.g. బోనాలు 2026)"
              className="w-full border rounded-xl px-4 py-3 text-sm font-medium"
            />
            <textarea
              value={gDesc}
              onChange={(e) => setGDesc(e.target.value)}
              placeholder="Description (optional)"
              rows={3}
              className="w-full border rounded-xl px-4 py-3 text-sm resize-y"
            />
            <input
              value={gCategory}
              onChange={(e) => setGCategory(e.target.value)}
              placeholder="Category (Festival / Agriculture / Panchayat)"
              className="w-full border rounded-xl px-4 py-3 text-sm"
            />
            <div>
              <label className="text-sm font-medium text-slate-700">Photo</label>
              <input type="file" accept="image/*" onChange={uploadGalleryImage} className="w-full border rounded-xl px-4 py-3 mt-1 text-sm" />
              {gUploading && <p className="text-xs text-orange-600 mt-1">Uploading...</p>}
              {gImageUrl && (
                <img src={gImageUrl} alt="preview" className="h-36 rounded-xl object-cover border mt-2" />
              )}
            </div>
            <button
              onClick={saveGallery}
              disabled={gSaving || gUploading}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl text-sm disabled:opacity-50"
            >
              {gSaving ? "Saving..." : "Save to Gallery"}
            </button>
            {gStatus && <p className="text-sm text-green-600 text-center">{gStatus}</p>}
          </div>
        </section>

        {/* NEWS */}
        <section className="bg-white rounded-2xl border shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-1">📰 Publish News</h2>
          <p className="text-sm text-slate-500 mb-4">Headline + sub headlines + image</p>
          <div className="space-y-3">
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Headline / Title *" className="w-full border rounded-xl px-4 py-3 text-sm font-medium" />
            <input value={sub1} onChange={(e) => setSub1(e.target.value)} placeholder="Sub headline 1" className="w-full border rounded-xl px-4 py-3 text-sm" />
            <input value={sub2} onChange={(e) => setSub2(e.target.value)} placeholder="Sub headline 2" className="w-full border rounded-xl px-4 py-3 text-sm" />
            <input value={sub3} onChange={(e) => setSub3(e.target.value)} placeholder="Sub headline 3" className="w-full border rounded-xl px-4 py-3 text-sm" />
            <input value={sub4} onChange={(e) => setSub4(e.target.value)} placeholder="Sub headline 4" className="w-full border rounded-xl px-4 py-3 text-sm" />
            <input value={sub5} onChange={(e) => setSub5(e.target.value)} placeholder="Sub headline 5" className="w-full border rounded-xl px-4 py-3 text-sm" />
            <input value={sub6} onChange={(e) => setSub6(e.target.value)} placeholder="Sub headline 6" className="w-full border rounded-xl px-4 py-3 text-sm" />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Full content *" rows={5} className="w-full border rounded-xl px-4 py-3 text-sm resize-y" />
            <div>
              <label className="text-sm font-medium text-slate-700">News image</label>
              <input type="file" accept="image/*" onChange={uploadImage} className="w-full border rounded-xl px-4 py-3 mt-1 text-sm" />
              {uploading && <p className="text-xs text-orange-600 mt-1">Uploading...</p>}
              {imageUrl && <img src={imageUrl} alt="" className="h-28 rounded-xl object-cover border mt-2" />}
            </div>
            <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Or image URL" className="w-full border rounded-xl px-4 py-3 text-sm" />
            <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="YouTube link" className="w-full border rounded-xl px-4 py-3 text-sm" />
            <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="w-full border rounded-xl px-4 py-3 text-sm" />
            <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" className="w-full border rounded-xl px-4 py-3 text-sm" />
            <button onClick={saveNews} disabled={newsSaving || uploading} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl text-sm disabled:opacity-50">
              {newsSaving ? "Publishing..." : "Publish News"}
            </button>
            {newsStatus && <p className="text-sm text-green-600 text-center">{newsStatus}</p>}
          </div>
        </section>

        {/* RECENT NEWS */}
        <section className="bg-white rounded-2xl border shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Recent news</h2>
          {recentNews.length === 0 ? (
            <p className="text-sm text-slate-400">No news</p>
          ) : (
            <ul className="space-y-2">
              {recentNews.map((n) => (
                <li key={n.id} className="flex justify-between text-sm border-b pb-2">
                  <Link href={`/news/${n.id}`} className="font-medium hover:text-orange-600 line-clamp-1">{n.title}</Link>
                  <span className="text-xs text-slate-400 ml-2">{new Date(n.created_at).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* CONTACTS */}
        <section className="bg-white rounded-2xl border shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Contact messages</h2>
          {contacts.length === 0 ? (
            <p className="text-sm text-slate-400">No messages</p>
          ) : (
            <ul className="space-y-3">
              {contacts.map((c) => (
                <li key={c.id} className="text-sm border rounded-xl p-3 bg-slate-50">
                  <p className="font-semibold">{c.name} · {c.phone}</p>
                  <p className="text-slate-600 mt-1">{c.message}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}