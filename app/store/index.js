import { combineReducers } from 'redux';

import login, { actualizarLogin } from './login';
import cliente, { actualizarCliente } from './cliente';

export default combineReducers({
	login,
	cliente
});

export const actions = {
	actualizarLogin: actualizarLogin,
	actualizarCliente: actualizarCliente
};
