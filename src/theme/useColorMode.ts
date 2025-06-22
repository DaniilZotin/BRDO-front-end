import { useContext } from 'react'
import { ColorModeCtx } from './ColorModeCtx'

export const useColorMode = () => {
	const ctx = useContext(ColorModeCtx)
	if (!ctx)
		throw new Error('useColorMode must be used inside <ColorModeProvider>')
	return ctx
}
