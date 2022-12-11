import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import useSWR from 'swr';

import {
	MdOutlineDashboard,
	MdCreditCard,
	MdOutlineCreditScore,
	MdOutlineCreditCardOff,
	MdOutlinePeopleAlt,
	MdTimer
} from 'react-icons/md';
import { GiClothes } from 'react-icons/gi';

import { IDashboardResponse } from '../../interfaces';

import { AdminLayout } from '../../components/layouts';
import { SummaryTile } from '../../components/admin';

const AdminDashboardPage: NextPage = () => {
	const { data, error } = useSWR<IDashboardResponse>('/api/admin/dashboard', {
		refreshInterval: 30000 // 30seg
	});

	const [refreshIn, setRefreshIn] = useState(30);

	// Contador de 30 seg
	useEffect(() => {
		const interval = setInterval(() => {
			// console.log('tick');
			setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30));
		}, 1000);

		// eliminamos el interval cuando se desmonta el componente
		return () => clearInterval(interval);
	}, []);

	if (!error && !data) return <></>;

	if (error) {
		console.log(error);
		return <h3>Error al cargar la información</h3>;
	}

	const {
		numberOfOrders,
		paidOrders,
		notPaidOrders,
		numberOfClients,
		numberOfProducts,
		productsWithNoInventory,
		lowInventory
	} = data!;

	return (
		<AdminLayout
			title='Dashboard'
			subTitle='Estadísticas Generales'
			icon={<MdOutlineDashboard className='mr-2' />}
		>
			<div className='container mt-8'>
				<div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
					<SummaryTile
						title={numberOfOrders}
						subtitle='Ordenes Totales'
						icon={<MdCreditCard className='text-4xl text-blue-600' />}
					/>

					<SummaryTile
						title={paidOrders}
						subtitle='Ordenes Pagadas'
						icon={
							<MdOutlineCreditScore className='text-4xl text-green-600' />
						}
					/>

					<SummaryTile
						title={notPaidOrders}
						subtitle='Ordenes Pendientes'
						icon={
							<MdOutlineCreditCardOff className='text-4xl text-red-600' />
						}
					/>

					<SummaryTile
						title={numberOfClients}
						subtitle='Clientes'
						icon={<MdOutlinePeopleAlt className='text-4xl text-slate-600' />}
					/>

					<SummaryTile
						title={numberOfProducts}
						subtitle='Productos'
						icon={<GiClothes className='text-4xl text-slate-600' />}
					/>

					<SummaryTile
						title={productsWithNoInventory}
						subtitle='Sin existencia'
						icon={<GiClothes className='text-4xl text-red-600' />}
					/>

					<SummaryTile
						title={lowInventory}
						subtitle='Bajo Inventario'
						icon={<GiClothes className='text-4xl text-yellow-600' />}
					/>

					<SummaryTile
						title={refreshIn}
						subtitle='Actualización en:'
						icon={<MdTimer className='text-4xl text-blue-600' />}
					/>
				</div>
			</div>
		</AdminLayout>
	);
};

export default AdminDashboardPage;
