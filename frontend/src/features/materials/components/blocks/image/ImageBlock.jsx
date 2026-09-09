import { useState, useEffect } from "react";
import ImageEditor from "./ImageEditor";
import { XIcon } from "../../../../../components/icons/index.jsx";

const INVALID_IMAGE_URL = "https://placehold.co/600x400?text=Invalid+Image+URL";

export default function ImageBlock({data, isEditing, setIsEditing, onDelete, onUpdate}){
    const [currentData, setCurrentData] = useState(data);
    const [draftData, setDraftData] = useState(data);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    // keeping the block synchronized with external data
    useEffect(() => {
        setCurrentData(data);

        if (!isEditing) {
            setDraftData(data);
        }
    }, [data, isEditing]);

    // initializing draft data 
    useEffect(() => {
        if (isEditing) {
            setDraftData(currentData);
        }
    }, [isEditing, currentData]);

    // preventing the document behind the lightbox from scrolling
    useEffect(() => {
        if (!isLightboxOpen) {
            return;
        }

        const previousOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isLightboxOpen]);

    // closing the lightbox if editing starts
    useEffect(() => {
        if (isEditing && isLightboxOpen) {
            setIsLightboxOpen(false);
        }
    }, [isEditing, isLightboxOpen]);

    if (!currentData?.url && !isEditing) {
        return null;
    }

    const handleSave = () => {
        setCurrentData(draftData);
        setDraftData(draftData);
        setIsEditing(false);

        onUpdate?.(draftData);
    };

    const handleCancel = () => {
        setDraftData(currentData);
        setIsEditing(false);
    };

    const displayData = isEditing ? draftData : currentData;

    return (
        <div className="my-6"> 
            {/* Parameter Editor */}
            {/* <div className="mb-6">
                {isEditing && (
                    <ParameterEditor 
                        title="Image" 
                        onSave={handleSave} 
                        onCancel={handleCancel}
                        onDelete={onDelete}
                    >
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                Image URL
                            </label>
                            <input 
                                type="url" 
                                value={draftData.url}
                                onChange={(e) => setDraftData({...draftData, url: e.target.value})}
                                className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                Caption (Optional)
                            </label>
                            <input 
                                type="text" 
                                value={draftData.caption || ""}
                                onChange={(e) => setDraftData({...draftData, caption: e.target.value})}
                                className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100"
                                placeholder="A descriptive caption..."
                            />
                        </div>
                    </ParameterEditor>
                )}
            </div> */}
            
            {/* Parameter Editor */}
            {isEditing && (
                <ImageEditor
                    data={draftData}
                    onChange={setDraftData}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    onDelete={onDelete}
                />
            )}

            {/* Image Render */}
            <figure className="flex flex-col items-center group/image relative">
                <div
                    className={`relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 shadow-sm 
                        ${!isEditing ? 'cursor-zoom-in' : ''}
                    `}
                    onClick={() => !isEditing && setIsLightboxOpen(true)}
                >
                    <img
                        src={isEditing ? draftData.url : currentData.url} 
                        alt={draftData.caption || "Study material visual"}
                        className="max-w-full h-auto object-cover transition-transform duration-300 group-hover/image:scale-[1.01]"
                        loading="lazy"
                        onError={(e) => { e.target.src = "https://placehold.co/600x400?text=Invalid+Image+URL" }}
                    />
                </div>
                {(isEditing ? draftData.caption : currentData.caption) && (
                    <figcaption className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-400 text-center max-w-lg">
                        {isEditing ? draftData.caption : currentData.caption}
                    </figcaption>
                )}
            </figure>

            {/* Fullscreen Overlay */}
            {isLightboxOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 animate-in fade-in duration-200"
                    onClick={() => setIsLightboxOpen(false)}
                >
                    <button
                        className="absolute top-6 right-6 text-white hover:text-indigo-400 transition-colors bg-black/50 hover:bg-black/80 rounded-full p-2"
                        onClick={() => setIsLightboxOpen(false)}
                    >
                        <XIcon className="h-8 w-8"/>
                    </button>
                    <img 
                        src={currentData.url} 
                        alt={currentData.caption}
                        className="max-w-full max-h-[90vh] object-contain rounded shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

        </div>
    );
}