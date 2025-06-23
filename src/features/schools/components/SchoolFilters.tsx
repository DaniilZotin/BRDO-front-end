import type { Filters, SchoolFiltersProps as Props } from '../models/interfaces'
import { SCHOOL_TYPES } from '../models/interfaces'
import {
	Stack,
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Button,
	type SelectChangeEvent,
} from '@mui/material'
import type { ChangeEvent } from 'react'

export default function SchoolFilters({ value, onChange, onClear }: Props) {
	const handleRegion = (e: ChangeEvent<HTMLInputElement>) =>
		onChange({ ...value, region: e.target.value })

	const handleSelect =
		<K extends 'type' | 'isActive'>(key: K) =>
		(e: SelectChangeEvent) => {
			const raw = e.target.value

			let result: Filters[K]

			if (key === 'isActive') {
				result = (raw === '' ? '' : raw === 'true') as Filters[K]
			} else {
				result = raw as Filters[K]
			}

			onChange({ ...value, [key]: result })
		}

	return (
		<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
			<TextField
				label='Регіон'
				value={value.region}
				onChange={handleRegion}
				size='small'
				error={value.region !== '' && value.region.trim().length < 4}
				helperText={
					value.region !== '' && value.region.trim().length < 4
						? 'Type at least 4 characters'
						: undefined
				}
			/>
			<FormControl size='small' sx={{ minWidth: 140 }}>
				<InputLabel>Тип</InputLabel>
				<Select label='Type' value={value.type} onChange={handleSelect('type')}>
					<MenuItem value=''>Всі</MenuItem>
					{SCHOOL_TYPES.map(opt => (
						<MenuItem key={opt.value} value={opt.value}>
							{opt.label} 
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl size='small' sx={{ minWidth: 140 }}>
				<InputLabel>Активні</InputLabel>
				<Select
					label='Активний'
					value={value.isActive === '' ? '' : String(value.isActive)}
					onChange={handleSelect('isActive')}
				>
					<MenuItem value=''>Всі</MenuItem>
					<MenuItem value='true'>Активні</MenuItem>
					<MenuItem value='false'>Неактивні</MenuItem>
				</Select>
			</FormControl>

			<Button
				variant='contained'
				color='primary'
				size='small'
				onClick={onClear}
				sx={{
					whiteSpace: 'nowrap',
					minWidth: 80,
					maxHeight: 40,
					boxShadow: 'none',
				}}
			>
				Очистити
			</Button>
		</Stack>
	)
}
