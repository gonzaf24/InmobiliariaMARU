import React, { useCallback, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { ImImage } from 'react-icons/im';
import { formatFileNameToShow } from '../../../utils/formatters';

import styles from './FileSorteableList.module.scss';
import { FloatingLabel, Form, InputGroup, ListGroup } from 'react-bootstrap';
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi';
import FullSizeImage from '../../FullSizeImage/FullSizeImage';
import FileUpload from '../FileUpload';
import FileDelete from '../FileDelete';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	categoryName: PropTypes.string,
	useName: PropTypes.bool,
	files: PropTypes.arrayOf(PropTypes.string),
	setFiles: PropTypes.func,
	name: PropTypes.string,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	categoryName: 'INMUEBLE',
	useName: false,
	files: [],
	setFiles: () => {},
	name: '',
};

const FileSorteableList = ({ className, testId, id, name, categoryName, useName, files, setFiles }) => {
	const [showFullSizeImage, setShowFullSizeImage] = useState(false);
	const [imgSrcFullSize, setImgSrcFullSize] = useState();

	const swapDown = useCallback(
		(files, index) => {
			const filesAux = [...files];
			[filesAux[index], filesAux[index + 1]] = [filesAux[index + 1], filesAux[index]];
			setFiles(filesAux);
		},
		[setFiles]
	);

	const swapUp = useCallback(
		(files, index) => {
			const filesAux = [...files];
			[filesAux[index - 1], filesAux[index]] = [filesAux[index], filesAux[index - 1]];
			setFiles(filesAux);
		},
		[setFiles]
	);

	const handleSwap = useCallback(
		(files, index) => event => {
			event.preventDefault();
			if (index === files.length - 1) {
				swapUp(files, index);
			} else {
				swapDown(files, index);
			}
		},
		[swapDown, swapUp]
	);

	const onShowImageFullSize = useCallback(
		fileSrc => () => {
			setImgSrcFullSize(fileSrc);
			setShowFullSizeImage(true);
		},
		[setImgSrcFullSize, setShowFullSizeImage]
	);

	const onSuccesUpload = useCallback(
		async imgUploaded => {
			setFiles(files => [...files, imgUploaded]);
		},
		[setFiles]
	);

	const handleSuccesDeleted = useCallback(
		fileSrc => async () => {
			setFiles(files => files.filter(el => el !== fileSrc));
		},
		[setFiles]
	);

	const hasFiles = files.length > 0;
	const fileSorteableListClassNames = classnames(styles.FileSorteableList, { [styles.Border]: hasFiles }, className);

	return (
		<div className={fileSorteableListClassNames} data-testid={testId} id={id}>
			<InputGroup>
				<FloatingLabel controlId='floatingInputGrid' label={name}>
					<Form.Control type='text' placeholder='' className={styles.Input} disabled />
				</FloatingLabel>
				<InputGroup.Text id='basic-addon2'>
					<FileUpload categoryName={categoryName} onSuccesUpload={onSuccesUpload} useName={useName} />
				</InputGroup.Text>
			</InputGroup>
			<ListGroup className={styles.FileList}>
				{files.map((el, index) => {
					return (
						<ListGroup.Item key={index} className={styles.FileWrapper}>
							{files.length > 1 && (
								<>
									<div title='Mover foto arriba/abajo' onClick={handleSwap(files, index)}>
										{index === files.length - 1 ? (
											<BiUpArrowAlt className={styles.New} />
										) : (
											<BiDownArrowAlt className={styles.Edit} />
										)}
									</div>
									{index}
								</>
							)}
							<ImImage className={styles.Delete} onClick={onShowImageFullSize(el)} />
							<div>{formatFileNameToShow(el)}</div>
							<FileDelete src={el} onSuccesDeleted={handleSuccesDeleted(el)} className={styles.FileDelete} />
						</ListGroup.Item>
					);
				})}
			</ListGroup>
			<FullSizeImage imgSrc={imgSrcFullSize} setShowFullSizeImage={setShowFullSizeImage} show={showFullSizeImage} />
		</div>
	);
};

FileSorteableList.propTypes = propTypes;
FileSorteableList.defaultProps = defaultProps;

export default FileSorteableList;
