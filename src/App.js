import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { About, Home, Images, Login, Users } from './pages';
import { ToastProvider } from './context/toastContext';
import { UserProvider } from './context/userContext';
import { NavigationBar } from './components';
import './styles/theme.scss';
import './App.scss';

function App() {
	return (
		<UserProvider>
			<ToastProvider>
				<Suspense fallback={null}>
					<Router>
						<NavigationBar />
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/about' element={<About />} />
							<Route path='/login' element={<Login />} />
							<Route path='/images' element={<Images />} />
							<Route path='/users' element={<Users />} />
						</Routes>
					</Router>
				</Suspense>
			</ToastProvider>
		</UserProvider>
	);
}

export default App;
