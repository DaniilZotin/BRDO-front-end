import { createContext } from 'react'
import type { Mode } from './getTheme'

export interface Ctx {
	mode: Mode
	toggle: () => void
}

export const ColorModeCtx = createContext<Ctx | null>(null)
