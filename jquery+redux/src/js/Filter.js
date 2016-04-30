var Filter = (_ => {
	var _store, $filterWrap;

	function init(store) {
		_cacheDOM();
		_bindEvent();
		_store = store;
	}

	function _cacheDOM() {
		$filterWrap = $('.filterWrap');
	}

	function _bindEvent() {
		$filterWrap
			.off('click.setFilter')
			.on('click.setFilter', '.filter', _handleSetFilter);
	}

	function _handleSetFilter() {
		var filter = $(this).attr('data-filter');
		_store.dispatch({
			type: 'SET_VISIBILITY', 
			data: {
				filter
			}
		});
	}

	return {
		init
	}
})();

export default Filter;
