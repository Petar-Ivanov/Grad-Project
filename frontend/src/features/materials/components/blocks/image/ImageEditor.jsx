import ParameterEditor from "../../ParameterEditor";

export default function ImageEditor({ data, onChange, onSave, onCancel, onDelete }) 
{
    const handleUrlChange = (event) => {
        onChange({
            ...data,
            url: event.target.value,
        });
    };

    const handleCaptionChange = (event) => {
        onChange({
            ...data,
            caption: event.target.value,
        });
    };

    return(
        <div className="mb-6">
            {/* Parameter Editor */}
            <ParameterEditor 
                title="Image" 
                onSave={onSave} 
                onCancel={onCancel}
                onDelete={onDelete}
            >
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Image URL
                    </label>
                    <input 
                        type="url" 
                        value={data?.url ?? ""}
                        onChange={handleUrlChange}
                        className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100"
                        placeholder="https://example.com/image.jpg"
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label 
                        htmlFor="image-caption"
                        className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                    >
                        Caption (Optional)
                    </label>
                    <input 
                        id="image-caption"
                        type="text" 
                        value={data?.caption ?? ""}
                        onChange={handleCaptionChange}
                        className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100"
                        placeholder="A descriptive caption..."
                    />
                </div>
            </ParameterEditor>
        </div>
    );
}