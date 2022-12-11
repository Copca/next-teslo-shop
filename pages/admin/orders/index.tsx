import { NextPage } from 'next';
import useSWR from 'swr';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { TiTicket } from 'react-icons/ti';

import { IOrder, IUser } from '../../../interfaces';

import { AdminLayout } from '../../../components/layouts';
import { Chip } from '../../../components/ui';

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'Orden ID', width: 250 },
	{ field: 'email', headerName: 'Correo', width: 250 },
	{ field: 'name', headerName: 'Nombre Completo', width: 300 },
	{ field: 'total', headerName: 'Monto Total', align: 'right' },
	{
		field: 'isPaid',
		headerName: 'Pagada',
		renderCell: ({ row }: GridRenderCellParams) => {
			return <Chip pagado={row.isPaid} />;
		},
		width: 200
	},
	{ field: 'numProducts', headerName: 'No. Productos', align: 'center' },
	{
		field: 'check',
		headerName: 'Ver Orden',
		renderCell: ({ row }: GridRenderCellParams) => {
			return (
				<a href={`/admin/orders/${row.id}`} target='_blank' rel='noreferrer'>
					Ver Orden
				</a>
			);
		},
		width: 100
	},
	{ field: 'createdAt', headerName: 'Creada', width: 200 }
];

const OrdersPage: NextPage = () => {
	const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

	if (!data && !error) return <></>;

	const rows = data!.map((order) => ({
		id: order._id,
		email: (order.user as IUser).email,
		name: (order.user as IUser).name,
		total: order.total,
		isPaid: order.isPaid,
		numProducts: order.numberOfItems,
		createdAt: order.createdAt
	}));

	return (
		<AdminLayout
			title='Ordenes'
			subTitle='Mantenimiento de Ordenes'
			icon={<TiTicket className='mr-2' />}
		>
			<div className='container'>
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

export default OrdersPage;
