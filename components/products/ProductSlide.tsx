import { FC } from 'react';
import Image from 'next/image';

interface Props {
	images: string[];
}

export const ProductSlide: FC<Props> = ({ images }) => {
	return (
		<div
			id='carouselExampleCaptions'
			className='carousel slide relative'
			data-bs-ride='carousel'
		>
			<div className='carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4'>
				{images.map((img, index) => (
					<button
						key={img}
						type='button'
						data-bs-target='#carouselExampleCaptions'
						data-bs-slide-to={index}
						className={index === 0 ? 'active' : ''}
						aria-current='true'
						aria-label={`Slide ${index + 1}`}
					></button>
				))}
			</div>

			<div className='carousel-inner relative w-full overflow-hidden'>
				{images.map((img, index) => (
					<div
						key={img}
						className={`carousel-item relative float-left w-full ${
							index === 0 && 'active'
						} `}
					>
						<Image
							src={img}
							width={800}
							height={800}
							priority
							className='object-contain max-h-[30rem]'
							alt={img}
						/>
					</div>
				))}
			</div>

			<button
				className='carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0'
				type='button'
				data-bs-target='#carouselExampleCaptions'
				data-bs-slide='prev'
			>
				<span
					className='carousel-control-prev-icon inline-block bg-no-repeat bg-slate-200 rounded-full'
					aria-hidden='true'
				></span>
				<span className='visually-hidden'>Previous</span>
			</button>

			<button
				className='carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0'
				type='button'
				data-bs-target='#carouselExampleCaptions'
				data-bs-slide='next'
			>
				<span
					className='carousel-control-next-icon inline-block bg-no-repeat bg-slate-200 rounded-full'
					aria-hidden='true'
				></span>
				<span className='visually-hidden'>Next</span>
			</button>
		</div>
	);
};
