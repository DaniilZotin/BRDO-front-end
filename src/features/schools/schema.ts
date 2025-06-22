import * as z from 'zod'

export const schoolSchema = z.object({
	name: z
		.string()
		.min(4)
		.max(100)
		.regex(/^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґa-zA-Z0-9№\s\-']+$/),
	edrpou: z.string().regex(/^\d{8}$/),
	region: z
		.string()
		.min(4)
		.max(50)
		.regex(/^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґa-zA-Z\s\-']+$/),
	type: z.enum(['LYCEUM', 'ЛІЦЕЙ', 'GYMNASIUM', 'ГІМНАЗІЯ', 'ZZSO', 'ЗЗСО']),
})
export type CreateSchool = z.infer<typeof schoolSchema>
