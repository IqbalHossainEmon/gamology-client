import { useEffect, useRef, useState } from 'react';
import useToast from '../../Utils/Hooks/useToast';
import styles from './ProfilePhotoUploader.module.css';

function ProfilePhotoUploader({ data, setPhoto }) {
	const [photoDetail, setPhotoDetail] = useState({
		url: '/assets/images/user-1.svg',
		name: 'user photo',
	});

	const urlRef = useRef(null);
	urlRef.current = photoDetail.url;

	useEffect(() => {
		let isUrlCreated = false;
		if (typeof data === 'string') {
			setPhotoDetail({ url: data, name: data.split('/').pop() });
		} else if (data instanceof File) {
			setPhotoDetail({ url: URL.createObjectURL(data), name: data.name });
			isUrlCreated = true;
		}
		return () => {
			if (isUrlCreated) {
				URL.revokeObjectURL(urlRef.current);
			}
		};
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
			<div className={styles.profileImageContainer}>
				<img src={photoDetail.url} alt={`${photoDetail.name}'s profile`} />
			</div>
			<input
				ref={inputFieldRef}
				type='file'
				name='profile Photo'
				className={styles.inputField}
				onChange={eventRefs.current.handleFileChange}
				accept='image/*'
			/>
			<div className={styles.uploadIcon}>
				<svg fill='#000000' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
					<path d='M19,13a1,1,0,0,0-1,1v.38L16.52,12.9a2.79,2.79,0,0,0-3.93,0l-.7.7L9.41,11.12a2.85,2.85,0,0,0-3.93,0L4,12.6V7A1,1,0,0,1,5,6h7a1,1,0,0,0,0-2H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V14A1,1,0,0,0,19,13ZM5,20a1,1,0,0,1-1-1V15.43l2.9-2.9a.79.79,0,0,1,1.09,0l3.17,3.17,0,0L15.46,20Zm13-1a.89.89,0,0,1-.18.53L13.31,15l.7-.7a.77.77,0,0,1,1.1,0L18,17.21ZM22.71,4.29l-3-3a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-3,3a1,1,0,0,0,1.42,1.42L18,4.41V10a1,1,0,0,0,2,0V4.41l1.29,1.3a1,1,0,0,0,1.42,0A1,1,0,0,0,22.71,4.29Z' />
				</svg>
			</div>
		</button>
	);
}
export default ProfilePhotoUploader;
