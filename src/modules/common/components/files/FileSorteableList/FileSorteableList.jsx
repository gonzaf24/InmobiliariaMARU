import React, { useCallback, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { FloatingLabel, Form, InputGroup, ListGroup } from 'react-bootstrap';
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi';
import { ImImage } from 'react-icons/im';
import { useOpenToggle } from '../../../hooks';
import { formatFileNameToShow } from '../../../../../utils';
import FileUpload from '../FileUpload';
import FileDelete from '../FileDelete';
import ImagePreviewModal from '../../modals/ImagePreviewModal/ImagePreviewModal';

import styles from './FileSorteableList.module.scss';

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
	const { isOpen: isOpenImagePreview, open: openImagePreview, close: closeImagePreview } = useOpenToggle(false);

	const [imgPreviewURL, setImgPreviewURL] = useState();

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
		imgURL => () => {
			console.log('imgURL', imgURL);
			setImgPreviewURL(imgURL);
			openImagePreview();
		},
		[openImagePreview, setImgPreviewURL]
	);

	const onSuccesUpload = useCallback(
		async imgUploaded => {
			setFiles(files => [...files, imgUploaded]);
		},
		[setFiles]
	);

	const handleSuccesDeleted = useCallback(
		imgURL => async () => {
			setFiles(files => files.filter(el => el !== imgURL));
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
			<ImagePreviewModal isOpen={isOpenImagePreview} onClose={closeImagePreview} imgURL={imgPreviewURL} />
		</div>
	);
};

FileSorteableList.propTypes = propTypes;
FileSorteableList.defaultProps = defaultProps;

export default FileSorteableList;
