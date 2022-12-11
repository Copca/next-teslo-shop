import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import useSWR from 'swr';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { FaUsers } from 'react-icons/fa';

import { clienteAxios } from '../../axios';
import { IUser } from '../../interfaces';

import { AdminLayout } from '../../components/layouts';

const UsersPage: NextPage = () => {
	const { data, error } = useSWR<IUser[]>('/api/admin/users');
	const [users, setUsers] = useState<IUser[]>([]);

	useEffect(() => {
		if (data) {
			setUsers(data);
		}
	}, [data]);

	if (!data && !error) return <></>;

	const onChangeRole = async (userId: string, newRole: string) => {
		// Esta técnica se usa para cambiar de inmediato en el Front sin esperar la respuesta del back en caso se haber un error el back se renderizan los valores iniciales de user
		const previousUsers = users.map((user) => ({ ...user })); // clonamos el objeto rompiendo su referencia
		const updatedUsers = users.map((user) => ({
			...user,
			role: userId === user._id ? newRole : user.role
		}));

		setUsers(updatedUsers);

		try {
			await clienteAxios.put('/admin/users', { userId, role: newRole });
		} catch (error) {
			console.log(error);
			// en caso de error revertimos los valores de user
			setUsers(previousUsers);
			alert('No se pudo actualizar el role de usuario');
		}
	};

	const columns: GridColDef[] = [
		{ field: 'email', headerName: 'Correo', width: 250 },
		{ field: 'name', headerName: 'Nombre Completo', width: 300 },
		{
			field: 'role',
			headerName: 'Role',
			width: 200,
			renderCell: ({ row }: GridRenderCellParams) => {
				return (
					<select
						className='focus:outline-none bg-transparent'
						value={row.role}
						onChange={({ target }) => onChangeRole(row.id, target.value)}
					>
						<option value='admin'>Administrador</option>
						<option value='client'>Cliente</option>
						<option value='super-user'>Super Usuario</option>
						<option value='seo'>SEO</option>
					</select>
				);
			}
		}
	];

	const rows = users.map((user) => ({
		id: user._id,
		email: user.email,
		name: user.name,
		role: user.role
	}));

	return (
		<AdminLayout
			title='Usuarios'
			subTitle='Mantenimiento de usuarios'
			icon={<FaUsers className='mr-2' />}
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

export default UsersPage;
