import React, { Suspense } from 'react';

import { UserProvider } from '../../context/userContext';
import { ToastProvider } from '../../context/toastContext';

import './App.module.scss';
import '../../styles/theme.scss';
import '../../styles/bootstrap.scss';
import AppLayout from '../AppLayout';
import AppRoutes from '../AppRoutes';

const propTypes = {};

const defaultProps = {};

const App = () => {
	return (
		<UserProvider>
			<ToastProvider>
				<Suspense fallback={null}>
					<AppLayout>
						<AppRoutes />
					</AppLayout>
				</Suspense>
			</ToastProvider>
		</UserProvider>
	);
};

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
