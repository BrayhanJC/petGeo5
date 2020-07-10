export const ACTUALIZAR_CLIENTE = 'ACTUALIZAR_CLIENTE';

export const actualizarCliente = (cliente) => ({
	type: ACTUALIZAR_CLIENTE,
	cliente,
});

const initialState = {
	cliente: {
		idcliente: 0,
		nombre_cliente: '',
		apellidoP_cliente: '',
		celular_cliente: '',
		sexo_cliente: '',
		email_cliente: '',
	},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ACTUALIZAR_CLIENTE:
			return {
				...state,
				cliente: action.cliente,
			};
		default:
			return state;
	}
};
