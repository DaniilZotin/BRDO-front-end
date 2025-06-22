import { z } from 'zod'
import { schoolSchema } from './schema'

export type CreateSchoolDto = z.infer<typeof schoolSchema>
