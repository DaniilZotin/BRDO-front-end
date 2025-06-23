import { DataGrid } from '@mui/x-data-grid'
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { IconButton, Tooltip } from '@mui/material'
import BlockIcon from '@mui/icons-material/Block'
import SchoolIcon from '@mui/icons-material/SchoolRounded'
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjectsRounded'
import LocalLibraryIcon from '@mui/icons-material/LocalLibraryRounded'
import { blue, green, amber } from '@mui/material/colors'
import type { SchoolTableProps, SchoolDto } from '../models/interfaces'

const typeIcon = {
	LYCEUM: <SchoolIcon sx={{ color: blue[500] }} />,
	ЛІЦЕЙ: <SchoolIcon sx={{ color: blue[500] }} />,
	GYMNASIUM: <EmojiObjectsIcon sx={{ color: green[500] }} />,
	ГІМНАЗІЯ: <EmojiObjectsIcon sx={{ color: green[500] }} />,
	ZZSO: <LocalLibraryIcon sx={{ color: amber[800] }} />,
	ЗЗСО: <LocalLibraryIcon sx={{ color: amber[800] }} />,
}

export default function SchoolTable({
	rows,
	rowCount,
	loading,
	paginationModel,
	onPaginationModelChange,
	onDeactivate,
}: SchoolTableProps) {
	const columns: GridColDef<SchoolDto>[] = [
		{
			field: 'icon',
			headerName: '',
			width: 46,
			sortable: false,
			filterable: false,
			disableColumnMenu: true,
			renderCell: ({ row }) => typeIcon[row.type],
		},
		{ field: 'name', headerName: 'Назва', flex: 1, minWidth: 150 },
		{ field: 'region', headerName: 'Регіон', flex: 1, minWidth: 120 },
		{ field: 'type', headerName: 'Тип', width: 110 },
		{
			field: 'isActive',
			headerName: 'Активні ?',
			width: 100,
			cellClassName: ({ value }) => (value ? 'active-yes' : 'active-no'),
			valueFormatter: (value?: boolean) => (value ? 'Так' : 'Ні'),
		},
		{
			field: 'actions',
			headerName: '',
			width: 80,
			sortable: false,
			renderCell: ({ row }: GridRenderCellParams<SchoolDto>) => {
				if (!row.isActive) return null

				return (
					<Tooltip title='Deactivate'>
						<IconButton size='small' onClick={() => onDeactivate(row.id)}>
							<BlockIcon fontSize='small' color='error' />
						</IconButton>
					</Tooltip>
				)
			},
		},
	]

	return (
		<DataGrid<SchoolDto>
			rows={rows}
			columns={columns}
			pagination
			paginationMode='server'
			rowCount={rowCount}
			paginationModel={paginationModel}
			onPaginationModelChange={onPaginationModelChange}
			loading={loading}
			disableRowSelectionOnClick
			sx={{
				height: '100%',
				width: '100%',
				'& .active-yes': { color: green[600], fontWeight: 600 },
				'& .active-no': { color: amber[800], fontWeight: 600 },
				minHeight: '300px'
			}}
		/>
	)
}
