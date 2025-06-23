import React, { useMemo, useState } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import getTheme, { type Mode } from './getTheme'
import { ColorModeCtx } from './ColorModeCtx'

interface Ctx {
	mode: Mode
	toggle: () => void
}

export const ColorModeProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const system = window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light'
	const [mode, setMode] = useState<Mode>(
		() => (localStorage.getItem('colorMode') as Mode) || system
	)

	const ctx = useMemo<Ctx>(
		() => ({
			mode,
			toggle: () =>
				setMode(prev => {
					const next = prev === 'light' ? 'dark' : 'light'
					localStorage.setItem('colorMode', next)
					return next
				}),
		}),
		[mode]
	)

	return (
		<ColorModeCtx.Provider value={ctx}>
			<ThemeProvider theme={getTheme(mode)}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ColorModeCtx.Provider>
	)
}
