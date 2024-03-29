import React, { useCallback, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Button, FloatingLabel, Form, InputGroup, ListGroup } from 'react-bootstrap';
import { BiDownArrowAlt, BiImageAdd, BiUpArrowAlt } from 'react-icons/bi';
import { ImImage } from 'react-icons/im';
import { MdDeleteForever } from 'react-icons/md';

import styles from './VideoUpload.module.scss';

const propTypes = {
	className: PropTypes.string,
	testId: PropTypes.string,
	id: PropTypes.string,
	files: PropTypes.arrayOf(PropTypes.string),
	setFiles: PropTypes.func,
	name: PropTypes.string,
};

const defaultProps = {
	className: '',
	testId: undefined,
	id: undefined,
	files: [],
	setFiles: () => {},
	name: 'VIDEOS',
};

const VideoUpload = ({ className, testId, id, files, setFiles, name }) => {
	const [urlVideo, setUrlVideo] = useState('');

	const handleAddVideo = useCallback(
		event => {
			event.preventDefault();
			setFiles([...files, urlVideo]);
			setUrlVideo('');
		},
		[files, setFiles, urlVideo]
	);

	const handleDelete = useCallback(
		fileToDelete => event => {
			event.preventDefault();
			const filesAux = files.filter(file => file !== fileToDelete);
			setFiles(filesAux);
		},
		[setFiles, files]
	);

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

	const handleChange = useCallback(
		event => {
			setUrlVideo(event.target.value);
		},
		[setUrlVideo]
	);

	const hasFiles = files.length > 0;
	const videoUploadClassNames = classnames(styles.VideoUpload, { [styles.Border]: hasFiles }, className);

	return (
		<div className={videoUploadClassNames} data-testid={testId} id={id}>
			<InputGroup>
				<FloatingLabel controlId='floatingInputGrid' label={name}>
					<Form.Control type='text' placeholder='' className={styles.Input} value={urlVideo} onChange={handleChange} />
				</FloatingLabel>
				<InputGroup.Text id='basic-addon2'>
					<Button className={styles.Button} data-testid={testId} id={id} disabled={!urlVideo} onClick={handleAddVideo}>
						<BiImageAdd />
					</Button>
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
							<ImImage className={styles.Delete} /* onClick={onShowImageFullSize(el)} */ />
							<div>{el}</div>
							<MdDeleteForever onClick={handleDelete(el)} className={styles.FileDelete} />
						</ListGroup.Item>
					);
				})}
			</ListGroup>
		</div>
	);
};

VideoUpload.propTypes = propTypes;
VideoUpload.defaultProps = defaultProps;

export default VideoUpload;
