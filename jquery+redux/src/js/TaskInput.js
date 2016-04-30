var TaskInput = (_ => {
	var _store;
	var $inputWrap;

	function init(store) {
		_cacheDOM();
		_bindEvent();
		_store = store;
	}

	function _cacheDOM() {
		$inputWrap = $('#addTaskWrap');
	}

	function _bindEvent() {
		$inputWrap
			.off('click.addTask')
			.on('click.addTask', '#btn-addTask', _handleAddTask)
		$inputWrap
			.off('keypress.addTask')
			.on('keypress.addTask', '#addTaskInput', _handleKeypress);
	}

	function _handleKeypress(e) {
		if(e.which == 13) {
			_handleAddTask();
		}
	}

	function _handleAddTask() {
		var text = $inputWrap.find('#addTaskInput').val();
		if(text) {

			$.ajax({
				url: `${BASE_URL}tasks`, 
				type: 'post', 
				dataType: 'json', 
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify({
					text
				}), 
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true, 
				success: function(data) {
					_store.dispatch({
						type: 'ADD_TASK', 
						data: {
							id: data.id, 
							text
						}
					});
					$inputWrap.find('#addTaskInput').val('');
				}.bind(this), 
				error: function(jqXHR) {
					console.dir(jqXHR);
				}
			});
		}
	}

	return {
		init
	}
})();

export default TaskInput;
