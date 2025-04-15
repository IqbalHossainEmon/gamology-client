import { useEffect, useRef, useState } from 'react';

import useToast from '../../Utils/Hooks/useToast';
import UploadIcon from '../Icons/UploadIcon/UploadIcon';
import Image from '../Image/Image/Image';

import styles from './ProfilePhotoUploader.module.css';

function ProfilePhotoUploader({ data, setPhoto }) {
	const [photoDetail, setPhotoDetail] = useState({
		url: '/assets/images/user-1.svg',
		name: 'user photo',
	});

	const urlRef = useRef(null);
	urlRef.current = photoDetail.url;

	useEffect(() => {
		if (typeof data === 'string') {
			setPhotoDetail({ url: data, name: data.split('/').pop() });
		} else if (data instanceof File) {
			setPhotoDetail({ url: URL.createObjectURL(data), name: data.name });
			return () => {
				URL.revokeObjectURL(urlRef.current);
			};
		}
	}, [data]);

	const inputFieldRef = useRef(null);
	const eventRefs = useRef(null);

	const { setToast } = useToast();

	if (eventRefs.current === null) {
		eventRefs.current = {
			handleClick: () => {
				inputFieldRef.current.click();
			},
			handleFileChange: e => {
				if (e.target.files[0]) {
					const { name: fileName } = e.target.files[0] || {};

					// reject if file is not an image
					if (!fileName.match(/\.(jpg|jpeg|png|gif)$/)) {
						setToast({
							title: 'Invalid File',
							message: 'Please select an image file',
							type: 'error',
						});
						return;
					}
					setPhoto(e.target.files[0]);
					setPhotoDetail({ url: URL.createObjectURL(e.target.files[0]), name: fileName });
				}
			},
		};
	}

	return (
		<button
			onClick={eventRefs.current.handleClick}
			type='button'
			className={styles.profilePhotoButton}
		>
			<Image
				data={photoDetail.url}
				alt={`${photoDetail.name}'s profile`}
				aspectRatioClassName={styles.aspectRatioClassName}
			/>
			<input
				ref={inputFieldRef}
				type='file'
				name='profile Photo'
				className={styles.inputField}
				onChange={eventRefs.current.handleFileChange}
				accept='image/*'
			/>
			<UploadIcon />
		</button>
	);
}
export default ProfilePhotoUploader;
