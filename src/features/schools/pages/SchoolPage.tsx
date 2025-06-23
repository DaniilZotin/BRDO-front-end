import { useState } from 'react'
import {
	Box,
	Container,
	Typography,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Snackbar,
} from '@mui/material'
import SchoolTable from '../components/SchoolTable'
import SchoolForm from '../components/SchoolForm'
import { type GridPaginationModel } from '@mui/x-data-grid'
import type { CreateSchoolDto } from '../types'
import { useCallback, useEffect } from 'react'
import type { Filters, SchoolDto } from '../models/interfaces'
import { IconButton, Tooltip } from '@mui/material'
import { useColorMode } from '@/theme/useColorMode'
import LightModeIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined'
import SchoolFilters from '../components/SchoolFilters'
import { fetchSchools, createSchool, deactivateSchool } from '../api/schoolApi'
import { Alert } from '@mui/material'
import axios from 'axios'

export default function SchoolsPage() {
	const { mode, toggle } = useColorMode()
	const [schools, setSchools] = useState<SchoolDto[]>([])
	const [rowCount, setRowCount] = useState(0)
	const [loading, setLoading] = useState(false)
	const [pendingId, setPendingId] = useState<string>()
	const [toast, setToast] = useState<string>()
	const [snack, setSnack] = useState<string | null>(null)

	const handleClose = () => setSnack(null)

	const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
		page: 0,
		pageSize: 10,
	})

	const defaultFilters: Filters = { region: '', type: '', isActive: '' }
	const [filters, setFilters] = useState<Filters>(defaultFilters)

	const loadSchools = useCallback(async () => {
		const { page, pageSize } = paginationModel
		const { region } = filters

		if (region.trim() !== '' && region.trim().length < 4) return

		setLoading(true)
		try {
			const { data } = await fetchSchools(page, pageSize, filters)
			setSchools(data.content)
			setRowCount(data.totalElements)
		} finally {
			setLoading(false)
		}
	}, [paginationModel, filters])

	useEffect(() => {
		loadSchools()
	}, [loadSchools])

	const handleCreate = async (dto: CreateSchoolDto) => {
		try {
			await createSchool(dto)

			setToast('School created')
			loadSchools()
		} catch (err) {
			if (axios.isAxiosError(err)) {
				if (err.response?.status === 409) {
					setToast('Школа з таким ЄДРПОУ вже існує')
				} else {
					setToast('Помилка при створенні школи')
				}
			}
		}
	}

	useEffect(() => {
		loadSchools()
	}, [loadSchools])

	const handleDeactivate = async () => {
		if (!pendingId) return
		setSchools(prev =>
			prev.map(s => (s.id === pendingId ? { ...s, isActive: false } : s))
		)

		try {
			await deactivateSchool(pendingId)
			setToast('School deactivated')
		} catch (e) {
			console.log('Error from back-end is ', e)
			setSchools(prev =>
				prev.map(s => (s.id === pendingId ? { ...s, isActive: true } : s))
			)
			setToast('Failed to deactivate')
		} finally {
			setPendingId(undefined)
		}
	}

	return (
		<Container
			maxWidth='lg'
			disableGutters
			sx={{
				height: 'calc(100vh - 64px)',
				display: 'flex',
				flexDirection: 'column',
				px: { xs: 2, sm: 3, md: 4 },
				pt: 4,
			}}
		>
			<Typography variant='h4' gutterBottom>
				Школи
			</Typography>

			<Box
				mb={2}
			>
				<SchoolForm onSubmit={handleCreate} />
			</Box>

			<Box sx={{ position: 'absolute', top: 16, right: 24 }}>
				<Tooltip title={mode === 'light' ? 'Dark mode' : 'Light mode'}>
					<IconButton color='inherit' onClick={toggle} size='large'>
						{mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
					</IconButton>
				</Tooltip>
			</Box>

			<Box mb={2}>
				<SchoolFilters
					value={filters}
					onChange={f => {
						setFilters(f)
						setPaginationModel({ ...paginationModel, page: 0 })
					}}
					onClear={() => {
						setFilters(defaultFilters)
						setPaginationModel({ ...paginationModel, page: 0 })
					}}
				/>
			</Box>

			<Box sx={{ flex: 1, minHeight: 0 }}>
				<SchoolTable
					rows={schools}
					rowCount={rowCount}
					loading={loading}
					onDeactivate={id => setPendingId(id)}
					paginationModel={paginationModel}
					onPaginationModelChange={setPaginationModel}
				/>
			</Box>

			<Dialog open={!!pendingId} onClose={() => setPendingId(undefined)}>
				<DialogTitle>Deactivate school?</DialogTitle>
				<DialogContent>
					Ви впевнені, що хочете деактивувати школу?
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setPendingId(undefined)}>Ні</Button>
					<Button color='error' onClick={handleDeactivate}>
						Так
					</Button>
				</DialogActions>
			</Dialog>

			<Snackbar
				open={!!toast}
				autoHideDuration={3000}
				onClose={() => setToast(undefined)}
				message={toast}
			/>

			<Snackbar
				open={!!snack}
				autoHideDuration={6000}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
			>
				<Alert severity='error' onClose={handleClose} variant='filled'>
					{snack}
				</Alert>
			</Snackbar>
		</Container>
	)
}
