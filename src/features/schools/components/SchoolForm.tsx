import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schoolSchema } from '../schema'
import type { CreateSchoolDto } from '../types'
import {
	Box,
	Button,
	MenuItem,
	TextField,
	Stack,
	Paper,
	Typography,
} from '@mui/material'
import type { SchoolFormProps } from '../models/interfaces'
import { SCHOOL_TYPES } from '../models/interfaces'

export default function SchoolForm({ onSubmit }: SchoolFormProps) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<CreateSchoolDto>({
		resolver: zodResolver(schoolSchema),
		mode: 'onChange',
		criteriaMode: 'all',
		defaultValues: {
			name: '',
			edrpou: '',
			region: '',
			type: 'ЛІЦЕЙ',
		},
	})

	const submit = async (data: CreateSchoolDto) => {
		await onSubmit(data)
		reset()
	}

	return (
		<Paper elevation={3} sx={{ p: 3 }}>
			<Typography variant='h6' gutterBottom>
				Створити нову школу
			</Typography>

			<Box component='form' onSubmit={handleSubmit(submit)} noValidate>
				<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
					<TextField
						label='Назва'
						fullWidth
						{...register('name')}
						error={!!errors.name}
						helperText={errors.name?.message}
					/>

					<TextField
						label='EDRPOU'
						fullWidth
						{...register('edrpou')}
						error={!!errors.edrpou}
						helperText={errors.edrpou?.message}
					/>
				</Stack>

				<Stack
					direction={{ xs: 'column', sm: 'row' }}
					spacing={2}
					sx={{ mt: 2 }}
				>
					<TextField
						label='Регіон'
						fullWidth
						{...register('region')}
						error={!!errors.region}
						helperText={errors.region?.message}
					/>

					<TextField
						label='Тип'
						select
						fullWidth
						defaultValue='LYCEUM'
						{...register('type')}
						error={!!errors.type}
						helperText={errors.type?.message}
					>
						{SCHOOL_TYPES.map(({ value, label }) => (
							<MenuItem key={value} value={value}>
								{label}
							</MenuItem>
						))}
					</TextField>
				</Stack>

				<Button
					type='submit'
					variant='contained'
					sx={{ mt: 3 }}
					disabled={isSubmitting}
				>
					Створити
				</Button>
			</Box>
		</Paper>
	)
}
