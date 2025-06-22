import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SchoolsPage from './features/schools/pages/SchoolPage';


export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<SchoolsPage />} />
				<Route path='*' element={<p>404 Not Found</p>} />
			</Routes>
		</BrowserRouter>
	)
}
