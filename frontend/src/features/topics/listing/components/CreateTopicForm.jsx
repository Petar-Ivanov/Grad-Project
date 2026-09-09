import { useEffect, useState } from "react";
import { getAvailableCategories } from "../../config/topicThemes";
import { UploadImageIcon } from "../../../../components/icons";

const CATEGORIES = getAvailableCategories();

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () =>
        resolve(reader.result);

      reader.onerror = () =>
        reject(new Error("Failed to read image."));

      reader.readAsDataURL(file);
    }
  );
}


export default function CreateTopicForm({ onSubmit, onCancel, isSubmitting = false,}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: CATEGORIES[0] ?? "",
    isPublic: false,
    bannerUrl: null, 
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageError, setImageError] = useState(null);

  useEffect(() => {
    return () => {
        /* blob url */
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setImageError(null);

    if (!file.type.startsWith("image/")) {
      setImageError("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image must be 5MB or smaller.");
      return;
    }

    try 
    {
      const dataUrl =
        await readFileAsDataUrl(file);

      setPreviewUrl(dataUrl);

      setFormData((previous) => ({
        ...previous,
        bannerUrl: dataUrl,
      }));

    } catch (error) {
      setImageError(error.message);
    }
  };

  const removeImage = () => {
    setPreviewUrl(null);
    setFormData((prev) => ({ ...prev, bannerUrl: null }));
  };

  //

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const name = formData.name.trim();

    if (!name) {
      return;
    }

    const payload = {
      name,

      description:
        formData.description.trim() || null,

      category:
        formData.category,

      is_public:
        formData.isPublic,

      banner_url:
        formData.bannerUrl,
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Banner */}
      <div className="space-y-2">

        <label className="block text-sm font-semibold text-slate-900 dark:text-white">
          Topic Banner <span className="text-slate-400 font-normal">(Optional)</span>
        </label>
        
        <div className="mt-1 flex justify-center rounded-xl border border-dashed border-slate-300 px-6 py-8 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">
          <div className="text-center w-full">
            {previewUrl 
            ? (
              <div className="relative mx-auto max-w-md">
                <img 
                    src={previewUrl} 
                    alt="Banner Preview" 
                    className="h-40 w-full object-cover rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm" 
                />
                <button 
                    type="button" 
                    onClick={removeImage} 
                    className="absolute -top-3 -right-3 rounded-full bg-red-100 p-1.5 text-red-600 shadow-sm hover:bg-red-200 dark:bg-red-900/80 dark:text-red-200 transition-colors"
                >
                  <UploadImageIcon/>
                </button>
              </div>
            ) : (
              <>
                <svg className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                </svg>

                <div className="mt-4 flex flex-col sm:flex-row items-center justify-center text-sm leading-6 text-slate-600 dark:text-slate-400 gap-1">
                  <label 
                    htmlFor="file-upload" 
                    className="relative cursor-pointer rounded-md font-semibold text-indigo-600 hover:text-indigo-500 focus-within:outline-none dark:text-indigo-400 transition-colors"
                  >
                    <span>Upload a file</span>
                    <input 
                      id="file-upload" 
                      name="file-upload" 
                      type="file" 
                      className="sr-only" 
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleImageChange} 
                    />
                  </label>
                  <p>or drag and drop</p>
                </div>

                <p className="text-xs leading-5 text-slate-500 dark:text-slate-500 mt-1">
                  PNG, JPG, WEBP up to 5MB
                </p>
              </>
            )}

            {imageError && (
              <p className="mt-3 text-xs font-semibold text-red-500">
                {imageError}
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Topic Name */}
      <div className="space-y-2">
        <label 
          htmlFor="name" 
          className="block text-sm font-semibold text-slate-900 dark:text-white"
        >
          Topic Name <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="e.g., Quantum Mechanics Fundamentals"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-950 transition-all"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label 
          htmlFor="description" 
          className="block text-sm font-semibold text-slate-900 dark:text-white"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          rows={3}
          placeholder="Briefly describe what this topic covers..."
          value={formData.description}
          onChange={handleChange}
          className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-950 transition-all"
        />
      </div>

      {/* Category Selection */}
      <div className="space-y-2">
        <label 
          htmlFor="category" 
          className="block text-sm font-semibold text-slate-900 dark:text-white"
        >
          Category
        </label>

        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-950 transition-all"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Visibility Toggle */}
      <div className="pt-2">

        <label className="flex items-start gap-3 cursor-pointer group">

          <div className="relative flex items-center pt-0.5">

            <input
              type="checkbox"
              name="isPublic"
              checked={formData.isPublic}
              onChange={handleChange}
              className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 bg-slate-50 checked:border-indigo-600 checked:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:checked:bg-indigo-500 dark:focus:ring-offset-slate-900 transition-all"
            />

            <svg
              className="pointer-events-none absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>

          </div>

          <div className="flex flex-col">

            <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              Make this topic public
            </span>

            <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              If checked, this topic will appear in the Public Library tab for all users.
            </span>

          </div>

        </label>

      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 rounded-lg bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-colors dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
        >
          {
            isSubmitting
              ? "Creating..."
              : "Initialize Topic"
          }
        </button>

      </div>
    </form>
  );
}
