import React from "react"

type Column<T> = {
    header: string
    accessor: keyof T | string
    render?: (row: T) => React.ReactNode
}

type TableProps<T> = {
    columns: Column<T>[]
    data: T[]
}

export default function Table<T>({columns, data}: TableProps<T>){
    return(
        <div className="tableContainer">
            <table className="customTable">
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={`${String(col.accessor)}-${index}`}>
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.map((row,rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((col, colIndex) => (
                                <td key={`${String(col.accessor)}-${colIndex}`}>
                                    {col.render
                                        ? col.render(row)
                                        : String(row[col.accessor as keyof T])
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}