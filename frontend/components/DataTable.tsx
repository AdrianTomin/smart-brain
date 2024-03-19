/**
 * @file DataTable.tsx
 * @description This component renders a data table using the MUI DataGrid component. It receives data from an API response and displays it in a tabular format.
 */

import React from 'react';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { APIResponse } from '@/api/clarifaiService';

/**
 * @interface DataTableProps
 * @description Props interface for the DataTable component.
 */
interface DataTableProps {
	data: APIResponse[] | undefined;
}

/**
 * @interface RowData
 * @description Interface for defining the structure of row data.
 */
interface RowData {
	id: string;
	name: string;
	value: string;
}

/**
 * @constant columns
 * @description Column definitions for the data grid.
 */
const columns: GridColDef[] = [
	{ field: 'name', headerName: 'Content', width: 150 },
	{ field: 'value', headerName: 'Likeliness', width: 150 },
];

/**
 * @function DataTable
 * @param {DataTableProps} props - Props containing data for the table.
 * @returns {React.ReactElement} A DataTable component.
 */
export const DataTable = ({ data }: DataTableProps): React.ReactElement => {

	/**
	 * @function setRows
	 * @param {APIResponse[] | undefined} data - Data received from API.
	 * @returns {RowData[]} An array of RowData objects.
	 */
	const setRows = (data: APIResponse[] | undefined): RowData[] => {
		if (!data) {
			return [];
		}
		return data.map((item, index) => ({
			id: `ai_${index}`,
			name: item.name,
			value: `${(item.value * 100).toFixed(2)}%`,
		}));
	}

	// Set rows using received data
	const rows: RowData[] = setRows(data);

	return (
		<div style={{
			height: '100%', width: '100%'
		}}>
			<DataGrid
				sx={{
					'backgroundColor': 'rgb(209, 213, 219)',
					'color': 'rgb(40,40,50)',
				}}
				rows={rows}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: {
							page: 0,
							pageSize: 5
						},
					},
				}}
				pageSizeOptions={[5]}
			/>
		</div>
	);
}