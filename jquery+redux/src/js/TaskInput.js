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
			_store.dispatch({
				type: 'ADD_TASK', 
				data: {
					id: Date.now(), 
					text
				}
			});
			$inputWrap.find('#addTaskInput').val('');
		}
	}

	return {
		init
	}
})();

export default TaskInput;
