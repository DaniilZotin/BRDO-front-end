// src/theme/getTheme.ts
import { createTheme } from '@mui/material/styles'
import { blue, grey, amber, green } from '@mui/material/colors'
import '@mui/x-data-grid/themeAugmentation';

export type Mode = 'light' | 'dark'

export default function getTheme(mode: Mode) {
  const isDark = mode === 'dark'

  return createTheme({
		palette: {
			mode,
			primary: { main: blue[600] },
			secondary: { main: green[600] },
			warning: { main: amber[700] },
			background: {
				default: isDark ? '#121212' : '#f5f7fb',
				paper: isDark ? '#1d1d1d' : '#fff',
			},
		},
		shape: { borderRadius: 12 },
		typography: { fontFamily: 'Inter, Roboto, sans-serif' },

		components: {
			MuiPaper: { styleOverrides: { root: { padding: 24 } } },
			MuiButton: {
				styleOverrides: { root: { borderRadius: 8, fontWeight: 600 } },
			},
			MuiTextField: { defaultProps: { variant: 'outlined', size: 'small' } },
			MuiDataGrid: {
				styleOverrides: {
					root: { backgroundColor: isDark ? '#1d1d1d' : '#fff' },
					columnHeaders: { backgroundColor: isDark ? '#1f1f1f' : '#fff' },
					columnHeader: { backgroundColor: isDark ? '#1f1f1f' : '#fff' },
					scrollbarFiller: {
						backgroundColor: isDark ? '#1f1f1f !important' : '#fff !important',
					},
					row: {
						'&:hover': { backgroundColor: isDark ? grey[900] : grey[100] },
					},
				},
			},
		},
	})
}
