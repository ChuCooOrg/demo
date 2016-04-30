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
		$.ajax({
			url: `${BASE_URL}tasks/${id}`, 
			type: 'delete', 
			dataType: 'json', 
			contentType: "application/json; charset=utf-8",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true, 
			success: function(data) {
				console.log(data);
				_store.dispatch({
					type: 'DELETE_TASK', 
					data: {
						id
					}
				});
			}, 
			error: function(jqXHR) {
				console.dir(jqXHR);
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
