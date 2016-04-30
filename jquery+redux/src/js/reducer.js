import { combineReducers } from 'redux';

function tasks(state = [], action) {
	switch (action.type) {
		case 'ADD_TASK':
			return [
				...state, 
				{
					id: action.data.id, 
					text: action.data.text, 
					isDone: false
				}
			];
		case 'UPDATE_TASK':
			return state.map((val, i) => {
				if(val.id == action.data.id) {
					return Object.assign({}, val, {
						isDone: action.data.isDone
					});
				}
				return val;
			});
		case 'DELETE_TASK': 
			var index = 0;
			state.forEach((val, i) => {
				if(val.id == action.data.id) {
					index = i;
				}
			});
			return [
				...state.slice(0, index), 
				...state.slice(index +1, state.length)
			];
		default: 
			return state;
	}
}

const todo = combineReducers({
	tasks
});

export default todo;
