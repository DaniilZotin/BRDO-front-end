import { createTheme } from '@mui/material/styles'
import { grey, blue, green, amber } from '@mui/material/colors'
import '@mui/x-data-grid/themeAugmentation'

export const theme = createTheme({
	palette: {
		mode: 'light',
		primary: { main: blue[600] },
		secondary: { main: green[600] },
		warning: { main: amber[700] },
		background: { default: '#f5f7fb', paper: '#fff' },
	},
	shape: { borderRadius: 12 },
	typography: { fontFamily: 'Inter, Roboto, sans-serif' },

	components: {
		MuiPaper: { styleOverrides: { root: { padding: 24, borderRadius: 12 } } },
		MuiButton: {
			styleOverrides: { root: { borderRadius: 8, fontWeight: 600 } },
		},
		MuiTextField: { defaultProps: { variant: 'outlined', size: 'small' } },
		MuiDataGrid: {
			styleOverrides: {
				root: {
					'& .MuiDataGrid-columnHeaders': {
						backgroundColor: '#fff',
						borderBottom: `1px solid ${grey[100]}`,
					},

					'& .MuiDataGrid-columnHeader': {
						backgroundColor: '#fff',
					},

					'& .MuiDataGrid-row:hover': {
						backgroundColor: grey[100],
					},
				},
			},
		},
	},
})
