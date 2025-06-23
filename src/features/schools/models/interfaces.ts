import type { CreateSchoolDto } from '../types'
import { type GridPaginationModel } from '@mui/x-data-grid'

export const SCHOOL_TYPES = [
	{ label: 'ЛІЦЕЙ', value: 'LYCEUM' },
	{ label: 'ГІМНАЗІЯ', value: 'GYMNASIUM' },
	{ label: 'ЗЗСО', value: 'ZZSO' },
] as const

export type SchoolType = (typeof SCHOOL_TYPES)[number]['value']

export interface Filters {
	region: string
	type: '' | SchoolType
	isActive: '' | boolean
}

export interface SchoolFiltersProps {
	value: Filters
	onChange: (f: Filters) => void
	onClear: () => void
}

export interface SchoolTableProps {
	rows: SchoolDto[]
	rowCount: number
	paginationModel: GridPaginationModel
	onPaginationModelChange: (m: GridPaginationModel) => void
	loading: boolean
	onDeactivate: (id: string) => void
}

export interface SchoolFormProps {
	onSubmit: (dto: CreateSchoolDto) => Promise<void> | void
}

export interface SchoolDto {
	id: string
	name: string
	edrpou: string
	region: string
	type: 'LYCEUM' | 'GYMNASIUM' | 'ZZSO'
	isActive: boolean
}
