import { NextPage } from 'next';
import Link from 'next/link';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { ShopLayout } from '../../components/layouts';
import { Chip } from '../../components/ui';

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
				<Link href={`/orders/${params.row.id}`} className='underline'>
					Ver Orden
				</Link>
			);
		},
		sortable: false
	}
];

const rows = [
	{ id: 1, nombre: 'Ernesto Copca', paid: true },
	{ id: 2, nombre: 'Mónica Moreno', paid: false },
	{ id: 3, nombre: 'Iván Copca', paid: true },
	{ id: 4, nombre: 'Fabiola Dander', paid: false },
	{ id: 5, nombre: 'Yazmin Castillo', paid: false },
	{ id: 6, nombre: 'Israel Copca', paid: true }
];

const HistoryPage: NextPage = () => {
	return (
		<ShopLayout
			tittle={'Historial de ordenes'}
			pageDescription={'Historial de ordenes del cliente'}
		>
			<div className='container'>
				<h1 className='text-2xl mb-8'>Historial de ordenes</h1>

				<div className='h-[34rem]'>
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

export default HistoryPage;
