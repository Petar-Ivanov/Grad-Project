import ParameterEditor from "../../ParameterEditor";
import {
    addTableColumn,
    addTableRow,
    removeTableColumn,
    removeTableRow,
    updateTableCell,
    updateTableColumn,
} from "./tableUtils";

export default function TableEditor({data, onChange, onSave, onCancel, onDelete,}) {
    const handleColumnChange = (index, value) => {
        onChange(
            updateTableColumn(data, index, value)
        );
    };

    const handleCellChange = (rowIndex, columnIndex, value) => {
        onChange(
            updateTableCell(data, rowIndex, columnIndex, value)
        );
    };

    const handleAddColumn = () => {
        onChange(addTableColumn(data));
    };

    const handleRemoveColumn = (index) => {
        onChange(removeTableColumn(data, index));
    };

    const handleAddRow = () => {
        onChange(addTableRow(data));
    };

    const handleRemoveRow = (index) => {
        onChange(removeTableRow(data, index));
    };

    return (
       <div className="mb-6">
            <ParameterEditor
                title="Table"
                onSave={onSave}
                onCancel={onCancel}
                onDelete={onDelete}
            >
                {/* Caption */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Caption
                    </label>

                    <input
                        type="text"
                        value={data.caption}
                        onChange={(e) =>
                            onChange({
                                ...data,
                                caption: e.target.value,
                            })
                        }
                        placeholder="A descriptive table caption..."
                        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    />
                </div>

                {/* Table Editor */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Table Data
                        </label>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={handleAddColumn}
                                className="px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-md border border-slate-300 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
                            >
                                + Column
                            </button>

                            <button
                                type="button"
                                onClick={handleAddRow}
                                className="px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-md border border-slate-300 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
                            >
                                + Row
                            </button>
                        </div>

                    </div>

                    {/* Table Data View */}
                    <div className="overflow-x-auto border border-slate-200 rounded-lg dark:border-slate-700">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr>
                                    {data.columns.map((column, columnIndex) => (
                                        <th
                                            key={columnIndex}
                                            className="min-w-[150px] border-b border-r border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-900"
                                        >
                                            <div className="flex gap-1">
                                                <input
                                                    type="text"
                                                    value={column}
                                                    onChange={(event) =>
                                                        handleColumnChange(
                                                            columnIndex,
                                                            event.target.value
                                                        )
                                                    }
                                                    className="w-full min-w-0 rounded border border-slate-300 bg-white px-2 py-1.5 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-950 dark:text-white"
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveColumn(columnIndex)}
                                                    disabled={data.columns.length <= 1}
                                                    className="px-1.5 text-slate-400 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-30"
                                                    aria-label={`Remove ${column}`}
                                                >
                                                    ×
                                                </button>

                                            </div>

                                        </th>
                                    ))}

                                    <th className="w-10 bg-slate-50 dark:bg-slate-900" />
                                </tr>
                            </thead>

                            <tbody>
                                {data.rows.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {data.columns.map((_, columnIndex) => (
                                            <td 
                                                key={columnIndex}
                                                className="border-b border-r border-slate-200 p-2 dark:border-slate-700"
                                            >
                                                <input
                                                    type="text"
                                                    value={row[columnIndex] ?? ""}
                                                    onChange={(event) =>
                                                        handleCellChange(
                                                            rowIndex,
                                                            columnIndex,
                                                            event.target.value
                                                        )
                                                    }
                                                    className="w-full min-w-[120px] rounded border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                                                />

                                            </td>
                                        ))}

                                        <td className="border-b border-slate-200 p-1 text-center dark:border-slate-700">
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveRow(rowIndex)}
                                                disabled={data.rows.length <= 1}
                                                className="px-1.5 text-slate-400 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-30"
                                                aria-label={`Remove row ${rowIndex + 1}`}
                                            >
                                                ×
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>

                </div>

            </ParameterEditor>
        </div>
    );
}
