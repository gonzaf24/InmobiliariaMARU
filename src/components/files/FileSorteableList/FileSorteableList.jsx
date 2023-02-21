import React, { useCallback, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { ImImage } from 'react-icons/im';
import { formatFileNameToShow } from '../../../utils/formatters';

import styles from './FileSorteableList.module.scss';
import { FloatingLabel, Form, InputGroup, ListGroup } from 'react-bootstrap';
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi';
import FileUpload from '../../FileUpload/FileUpload';
import FullSizeImage from '../../FullSizeImage/FullSizeImage';
import FileDelete from '../../FileDelete';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	categoryName: PropTypes.string,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	categoryName: 'INMUEBLE',
};

const FileSorteableList = ({ className, testId, id, categoryName }) => {
	const fileSorteableListClassNames = classnames(styles.FileSorteableList, className);
	const [files, setFiles] = useState([]);
	const [showFullSizeImage, setShowFullSizeImage] = useState(false);
	const [imgSrcFullSize, setImgSrcFullSize] = useState();

	const swapDownPhotos = useCallback(
		(files, index) => {
			const filesAux = [...files];
			[filesAux[index], filesAux[index + 1]] = [filesAux[index + 1], filesAux[index]];
			setFiles(filesAux);
		},
		[setFiles]
	);

	const swapUpPhotos = useCallback(
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
				swapUpPhotos(files, index);
			} else {
				swapDownPhotos(files, index);
			}
		},
		[swapDownPhotos, swapUpPhotos]
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

	return (
		<div className={fileSorteableListClassNames} data-testid={testId} id={id}>
			<InputGroup className='mb-3'>
				<FloatingLabel controlId='floatingInputGrid' label={categoryName}>
					<Form.Control type='text' placeholder='' />
				</FloatingLabel>
				<InputGroup.Text id='basic-addon2'>
					<FileUpload categoryName={categoryName} onSuccesUpload={onSuccesUpload} />
				</InputGroup.Text>
			</InputGroup>
			<ListGroup className={styles.FileList}>
				{files.map((el, index) => {
					return (
						<ListGroup.Item key={index} className={styles.NewProductPhotosInfoWrapper}>
							{files.length > 1 && (
								<>
									<div title='Mover foto arriba/abajo' onClick={handleSwap(files, index)}>
										{index === files.length - 1 ? (
											<BiUpArrowAlt className={styles.NewProductArrows} />
										) : (
											<BiDownArrowAlt className={styles.EditProductArrows} />
										)}
									</div>
									{index}
								</>
							)}

							<ImImage className={styles.NewProductDeleteItem} onClick={onShowImageFullSize(el)} />
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
