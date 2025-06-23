import { api } from '@/api/axios'

import type { CreateSchoolDto } from '../types'
import type { Filters, SchoolDto } from '../models/interfaces'

export interface SchoolsPageResponse {
	content: SchoolDto[]
	totalElements: number
}

export function fetchSchools(
	page: number,
	size: number,
	{ region, type, isActive }: Filters
) {
	return api.get<SchoolsPageResponse>('/api/v1/schools', {
		params: {
			page,
			size,
			region: region.trim() || undefined,
			type: type || undefined,
			isActive: isActive === '' ? undefined : isActive,
		},
	})
}

export function createSchool(dto: CreateSchoolDto) {
	return api.post('/api/v1/schools', dto)
}

export function deactivateSchool(id: string) {
	return api.patch(`/api/v1/schools/${id}/deactivate`)
}
