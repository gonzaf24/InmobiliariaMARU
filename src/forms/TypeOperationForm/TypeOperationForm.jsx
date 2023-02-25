import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './TypeOperationForm.module.scss';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';

const propTypes={
  className: PropTypes.string,
  testId: PropTypes.string,
  id: PropTypes.string,
};

const defaultProps={
  className: '',
  testId: undefined,
  id: undefined,
};

const TypeOperationForm=({ className, testId, id }) => {

  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      console.log(event);
    }
  };

  const typeOperationFormClassNames = classnames(styles.TypeOperationForm, className);

  return (
    <div
      className={ typeOperationFormClassNames }
      data-testid={ testId }
      id={ id }
    >
      <Form noValidate onSubmit={handleSubmit}>
        <Row className='mb-3'>
          <Form.Group as={Col} md='2' className='mb-3' controlId='validationCustomUsername'>
            <FloatingLabel controlId='floatingSelect' label='Operacion'>
              <Form.Select aria-label='Floating label select example'>
                <option value='1'>Alquiler</option>
                <option value='2'>Venta</option>
              </Form.Select>
          </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} md='2' className='mb-3' controlId='validationCustom01'>
              <FloatingLabel controlId='floatingInputGrid' label='Precio'>
                <Form.Control type='text' placeholder='' />
              </FloatingLabel>
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
};

TypeOperationForm.propTypes=propTypes;
TypeOperationForm.defaultProps=defaultProps;

export default TypeOperationForm;
