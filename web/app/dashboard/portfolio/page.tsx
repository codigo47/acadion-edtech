'use client';

import { useState, useEffect, KeyboardEvent } from 'react';
import { useCourses } from '../../../lib/hooks/use-course';
import {
  useMyPortfolio,
  useUpdatePortfolio,
  useUpdatePortfolioCourses,
  usePortfolioAnalytics,
} from '../../../lib/hooks/use-portfolio';
import { useUser, useUpdateProfile } from '../../../lib/hooks/use-auth';
import { PORTFOLIO_THEMES } from '../../../lib/portfolio-themes';

interface MediaItem {
  url: string;
  description: string;
}

interface CustomLink {
  label: string;
  url: string;
}

export default function PortfolioSettingsPage() {
  const { user } = useUser();
  const { data: courses } = useCourses();
  const { data: portfolio, isLoading } = useMyPortfolio();
  const updatePortfolio = useUpdatePortfolio();
  const updateCourses = useUpdatePortfolioCourses();
  const { data: analytics } = usePortfolioAnalytics();

  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [bio, setBio] = useState('');
  const [portraitImage, setPortraitImage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [theme, setTheme] = useState('corporate_professional');
  const [skills, setSkills] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [socialLinkedin, setSocialLinkedin] = useState('');
  const [socialTwitter, setSocialTwitter] = useState('');
  const [socialInstagram, setSocialInstagram] = useState('');
  const [socialCustom, setSocialCustom] = useState<CustomLink[]>([]);
  const [images, setImages] = useState<MediaItem[]>([]);
  const [videos, setVideos] = useState<MediaItem[]>([]);
  const [isPublic, setIsPublic] = useState(true);
  const [selectedCourseIds, setSelectedCourseIds] = useState<number[]>([]);
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const updateProfile = useUpdateProfile();

  const [skillInput, setSkillInput] = useState('');
  const [langInput, setLangInput] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
    }
  }, [user]);

  useEffect(() => {
    if (portfolio) {
      setTitle(portfolio.title || '');
      setTagline((portfolio as any).tagline || '');
      setBio(portfolio.bio || '');
      setPortraitImage((portfolio as any).portraitImage || '');
      setCoverImage((portfolio as any).coverImage || '');
      setEmail((portfolio as any).email || '');
      setPhone((portfolio as any).phone || '');
      setTheme((portfolio as any).theme || 'corporate_professional');
      setSkills((portfolio as any).skills || []);
      setLanguages((portfolio as any).languages || []);
      setSocialLinkedin((portfolio as any).socialLinkedin || '');
      setSocialTwitter((portfolio as any).socialTwitter || '');
      setSocialInstagram((portfolio as any).socialInstagram || '');
      setSocialCustom((portfolio as any).socialCustom || []);
      setImages(
        ((portfolio as any).images || []).map((i: any) => ({
          url: i.url,
          description: i.description || '',
        })),
      );
      setVideos(
        ((portfolio as any).videos || []).map((v: any) => ({
          url: v.url,
          description: v.description || '',
        })),
      );
      setIsPublic(portfolio.isPublic ?? true);
      setSelectedCourseIds(
        portfolio.courses?.map((c: any) => c.course?.id || c.id) || [],
      );
    }
  }, [portfolio]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase();
    setUsername(val);
    if (val && !/^[a-z0-9_-]{3,30}$/.test(val)) {
      setUsernameError('3-30 chars, lowercase letters, numbers, hyphens and underscores');
    } else {
      setUsernameError('');
    }
  };

  const handleSave = async () => {
    if (usernameError) return;
    if (username && username !== user?.username) {
      await updateProfile.mutateAsync({ username });
    }
    await updatePortfolio.mutateAsync({
      title,
      tagline,
      bio,
      portraitImage: portraitImage || undefined,
      coverImage: coverImage || undefined,
      email: email || undefined,
      phone: phone || undefined,
      theme,
      skills,
      languages,
      socialLinkedin: socialLinkedin || undefined,
      socialTwitter: socialTwitter || undefined,
      socialInstagram: socialInstagram || undefined,
      socialCustom: socialCustom.filter((l) => l.label && l.url),
      images: images.filter((i) => i.url),
      videos: videos.filter((v) => v.url),
      isPublic,
    });
    await updateCourses.mutateAsync(selectedCourseIds);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const toggleCourse = (courseId: number) => {
    setSelectedCourseIds((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId],
    );
  };

  const addSkill = () => {
    const v = skillInput.trim();
    if (v && !skills.includes(v)) {
      setSkills([...skills, v]);
    }
    setSkillInput('');
  };

  const addLanguage = () => {
    const v = langInput.trim();
    if (v && !languages.includes(v)) {
      setLanguages([...languages, v]);
    }
    setLangInput('');
  };

  const handleTagKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    addFn: () => void,
  ) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addFn();
    }
  };

  const portfolioUrl = username ? `/p/${username}` : null;
  const isSaving = updatePortfolio.isPending || updateCourses.isPending || updateProfile.isPending;

  const inputClass =
    'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#9F80DA] transition-colors';
  const labelClass = 'block text-sm font-medium text-gray-700 mb-2';
  const sectionClass = 'space-y-4';

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a1a]">Portfolio Settings</h1>
            <p className="text-gray-500 text-sm mt-1">Customize your public portfolio and profile.</p>
          </div>
          <div className="flex items-center gap-3">
            {portfolioUrl && (
              <a
                href={portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#9F80DA] hover:underline"
              >
                View Portfolio
              </a>
            )}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white rounded-lg text-sm font-medium hover:from-[#8A6BC5] hover:to-[#7B5BB5] transition-all disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </div>

        {saveSuccess && (
          <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
            Portfolio saved successfully!
          </div>
        )}

        {portfolioUrl && (
          <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm flex items-center gap-2">
            <span className="text-gray-500">Your portfolio URL:</span>
            <a
              href={portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9F80DA] font-medium hover:underline"
            >
              acadion.ai{portfolioUrl}
            </a>
          </div>
        )}

        {isLoading ? (
          <div className="py-20 text-center text-gray-400">Loading...</div>
        ) : (
          <div className="space-y-8">
            {/* Visibility Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div>
                <h3 className="font-medium text-[#1a1a1a]">Public portfolio</h3>
                <p className="text-sm text-gray-500 mt-0.5">
                  Anyone with the link can view your portfolio
                </p>
              </div>
              <button
                onClick={() => setIsPublic(!isPublic)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isPublic ? 'bg-[#9F80DA]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isPublic ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Username */}
            <div className={sectionClass}>
              <h2 className="text-lg font-semibold text-[#1a1a1a]">Username</h2>
              <div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">@</span>
                  <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="your_username"
                    className={`w-full border rounded-xl pl-8 pr-4 py-3 text-sm outline-none transition-colors ${
                      usernameError ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-[#9F80DA]'
                    }`}
                  />
                </div>
                {usernameError ? (
                  <p className="mt-1.5 text-xs text-red-500">{usernameError}</p>
                ) : username ? (
                  <p className="mt-1.5 text-xs text-gray-400">
                    Your portfolio will be at acadion.ai/p/{username}
                  </p>
                ) : (
                  <p className="mt-1.5 text-xs text-gray-400">
                    Set a username to get a public portfolio URL
                  </p>
                )}
              </div>
            </div>

            {/* Profile Section */}
            <div className={sectionClass}>
              <h2 className="text-lg font-semibold text-[#1a1a1a]">Profile</h2>
              <div>
                <label className={labelClass}>Portfolio title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="My portfolio"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Full-stack developer & AI enthusiast"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell visitors about yourself and your work..."
                  rows={4}
                  className={`${inputClass} resize-none`}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Portrait image URL</label>
                  <input
                    type="text"
                    value={portraitImage}
                    onChange={(e) => setPortraitImage(e.target.value)}
                    placeholder="https://..."
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Cover image URL</label>
                  <input
                    type="text"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://..."
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className={sectionClass}>
              <h2 className="text-lg font-semibold text-[#1a1a1a]">Contact</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 234 567 890"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className={sectionClass}>
              <h2 className="text-lg font-semibold text-[#1a1a1a]">
                Social Links
              </h2>
              <div>
                <label className={labelClass}>LinkedIn</label>
                <input
                  type="text"
                  value={socialLinkedin}
                  onChange={(e) => setSocialLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Twitter / X</label>
                <input
                  type="text"
                  value={socialTwitter}
                  onChange={(e) => setSocialTwitter(e.target.value)}
                  placeholder="https://x.com/..."
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Instagram</label>
                <input
                  type="text"
                  value={socialInstagram}
                  onChange={(e) => setSocialInstagram(e.target.value)}
                  placeholder="https://instagram.com/..."
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Custom links</label>
                {socialCustom.map((link, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => {
                        const updated = [...socialCustom];
                        updated[i] = { ...updated[i], label: e.target.value };
                        setSocialCustom(updated);
                      }}
                      placeholder="Label"
                      className={`${inputClass} flex-1`}
                    />
                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) => {
                        const updated = [...socialCustom];
                        updated[i] = { ...updated[i], url: e.target.value };
                        setSocialCustom(updated);
                      }}
                      placeholder="https://..."
                      className={`${inputClass} flex-1`}
                    />
                    <button
                      onClick={() =>
                        setSocialCustom(socialCustom.filter((_, j) => j !== i))
                      }
                      className="px-3 py-2 text-red-400 hover:text-red-600 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() =>
                    setSocialCustom([...socialCustom, { label: '', url: '' }])
                  }
                  className="text-sm text-[#9F80DA] hover:underline mt-1"
                >
                  + Add custom link
                </button>
              </div>
            </div>

            {/* Skills */}
            <div className={sectionClass}>
              <h2 className="text-lg font-semibold text-[#1a1a1a]">Skills</h2>
              <div className="flex flex-wrap gap-2 mb-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-[#9F80DA]/10 text-[#9F80DA] rounded-full text-sm"
                  >
                    {skill}
                    <button
                      onClick={() => setSkills(skills.filter((s) => s !== skill))}
                      className="ml-1 hover:text-[#7B5BB5]"
                    >
                      x
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => handleTagKeyDown(e, addSkill)}
                  placeholder="Type a skill and press Enter"
                  className={`${inputClass} flex-1`}
                />
                <button
                  onClick={addSkill}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Languages */}
            <div className={sectionClass}>
              <h2 className="text-lg font-semibold text-[#1a1a1a]">
                Languages
              </h2>
              <div className="flex flex-wrap gap-2 mb-2">
                {languages.map((lang) => (
                  <span
                    key={lang}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-[#9F80DA]/10 text-[#9F80DA] rounded-full text-sm"
                  >
                    {lang}
                    <button
                      onClick={() =>
                        setLanguages(languages.filter((l) => l !== lang))
                      }
                      className="ml-1 hover:text-[#7B5BB5]"
                    >
                      x
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={langInput}
                  onChange={(e) => setLangInput(e.target.value)}
                  onKeyDown={(e) => handleTagKeyDown(e, addLanguage)}
                  placeholder="Type a language and press Enter"
                  className={`${inputClass} flex-1`}
                />
                <button
                  onClick={addLanguage}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Image Gallery */}
            <div className={sectionClass}>
              <h2 className="text-lg font-semibold text-[#1a1a1a]">
                Image Gallery
              </h2>
              {images.map((img, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <input
                    type="text"
                    value={img.url}
                    onChange={(e) => {
                      const updated = [...images];
                      updated[i] = { ...updated[i], url: e.target.value };
                      setImages(updated);
                    }}
                    placeholder="Image URL"
                    className={`${inputClass} flex-1`}
                  />
                  <input
                    type="text"
                    value={img.description}
                    onChange={(e) => {
                      const updated = [...images];
                      updated[i] = {
                        ...updated[i],
                        description: e.target.value,
                      };
                      setImages(updated);
                    }}
                    placeholder="Caption (optional)"
                    className={`${inputClass} flex-1`}
                  />
                  <button
                    onClick={() => setImages(images.filter((_, j) => j !== i))}
                    className="px-3 py-3 text-red-400 hover:text-red-600 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() =>
                  setImages([...images, { url: '', description: '' }])
                }
                className="text-sm text-[#9F80DA] hover:underline"
              >
                + Add image
              </button>
            </div>

            {/* Video Gallery */}
            <div className={sectionClass}>
              <h2 className="text-lg font-semibold text-[#1a1a1a]">
                Video Gallery
              </h2>
              {videos.map((vid, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <input
                    type="text"
                    value={vid.url}
                    onChange={(e) => {
                      const updated = [...videos];
                      updated[i] = { ...updated[i], url: e.target.value };
                      setVideos(updated);
                    }}
                    placeholder="Video URL"
                    className={`${inputClass} flex-1`}
                  />
                  <input
                    type="text"
                    value={vid.description}
                    onChange={(e) => {
                      const updated = [...videos];
                      updated[i] = {
                        ...updated[i],
                        description: e.target.value,
                      };
                      setVideos(updated);
                    }}
                    placeholder="Caption (optional)"
                    className={`${inputClass} flex-1`}
                  />
                  <button
                    onClick={() => setVideos(videos.filter((_, j) => j !== i))}
                    className="px-3 py-3 text-red-400 hover:text-red-600 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() =>
                  setVideos([...videos, { url: '', description: '' }])
                }
                className="text-sm text-[#9F80DA] hover:underline"
              >
                + Add video
              </button>
            </div>

            {/* Theme Selector */}
            <div className={sectionClass}>
              <h2 className="text-lg font-semibold text-[#1a1a1a]">Theme</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {PORTFOLIO_THEMES.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTheme(t.key)}
                    className={`p-3 rounded-xl border-2 transition-all text-left ${
                      theme === t.key
                        ? 'border-[#9F80DA] shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex gap-1 mb-2">
                      {t.colors.map((color, i) => (
                        <div
                          key={i}
                          className="w-5 h-5 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <p className="text-xs font-medium text-gray-700 leading-tight">
                      {t.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Course Selection */}
            <div className={sectionClass}>
              <h2 className="text-lg font-semibold text-[#1a1a1a]">
                Visible Courses
              </h2>
              <p className="text-sm text-gray-500">
                Choose which completed courses appear in your portfolio
              </p>
              {!courses ||
              courses.filter((c) => c.status === 'completed').length === 0 ? (
                <p className="text-sm text-gray-400 italic p-4 bg-gray-50 rounded-xl">
                  You don&apos;t have any completed courses yet.
                </p>
              ) : (
                <div className="space-y-2">
                  {courses
                    .filter((c) => c.status === 'completed')
                    .map((course) => (
                      <label
                        key={course.id}
                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:border-[#9F80DA] transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCourseIds.includes(course.id)}
                          onChange={() => toggleCourse(course.id)}
                          className="accent-[#9F80DA] w-4 h-4"
                        />
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#9F80DA]/20 to-[#8A6BC5]/20 flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-4 h-4 text-[#9F80DA]/60"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-[#1a1a1a]">
                          {course.title || 'Untitled Course'}
                        </span>
                      </label>
                    ))}
                </div>
              )}
            </div>

            {/* Analytics Summary */}
            <div className={sectionClass}>
              <h2 className="text-lg font-semibold text-[#1a1a1a]">
                Analytics
              </h2>
              {analytics ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="text-2xl font-bold text-[#9F80DA]">
                      {analytics.totalVisits}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Total visits</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="text-2xl font-bold text-[#9F80DA]">
                      {analytics.countries.length}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Countries</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="text-2xl font-bold text-[#9F80DA]">
                      {analytics.courseOpens.reduce(
                        (sum, c) => sum + c.count,
                        0,
                      )}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Course opens</p>
                  </div>
                  {analytics.countries.length > 0 && (
                    <div className="col-span-full p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Top countries
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {analytics.countries.slice(0, 10).map((c) => (
                          <span
                            key={c.country}
                            className="px-2 py-1 bg-white rounded-lg text-xs border border-gray-200"
                          >
                            {c.country} ({c.count})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {analytics.courseOpens.length > 0 && (
                    <div className="col-span-full p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Course opens
                      </p>
                      <div className="space-y-1">
                        {analytics.courseOpens.map((c) => (
                          <div
                            key={c.courseId}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-gray-600">{c.title}</span>
                            <span className="text-gray-900 font-medium">
                              {c.count}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic p-4 bg-gray-50 rounded-xl">
                  Analytics will appear once your portfolio receives visits.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
