import { ChangeEvent, ChangeEventHandler, FC, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

import { BiSave } from 'react-icons/bi';
import { AiFillCloseCircle, AiOutlineCloudUpload } from 'react-icons/ai';

import { clienteAxios } from '../../axios/';
import { IProduct } from '../../interfaces';

const validTypes = ['shirts', 'pants', 'hoodies', 'hats'];
const validGender = ['men', 'women', 'kid', 'unisex'];
const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

interface FormData {
	_id?: string;
	description: string;
	images: string[];
	inStock: number;
	price: number;
	sizes: string[];
	slug: string;
	tags: string[];
	title: string;
	type: string;
	gender: string;
}

interface Props {
	product: IProduct;
}

export const FormProduct: FC<Props> = ({ product }) => {
	console.log(product);

	const router = useRouter();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		setValue,
		watch
	} = useForm<FormData>({
		defaultValues: product
	});

	const [newTagValue, setNewTagValue] = useState('');
	const [isSaving, setIsSaving] = useState(false);

	// Creamos el Slug de sugerencia cuando se escribe el titulo del producto
	useEffect(() => {
		const subscription = watch((value, { name, type }) => {
			// console.log({ value, name, type });
			// Se diapara solo cuando el campo 'title' es modificado
			if (name === 'title') {
				const newSlug =
					value.title
						?.trim()
						.replaceAll(' ', '_')
						.replaceAll("'", '')
						.toLowerCase() || '';

				setValue('slug', newSlug, { shouldValidate: true });
			}
		});

		// Eliminamos el watch cuando se desmonta el componente
		return () => subscription.unsubscribe();
	}, [watch, setValue]);

	const onNewTag = () => {
		const newTag = newTagValue.trim().toLowerCase();

		setNewTagValue('');

		const currentTags = getValues('tags');

		if (currentTags.includes(newTag)) return;

		currentTags.push(newTag);
		// No es necesario llamar setValue, ya que el push muta el arreglo currentTaq que mantiene la referencia
	};

	const onDeleteTag = (tag: string) => {
		const updatedTags = getValues('tags').filter((t) => t !== tag);

		setValue('tags', updatedTags, { shouldValidate: true });
	};

	const onChangeSize = (size: string) => {
		const currentSizes = getValues('sizes');

		// Si ya esta en el arreglo, siginifica que se quiere eliminar, { shouldValidate: true } dispara el rerenderizado
		if (currentSizes.includes(size)) {
			return setValue(
				'sizes',
				currentSizes.filter((s) => s !== size),
				{ shouldValidate: true }
			);
		}

		// Si no esta en el arreglo lo agregamos
		setValue('sizes', [...currentSizes, size], { shouldValidate: true });
	};

	// Subir imagen a Cloudinary
	const onFileSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
		if (!target.files || target.files.length === 0) {
			return;
		}

		try {
			// for of: nos permite iterar en un objeto {}
			// para evitar un error de typescript al iterar con el valor de target, debemos habilitar en el tsconfig.json --downlevelIteration
			for (const file of target.files) {
				const formData = new FormData();

				formData.append('file', file);

				const { data } = await clienteAxios.post<{ message: string }>(
					'/admin/upload',
					formData
				);

				setValue('images', [...getValues('images'), data.message], {
					shouldValidate: true
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	// Borrar imagen
	const onDeleteImage = (image: string) => {
		setValue(
			'images',
			getValues('images').filter((img) => img !== image),
			{ shouldValidate: true }
		);
	};

	const onSubmitForm = async (form: FormData) => {
		if (form.images.length < 2) return alert('Mínimo 2 imagenes');

		setIsSaving(true);

		// Crear o editar producto
		try {
			const { data } = await clienteAxios({
				url: '/admin/products',
				method: form._id ? 'PUT' : 'POST', // Si tenemos ID actualizar, si no crear nuevo
				data: form
			});

			console.log({ data });

			if (!form._id) {
				//  Recargar el navegador
				router.replace(`/admin/products/${form.slug}`);
			} else {
				setIsSaving(false);
			}
		} catch (error) {
			console.log(error);
			setIsSaving(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmitForm)}>
			<div className='flex justify-end mb-6'>
				<button
					type='submit'
					className={`btn bg-blue-500 hover:bg-blue-600 ${
						isSaving && 'opacity-50 cursor-not-allowed'
					}`}
					disabled={isSaving}
				>
					<BiSave className='text-lg mr-2' />
					Guardar
				</button>
			</div>

			<div className='grid md:grid-cols-2 grid-flow-row-dense gap-6'>
				<div>
					<div className='bg-slate-200 rounded-md pt-4 mb-0.5 w-full'>
						<div className='relative border-b-2 rounded flex justify-center'>
							<input
								type='text'
								placeholder=' '
								className='w-full z-10 bg-transparent border border-transparent focus:border-transparent outline-none py-1 px-3 peer'
								{...register('title', {
									required: 'Este campo es obligatorio',
									minLength: {
										value: 2,
										message: 'Mínimo 2 caracteres'
									}
								})}
							/>
							<div className='border-animated'></div>
							<label className='label-float2'>Título</label>
						</div>
					</div>

					<p className='mt-1 ml-2 peer-invalid:visible text-pink-600 text-xs'>
						{errors.title && errors.title?.message}
					</p>
				</div>

				<div>
					<div className='bg-slate-200 rounded-md pt-4 mb-0.5 w-full'>
						<div className='relative border-b-2 rounded flex justify-center'>
							<input
								type='text'
								placeholder=' '
								className='w-full z-10 bg-transparent border border-transparent focus:border-transparent outline-none py-1 px-3 peer'
								{...register('slug', {
									required: 'Este campo es obligatorio',
									validate: (val) =>
										val.trim().includes(' ')
											? 'No puede tener espacios en blanco'
											: undefined
								})}
							/>
							<div className='border-animated'></div>
							<label className='label-float2'>Slug - URL</label>
						</div>
					</div>

					<p className='mt-1 ml-2 peer-invalid:visible text-pink-600 text-xs'>
						{errors.slug && errors.slug?.message}
					</p>
				</div>

				<div className='row-span-2'>
					<div className='flex flex-col '>
						<div className='bg-slate-200 rounded-md pt-4 mb-0.5 w-full h-32'>
							<div className='relative border-b-2 rounded flex justify-center'>
								<textarea
									placeholder=' '
									className='w-full z-10 bg-transparent border border-transparent focus:border-transparent outline-none py-1 px-3 peer'
									{...register('description', {
										required: 'Este campo es obligatorio'
									})}
								></textarea>
								<div className='border-animated'></div>
								<label className='label-float2'>Descripción</label>
							</div>
						</div>

						<p className='mt-1 ml-2 peer-invalid:visible text-pink-600 text-xs'>
							{errors.description && errors.description?.message}
						</p>
					</div>
				</div>

				{/*  Campo no referenciado en react-hook-form */}
				<div className='row-span-2'>
					<div className='bg-slate-200 rounded-md pt-4 mb-0.5 w-full'>
						<div className='relative border-b-2 rounded flex justify-center'>
							<input
								type='text'
								placeholder=' '
								className='w-full z-10 bg-transparent border border-transparent focus:border-transparent outline-none py-1 px-3 peer'
								value={newTagValue}
								onChange={({ target }) => setNewTagValue(target.value)}
								onKeyUp={({ code }) => code === 'Space' && onNewTag()}
							/>
							<div className='border-animated'></div>
							<label className='label-float2'>Etiquetas</label>
						</div>
					</div>

					<p className='text-slate-400 text-sm mb-2'>
						Presiona [spacebar] para agregar
					</p>

					<ul className='flex space-x-2'>
						{getValues('tags').map((tag) => (
							<li
								key={tag}
								className='flex items-center justify-center bg-slate-800 text-white text-sm rounded-full py-1 px-2'
							>
								<span className='mr-2'>{tag}</span>
								{
									<AiFillCloseCircle
										className='hover:text-slate-200 cursor-pointer'
										onClick={() => onDeleteTag(tag)}
									/>
								}
							</li>
						))}
					</ul>
				</div>

				<div>
					<div className='bg-slate-200 rounded-md pt-4 mb-0.5 w-full'>
						<div className='relative border-b-2 rounded flex justify-center'>
							<input
								type='number'
								placeholder=' '
								className='w-full z-10 bg-transparent border border-transparent focus:border-transparent outline-none py-1 px-3 peer'
								{...register('inStock', {
									required: 'Este campo es obligatorio',
									min: {
										value: 0,
										message: 'El valor mínimo es cero'
									}
								})}
							/>
							<div className='border-animated'></div>
							<label className='label-float2'>Inventario</label>
						</div>
					</div>

					<p className='mt-1 ml-2 peer-invalid:visible text-pink-600 text-xs'>
						{errors.inStock && errors.inStock?.message}
					</p>
				</div>

				<div className='row-span-3'>
					<h4>Imagenes</h4>

					<button
						type='button'
						className='btn bg-blue-500 hover:bg-blue-600 w-full'
						onClick={() => fileInputRef.current?.click()}
					>
						<AiOutlineCloudUpload className='text-2xl mr-2' />
						Cargar Imagenes
					</button>

					<input
						type='file'
						multiple
						accept='image/png, image/gif, image/jpeg'
						ref={fileInputRef}
						className='hidden'
						onChange={onFileSelected}
					/>

					{getValues('images').length < 2 && (
						<div className='border border-red-500 text-center text-red-500 text-sm font-bold rounded-full py-2 mt-2'>
							Es necesario al menos 2 imagenes
						</div>
					)}

					<div className='flex justify-center gap-4 mt-8'>
						{getValues('images').map((img) => (
							<div key={img} className='flex flex-col justify-center'>
								<Image
									src={img}
									height={150}
									width={150}
									priority
									alt={img}
									className={'rounded-md shadow-md border mb-3'}
								/>

								<button
									type='button'
									className='btn bg-red-600 hover:bg-red-700'
									onClick={() => onDeleteImage(img)}
								>
									Borrar
								</button>
							</div>
						))}
					</div>
				</div>

				<div>
					<div className='bg-slate-200 rounded-md pt-4 mb-0.5 w-full'>
						<div className='relative border-b-2 rounded flex justify-center'>
							<input
								type='number'
								placeholder=' '
								className='w-full z-10 bg-transparent border border-transparent focus:border-transparent outline-none py-1 px-3 peer'
								{...register('price', {
									required: 'Este campo es obligatorio',
									min: {
										value: 0,
										message: 'El valor mínimo es cero'
									}
								})}
							/>
							<div className='border-animated'></div>
							<label className='label-float2'>Precio</label>
						</div>
					</div>

					<p className='mt-1 ml-2 peer-invalid:visible text-pink-600 text-xs'>
						{errors.price && errors.price?.message}
					</p>
				</div>

				<div>
					<h4 className='text-slate-400'>Tipo</h4>
					<ul className='flex space-x-4 mb-4'>
						{validTypes.map((option) => (
							<li key={option}>
								<input
									type='radio'
									id={option}
									name='type'
									value={option}
									checked={getValues('type') === option}
									onChange={({ target }) =>
										setValue('type', target.value, {
											shouldValidate: true
										})
									}
								/>
								<label htmlFor={option} className='ml-1'>
									{option}
								</label>
							</li>
						))}
					</ul>

					<h4 className='text-slate-400'>Genero</h4>
					<ul className='flex space-x-4 mb-4'>
						{validGender.map((option) => (
							<li key={option}>
								<input
									type='radio'
									id={option}
									name='gender'
									value={option}
									checked={getValues('gender') === option}
									onChange={({ target }) =>
										setValue('gender', target.value, {
											shouldValidate: true
										})
									}
								/>
								<label htmlFor={option} className='ml-1'>
									{option}
								</label>
							</li>
						))}
					</ul>

					<h4 className='text-slate-400'>Tallas</h4>
					<ul className='flex space-x-4 mb-4'>
						{validSizes.map((option) => (
							<li key={option}>
								<input
									type='checkbox'
									id={option}
									// name='size'
									checked={getValues('sizes').includes(option)}
									onChange={() => onChangeSize(option)}
								/>
								<label htmlFor={option} className='ml-1'>
									{option}
								</label>
							</li>
						))}
					</ul>
				</div>
			</div>
		</form>
	);
};
