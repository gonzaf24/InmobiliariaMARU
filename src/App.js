import React, { Suspense } from 'react';
import './styles/theme.scss';
import './App.scss';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import { ToastProvider } from './context/toastContext';
import { UserProvider } from './context/userContext';
import Login from './pages/Login/Login';
import Users from './pages/Admin/Users';

function App() {
	return (
		<UserProvider>
			<ToastProvider>
				<Suspense fallback={null}>
					<Router>
						<div>
							<ul>
								<li>
									<Link to='/'>Home</Link>
								</li>
								<li>
									<Link to='/about'>About</Link>
								</li>
								<li>
									<Link to='/login'>Login</Link>
								</li>
								<li>
									<Link to='/users'>Users</Link>
								</li>
							</ul>
							<hr />
							<Routes>
								<Route path='/' element={<Home />} />
								<Route path='/about' element={<About />} />
								<Route path='/login' element={<Login />} />
								<Route path='/users' element={<Users />} />
							</Routes>
						</div>
					</Router>
				</Suspense>
			</ToastProvider>
		</UserProvider>
	);
}

export default App;
