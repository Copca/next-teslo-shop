import styles from './Loading.module.css';

export const Loading = () => {
	return (
		<div className='h-96 flex justify-center items-center'>
			<div className={styles['sk-chase']}>
				<div className={styles['sk-chase-dot']}></div>
				<div className={styles['sk-chase-dot']}></div>
				<div className={styles['sk-chase-dot']}></div>
				<div className={styles['sk-chase-dot']}></div>
				<div className={styles['sk-chase-dot']}></div>
				<div className={styles['sk-chase-dot']}></div>
			</div>
		</div>
	);
};
