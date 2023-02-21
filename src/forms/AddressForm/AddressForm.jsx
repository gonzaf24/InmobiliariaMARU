import React, { useCallback, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './AddressForm.module.scss';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import geografia from './geografia.json';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
};

const DEFUALT_SELECTED = 'choose-one';

const AddressForm = ({ className, testId, id }) => {
	const addressFormClassNames = classnames(styles.AddressForm, className);
	const [paisSeleccionado, setPaisSeleccionado] = useState('');
	const [regionSeleccionada, setRegionSeleccionada] = useState('');
	const [ciudadSeleccionada, setCiudadSeleccionada] = useState('');
	const [barrioSeleccionado, setBarrioSeleccionado] = useState('');
	const [regiones, setRegiones] = useState([]);
	const [ciudades, setCiudades] = useState([]);
	const [barrios, setBarrios] = useState([]);
	const [codigoPostal, setCodigoPostal] = useState('');
	const [calle, setCalle] = useState('');
	const [numero, setNumero] = useState('');
	const [piso, setPiso] = useState('');
	const [puerta, setPuerta] = useState('');
	const [escalera, setEscalera] = useState('');

	const paises = Object.keys(geografia);

	const resetValues = useCallback(() => {
		setPaisSeleccionado('');
		setRegiones([]);
		setCiudades([]);
		setBarrios([]);
		setRegionSeleccionada('');
		setCiudadSeleccionada('');
		setBarrioSeleccionado('');
	}, []);

	const handlePaisSeleccionado = useCallback(event => {
		const pais = event.target.value;
		if (pais === DEFUALT_SELECTED) {
			resetValues();
			return;
		}
		setPaisSeleccionado(pais);
		setRegiones(geografia[pais]);
		setCiudades([]);
		setBarrios([]);
		setRegionSeleccionada('');
		setCiudadSeleccionada('');
		setBarrioSeleccionado('');
	}, []);

	const handleRegionSeleccionada = useCallback(
		event => {
			const region = event.target.value;
			if (region === DEFUALT_SELECTED) {
				return;
			}
			setRegionSeleccionada(region);
			setCiudades(geografia[paisSeleccionado][region]);
			setBarrios([]);
			setCiudadSeleccionada('');
			setBarrioSeleccionado('');
		},
		[paisSeleccionado]
	);

	const handleCiudadSeleccionada = useCallback(
		event => {
			const ciudad = event.target.value;
			if (ciudad === DEFUALT_SELECTED) {
				return;
			}
			setCiudadSeleccionada(ciudad);
			setBarrios(geografia[paisSeleccionado][regionSeleccionada][ciudad]);
			setBarrioSeleccionado('');
		},
		[paisSeleccionado, regionSeleccionada]
	);

	const handleBarrioSeleccionado = useCallback(event => {
		const barrio = event.target.value;
		if (barrio === DEFUALT_SELECTED) {
			return;
		}
		setBarrioSeleccionado(barrio);
	}, []);

	const handleCodigoPostal = useCallback(event => {
		const codigoPostal = event.target.value;
		setCodigoPostal(codigoPostal);
	}, []);

	const handleCalle = useCallback(event => {
		const calle = event.target.value;
		setCalle(calle);
	}, []);

	const handleNumero = useCallback(event => {
		const numero = event.target.value;
		setNumero(numero);
	}, []);

	const handlePiso = useCallback(event => {
		const piso = event.target.value;
		setPiso(piso);
	}, []);

	const handlePuerta = useCallback(event => {
		const puerta = event.target.value;
		setPuerta(puerta);
	}, []);

	const handleEscalera = useCallback(event => {
		const escalera = event.target.value;
		setEscalera(escalera);
	}, []);


	const handleSubmit = useCallback(event => {
		console.log('submit', event);
		event.preventDefault();
		event.stopPropagation();
	}, []);

	console.log('regiones : ', regiones);

	return (
		<div className={addressFormClassNames} data-testid={testId} id={id}>
			<Form noValidate onSubmit={handleSubmit}>
				<Row className='mb-3'>
					<Form.Group as={Col} md='3' className='mb-3' controlId='validationCustomUsername'>
						<FloatingLabel controlId='floatingSelect' label='Pais'>
							<Form.Control as='select' value={paisSeleccionado} onChange={handlePaisSeleccionado}>
								<option value={DEFUALT_SELECTED}>Seleccione</option>
								{paises.map(pais => (
									<option key={pais} value={pais}>
										{pais}
									</option>
								))}
							</Form.Control>
						</FloatingLabel>
					</Form.Group>
					<Form.Group as={Col} md='3' className='mb-3' controlId='validationCustomUsername'>
						<FloatingLabel controlId='floatingSelect' label='Comunidad'>
							<Form.Control
								as='select'
								value={regionSeleccionada}
								onChange={handleRegionSeleccionada}
								disabled={!paisSeleccionado}
							>
								<option value={DEFUALT_SELECTED}>Seleccione</option>
								{Object.keys(regiones).map(region => (
									<option key={region} value={region}>
										{region}
									</option>
								))}
							</Form.Control>
						</FloatingLabel>
					</Form.Group>
					<Form.Group as={Col} md='2' className='mb-3' controlId='validationCustomUsername'>
						<FloatingLabel controlId='floatingSelect' label='Ciudad'>
							<Form.Control
								as='select'
								value={ciudadSeleccionada}
								onChange={handleCiudadSeleccionada}
								disabled={!regionSeleccionada}
							>
								<option value={DEFUALT_SELECTED}>Seleccione</option>
								{Object.keys(ciudades).map(ciudad => (
									<option key={ciudad} value={ciudad}>
										{ciudad}
									</option>
								))}
							</Form.Control>
						</FloatingLabel>
					</Form.Group>
					<Form.Group as={Col} md='2' className='mb-3' controlId='validationCustomUsername'>
						<FloatingLabel controlId='floatingSelect' label='Barrio'>
							<Form.Control
								as='select'
								value={barrioSeleccionado}
								onChange={handleBarrioSeleccionado}
								disabled={!ciudadSeleccionada}
							>
								<option value={DEFUALT_SELECTED}>Seleccione</option>
								{barrios.map(barrio => (
									<option key={barrio} value={barrio}>
										{barrio}
									</option>
								))}
							</Form.Control>
						</FloatingLabel>
					</Form.Group>
					<Form.Group as={Col} md='2' controlId='validationCustomUsername'>
						<FloatingLabel controlId='floatingInputGrid' label='Codigo Postal'>
							<Form.Control type='text' placeholder='' value={codigoPostal} onChange={handleCodigoPostal} />
						</FloatingLabel>
					</Form.Group>
				</Row>
				<Row className='mb-3'>
					<Form.Group as={Col} md='3' className='mb-3' controlId='validationCustom01'>
						<FloatingLabel controlId='floatingInputGrid' label='Calle'>
							<Form.Control type='text' placeholder='' value={calle} onChange={handleCalle} />
						</FloatingLabel>
					</Form.Group>
					<Form.Group as={Col} md='3' controlId='validationCustom02'>
						<FloatingLabel controlId='floatingInputGrid' label='Numero'>
							<Form.Control type='text' placeholder='' value={numero} onChange={handleNumero} />
						</FloatingLabel>
					</Form.Group>
					<Form.Group as={Col} md='2' controlId='validationCustom02'>
						<FloatingLabel controlId='floatingInputGrid' label='Piso'>
							<Form.Control type='text' placeholder='' value={piso} onChange={handlePiso} />
						</FloatingLabel>
					</Form.Group>
					<Form.Group as={Col} md='2' controlId='validationCustom02'>
						<FloatingLabel controlId='floatingInputGrid' label='Puerta'>
							<Form.Control type='text' placeholder='' value={puerta} onChange={handlePuerta} />
						</FloatingLabel>
					</Form.Group>
					<Form.Group as={Col} md='2' controlId='validationCustom02'>
						<FloatingLabel controlId='floatingInputGrid' label='Escalera'>
							<Form.Control type='text' placeholder='' value={escalera} onChange={handleEscalera} />
						</FloatingLabel>
					</Form.Group>
					
				</Row>
			</Form>
		</div>
	);
};

AddressForm.propTypes = propTypes;
AddressForm.defaultProps = defaultProps;

export default AddressForm;
