import { useEffect, useState } from "react";
import TableEditor from "./TableEditor";
import { normalizeTableData } from "./tableUtils";

export default function TableBlock({data, isEditing, setIsEditing, onDelete, onUpdate}) {
    const [currentData, setCurrentData] = useState(
        () => normalizeTableData(data)
    );

    const [draftData, setDraftData] = useState(
        () => normalizeTableData(data)
    );

    // keeping the block synchronized if its data changes externally
    useEffect(() => {
        const normalizedData = normalizeTableData(data);

        setCurrentData(normalizedData);

        if (!isEditing) {
            setDraftData(normalizedData);
        }
    }, [data, isEditing]);

    // syncing editor data with block on opening editor
    useEffect(() => {
        if (isEditing) {
            setDraftData(currentData);
        }
    }, [isEditing, currentData]);

    const handleSave = () => {
        const normalizedData = normalizeTableData(draftData);

        setCurrentData(normalizedData);
        setDraftData(normalizedData);
        setIsEditing(false);

        onUpdate?.(normalizedData);
    };

    const handleCancel = () => {
        setDraftData(currentData);
        setIsEditing(false);
    };

    if (!currentData) {
        return null;
    }

    return (
        <div className="my-6">

            {/* Parameter Editor */}
            {isEditing && (
                <TableEditor
                    data={draftData}
                    onChange={setDraftData}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    onDelete={onDelete}
                />
            )}

            {/* Table */}
            {!isEditing && (
                <figure className="w-full">
                    <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm dark:border-slate-700">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr>
                                    {currentData.columns.map((column, index) => (
                                        <th
                                            key={index}
                                            className="border-b border-r border-slate-200 bg-slate-50 px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-700 last:border-r-0 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                                        >
                                            {column}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {currentData.rows.map((row, rowIndex) => (
                                    <tr
                                        key={rowIndex}
                                        className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/50"
                                    >
                                        {currentData.columns.map((_, columnIndex) => (
                                            <td
                                                key={columnIndex}
                                                className="border-b border-r border-slate-200 px-4 py-3 text-slate-700 last:border-r-0 dark:border-slate-700 dark:text-slate-300"
                                            >
                                                { row[columnIndex] ?? "" }
                                            </td>
                                        ))}

                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>


                    {currentData.caption && (
                        <figcaption className="mt-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400">
                            {currentData.caption}
                        </figcaption>
                    )}

                </figure>
            )}
            

        </div>
    );
}