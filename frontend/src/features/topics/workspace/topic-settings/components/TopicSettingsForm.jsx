import { getAvailableCategories } from "../../../config/topicThemes";
import { UploadImageIcon, XIcon } from "../../../../../components/icons";

const CATEGORIES = getAvailableCategories().map(
    (category) => ({
        value: category,
        label:
            category
                .replace(/\b\w/g, (char) =>
                    char.toUpperCase()
                ),
    })
);

export default function TopicSettingsForm({
    formData,
    previewUrl,
    theme,
    onChange,
    onImageChange,
    onRemoveImage,
    onSubmit,
    onCancel,
    isSubmitting = false,
}) {

    const themeBg = theme?.spine?.split(' ')[0] || 'bg-indigo-600';

    return (
        <form onSubmit={onSubmit} className="space-y-6 animate-in fade-in duration-300">
            
            {/* Banner Image Upload */}
            <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-900 dark:text-white">
                    Topic Banner
                </label>
                
                <div className={`mt-1 flex justify-center rounded-xl border-2 border-dashed px-6 py-8 transition-colors bg-slate-50 dark:bg-slate-900/50 ${theme.dropBorder} ${theme.dropBg}`}>
                    <div className="text-center w-full">
                        {
                            previewUrl 
                            ? (
                                <div className="relative mx-auto max-w-lg">
                                    <img 
                                        src={previewUrl} 
                                        alt="Banner Preview" 
                                        className="h-48 w-full object-cover rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm" 
                                    />
                                    <button 
                                        type="button" 
                                        onClick={onRemoveImage} 
                                        className="absolute -top-3 -right-3 rounded-full bg-red-100 p-2 text-red-600 shadow-sm hover:bg-red-200 dark:bg-red-900/80 dark:text-red-200 transition-colors"
                                    >
                                        <XIcon/>
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <UploadImageIcon className={`mx-auto h-12 w-12 opacity-50 ${theme.iconText}`} />
                                    <div className="mt-4 flex flex-col sm:flex-row items-center justify-center text-sm font-medium text-slate-600 dark:text-slate-400 gap-1.5">
                                        <label htmlFor="file-upload" className={`relative cursor-pointer rounded-md font-bold transition-colors ${theme.iconText} hover:opacity-80`}>
                                            <span>Upload an image</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={onImageChange} />
                                        </label>
                                        <p>or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2">16:9 aspect ratio recommended. PNG, JPG up to 5MB.</p>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
            
            {/* Name */}
            <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-900 dark:text-white">
                    Topic Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={onChange}
                    className={`w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition-all focus:bg-white border-transparent dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:bg-slate-950 ${theme.ring}`}
                />
            </div>

            {/* Description */}
            <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-900 dark:text-white">
                    Description
                </label>
                <textarea
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={onChange}
                    className={`w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:bg-white border-transparent dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:bg-slate-950 ${theme.ring}`}
                />
            </div>

            {/* Category */}
            <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-900 dark:text-white">
                    Category
                </label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={onChange}
                    className={`w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition-all focus:bg-white border-transparent dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:bg-slate-950 ${theme.ring}`}
                >
                    {CATEGORIES.map((category) => (
                        <option
                            key={category.value}
                            value={category.value}
                        >
                            {category.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Form Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-200 transition-colors dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={
                        !formData.name.trim() ||
                        isSubmitting
                    }
                    className={`flex-1 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90 disabled:opacity-50 ${themeBg}`}
                >
                    {
                        isSubmitting
                        ? "Saving..."
                        : "Save Changes"
                    }
                </button>
            </div>
        </form>
    );
}