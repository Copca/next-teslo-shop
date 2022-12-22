import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';

import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { GiClothes } from 'react-icons/gi';
import { FiPlus } from 'react-icons/fi';

import { IProduct } from '../../../interfaces';

import { AdminLayout } from '../../../components/layouts';

const columns: GridColDef[] = [
	{
		field: 'img',
		headerName: 'Foto',
		renderCell: ({ row }: GridRenderCellParams) => {
			return (
				<a href={`/product/${row.slug}`} target='_blank' rel='noreferrer'>
					<div>
						<Image src={row.img} width={300} height={300} alt={row.title} />
					</div>
				</a>
			);
		}
	},
	{
		field: 'title',
		headerName: 'Título',
		renderCell: ({ row }: GridRenderCellParams) => (
			<Link
				href={`/admin/products/${row.slug}`}
				target='_blank'
				rel='noreferrer'
				className='underline'
			>
				{row.title}
			</Link>
		),
		width: 250
	},
	{ field: 'gender', headerName: 'Género' },
	{ field: 'type', headerName: 'Tipo' },
	{ field: 'inStock', headerName: 'Inventario' },
	{ field: 'price', headerName: 'Precio' },
	{ field: 'sizes', headerName: 'Tallas', width: 250 }
];

const AdminProductsPage: NextPage = () => {
	const { data, error } = useSWR<IProduct[]>('/api/admin/products');

	if (!data && !error) return <></>;

	const rows = data!.map((product) => ({
		id: product._id,
		img: product.images[0],
		title: product.title,
		gender: product.gender,
		type: product.type,
		inStock: product.inStock,
		price: product.price,
		sizes: product.sizes.join(', '),
		slug: product.slug
	}));

	return (
		<AdminLayout
			title={`Productos: ${data?.length}`}
			subTitle='Mantenimiento de Productos'
			icon={<GiClothes className='mr-2' />}
		>
			<div className='container'>
				<div className='flex justify-end mb-16'>
					<Link
						href={'/admin/products/new'}
						className='btn bg-blue-500 hover:bg-blue-600'
					>
						<FiPlus className='text-lg font-bold mr-2' />
						Crear Producto
					</Link>
				</div>

				<div className='h-[34rem] animate-fadeIn'>
					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={10}
						rowsPerPageOptions={[10]}
					/>
				</div>
			</div>
		</AdminLayout>
	);
};

export default AdminProductsPage;
