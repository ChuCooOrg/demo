var TodoList = (_ => {
	var _store, $listWrap;

	function _cacheDOM() {
		$listWrap = $('#listWrap');
	}

	function _bindEvent() {
		$listWrap
			.off('click.delTask')
			.on('click.delTask', '.btn-delTask', _handleDelTask);
		$listWrap
			.off('click.updateTask')
			.on('click.updateTask', '.taskStatus', _handleUpdateTask);
	}

	function init(store) {
		_cacheDOM();
		_bindEvent();
		_store = store;
	}

	function _handleDelTask() {
		var id = $(this).parent('.task').attr('data-taskid');
		_store.dispatch({
			type: 'DELETE_TASK', 
			data: {
				id
			}
		});
	}

	function _handleUpdateTask() {
		var isDone = $(this).hasClass('yet');
		var id = $(this).parent('.task').attr('data-taskid');
		_store.dispatch({
			type: 'UPDATE_TASK', 
			data: {
				id, 
				isDone
			}
		})
	}

	return {
		init
	}
})();

export default TodoList;
