import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';

import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';

import { ShopLayout } from '../../components/layouts';
import { Chip } from '../../components/ui';

// Creación de las columnas del DataGrid
const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 100 },
	{ field: 'nombre', headerName: 'Nombre Completo', width: 300 },
	{
		field: 'paid',
		headerName: 'Pagada',
		description: 'Muestra información si esta pagada la orden o no',
		width: 200,
		renderCell: (params: GridRenderCellParams) => {
			return params.row.paid ? <Chip pagado /> : <Chip />;
		}
	},
	{
		field: 'orden',
		headerName: 'Orden',
		width: 200,
		renderCell: (params) => {
			return (
				<Link href={`/orders/${params.row.orderId}`} className='underline'>
					Ver Orden
				</Link>
			);
		},
		sortable: false
	}
];

// Forma statica de crear las filas del DataGrid
// const rows = [
// 	{ id: 1, nombre: 'Ernesto Copca', paid: true, orderId: 638e5e9b807702b134875a41 },
// 	{ id: 2, nombre: 'Mónica Moreno', paid: false, orderId: 638e5e9b807702b134875b87 },
// ];

interface Props {
	orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
	// Creamos las filas del GridData de forma dinámica
	const rows = orders.map((order, index) => ({
		id: index + 1,
		nombre: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
		paid: order.isPaid,
		orderId: order._id
	}));

	return (
		<ShopLayout
			title={'Historial de ordenes'}
			pageDescription={'Historial de ordenes del cliente'}
		>
			<div className='container'>
				<h1 className='text-2xl mb-8'>Historial de ordenes</h1>

				<div className='h-[34rem] animate-fadeIn'>
					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={10}
						rowsPerPageOptions={[10]}
					/>
				</div>
			</div>
		</ShopLayout>
	);
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const session = await unstable_getServerSession(req, res, authOptions);

	if (!session) {
		return {
			redirect: {
				destination: '/auth/login?p=/orders/history',
				permanent: false
			}
		};
	}

	const orders = await dbOrders.getOrdersByUser(session.user?._id!);

	return {
		props: {
			orders
		}
	};
};

export default HistoryPage;
