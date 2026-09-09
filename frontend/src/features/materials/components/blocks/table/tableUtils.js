/* Data Normalization */
export function normalizeTableData(data) {
    const columns =
        Array.isArray(data?.columns) && data.columns.length > 0
        ? data.columns.map((column) => String(column ?? ""))
        : ["Column 1"];

    const rows =
        Array.isArray(data?.rows)
            ? data.rows.map((row) => {
                  const normalizedRow =
                        Array.isArray(row)
                        ? row.map((cell) => String( cell ?? "" ))
                        : [];

                  return columns.map((_, index) => normalizedRow[index] ?? "" );
              })
            : [[""]];

    return {
        columns,
        rows: rows.length > 0 ? rows: [columns.map(() => "")],
        caption:
            typeof data?.caption ===
            "string"
                ? data.caption
                : "",
    };
}

export function updateTableColumn(data, columnIndex, value) {
    return {
        ...data,
        columns: data.columns.map((column, index) =>
            index === columnIndex
            ? value
            : column
        ),
    };
}

export function updateTableCell(data, rowIndex, columnIndex, value) {
    return {
        ...data,
        rows: data.rows.map((row, currentRowIndex) =>
            currentRowIndex === rowIndex
                ? row.map((cell, currentColumnIndex) =>
                      currentColumnIndex === columnIndex ? value : cell
                  )
                : row
        ),
    };
}

export function addTableColumn(data) {
    return {
        ...data,
        columns: [
            ...data.columns,
            `Column ${data.columns.length + 1}`,
        ],
        rows: data.rows.map((row) => [
            ...row,
            "",
        ]),
    };
}

export function removeTableColumn(data, columnIndex) {
    if (data.columns.length <= 1) {
        return data;
    }

    return {
        ...data,
        columns: data.columns.filter(
            (_, index) => index !== columnIndex
        ),
        rows: data.rows.map((row) =>
            row.filter(
                (_, index) => index !== columnIndex
            )
        ),
    };
}

export function addTableRow(data) {
    return {
        ...data,
        rows: [
            ...data.rows,
            Array(data.columns.length).fill(""),
        ],
    };
}

export function removeTableRow(data, rowIndex) {
    if (data.rows.length <= 1) {
        return data;
    }

    return {
        ...data,
        rows: data.rows.filter(
            (_, index) => index !== rowIndex
        ),
    };
}