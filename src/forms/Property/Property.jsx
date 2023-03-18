import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Property.module.scss';
import { Col, FloatingLabel, Form, InputGroup, Row } from 'react-bootstrap';
import { FileSorteableList } from '../../components';

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

const handleSubmit = event => {
	const form = event.currentTarget;
	if (form.checkValidity() === false) {
		event.preventDefault();
		event.stopPropagation();
		console.log(event);
	}
};

const Property = ({ className, testId, id }) => {
	const propertyClassNames = classnames(styles.Property, className);

	return (
		<div className={propertyClassNames} data-testid={testId} id={id}>
			<Form noValidate onSubmit={handleSubmit}>
				<Row className={styles.Margins}>
					<Form.Group as={Col} md='2' className={styles.Margins} controlId='validationCustomUsername'>
						<FloatingLabel controlId='floatingSelect' label='Propiedad'>
							<Form.Select aria-label='Floating label select example'>
								<option value='1'>Casa</option>
								<option value='2'>Apartamento</option>
								<option value='3'>Terreno</option>
								<option value='4'>Garage</option>
							</Form.Select>
						</FloatingLabel>
					</Form.Group>
					<Form.Group as={Col} md='1'  className={styles.Margins} controlId='validationCustomUsername'>
						<FloatingLabel controlId='floatingInputGrid' label='Habitaciones'>
							<Form.Control type='text' placeholder='' />
						</FloatingLabel>
					</Form.Group>
					<Form.Group as={Col} md='1' className={styles.Margins} controlId='validationCustomUsername'>
						<FloatingLabel controlId='floatingInputGrid' label='Baños'>
							<Form.Control type='text' placeholder='' />
						</FloatingLabel>
					</Form.Group>
					<Form.Group as={Col} md='2' className={styles.Margins} controlId='validationCustomUsername'>
						<InputGroup className={styles.Margins}>
							<FloatingLabel controlId='floatingInputGrid' label='Tamaño'>
								<Form.Control type='text' placeholder='' />
							</FloatingLabel>
							<InputGroup.Text id='basic-addon2'>m2</InputGroup.Text>
						</InputGroup>
					</Form.Group>
					<Form.Group as={Col} md='2' className={styles.Margins} controlId='validationCustomUsername'>
						<FloatingLabel controlId='floatingInputGrid' label='Nro. Plantas'>
							<Form.Control type='number' placeholder='' />
						</FloatingLabel>
					</Form.Group>
					<Form.Group as={Col} md='2' className={styles.Margins} controlId='validationCustomUsername'>
						<FloatingLabel controlId='floatingInputGrid' label='Antiguedad (años)'>
							<Form.Control type='number' placeholder='' />
						</FloatingLabel>
					</Form.Group>
					<Form.Group as={Col} md='2' className={styles.Margins} controlId='validationCustom01'>
						<FloatingLabel controlId='floatingSelect' label='Calefaccion'>
							<Form.Select aria-label='Floating label select example'>
								<option value='1'>Central</option>
								<option value='2'>Individual</option>
							</Form.Select>
						</FloatingLabel>
					</Form.Group>
				</Row>
				<Row className={styles.Margins}>
					<Form.Group as={Col} md='2' controlId='validationCustomUsername'>
						<Form.Check type={'checkbox'} id={`default-checkbox}`} label={`Agua`} />
						<Form.Check type={'checkbox'} id={`default-checkbox}`} label={`Luz`} />
					</Form.Group>
					<Form.Group as={Col} md='2' controlId='validationCustomUsername'>
						<Form.Check type={'checkbox'} id={`default-checkbox}`} label={`Gas`} />
						<Form.Check type={'checkbox'} id={`default-checkbox}`} label={`Amueblado`} />
					</Form.Group>
					<Form.Group as={Col} md='2' controlId='validationCustomUsername'>
						<Form.Check type={'checkbox'} id={`default-checkbox}`} label={`Mascotas`} />
						<Form.Check type={'checkbox'} id={`default-checkbox}`} label={`Parkng`} />
					</Form.Group>
					<Form.Group as={Col} md='2' controlId='validationCustomUsername'>
						<Form.Check type={'checkbox'} id={`default-checkbox}`} label={`Piscina`} />
						<Form.Check type={'checkbox'} id={`default-checkbox}`} label={`Jacuzzi`} />
					</Form.Group>
					<Form.Group as={Col} md='2' controlId='validationCustomUsername'>
						<Form.Check type={'checkbox'} id={`default-checkbox}`} label={`Jardin`} />
						<Form.Check type={'checkbox'} id={`default-checkbox}`} label={`Terraza`} />
					</Form.Group>
					<Form.Group as={Col} md='2' controlId='validationCustomUsername'>
						<Form.Check type={'checkbox'} id={`default-checkbox}`} label={`Prop. Horizontal`} />
					</Form.Group>
				</Row>
				<Row className={styles.Margins}>
					<Form.Group as={Col} md='2' className={styles.Margins} controlId='validationCustom01'>
						<FloatingLabel controlId='floatingInputGrid' label='Fecha Contruccion'>
							<Form.Control type='date' placeholder='' />
						</FloatingLabel>
					</Form.Group>
					<Form.Group as={Col} md='2' className={styles.Margins} controlId='validationCustom01'>
						<FloatingLabel controlId='floatingInputGrid' label='Fecha ult. renovacion '>
							<Form.Control type='date' placeholder='' />
						</FloatingLabel>
					</Form.Group>
					<Form.Group as={Col} md='4' className={styles.Margins} controlId='validationCustom01'>
						<FloatingLabel controlId='floatingInputGrid' label='Observaciones'>
							<Form.Control type='text' placeholder='' />
						</FloatingLabel>
					</Form.Group>
				</Row>
				<Row className={styles.Margins}>
					<FileSorteableList categoryName={'CONTRATOS-DOCUMENTOS'} useName/>
				</Row>
				<Row className={styles.Margins}>
					<FileSorteableList categoryName={'FOTOS-INMUEBLE'} />
				</Row>
			</Form>
		</div>
	);
};

Property.propTypes = propTypes;
Property.defaultProps = defaultProps;

export default Property;
