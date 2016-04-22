var $list = Symbol('$list');
class TodoList {
	constructor() {
		// cache DOM
		this[$list] = $('#todoList');

		// bind event
		this[$list]
			.off('click.del')
			.on('click.del', '.btn-del', this._handleDel.bind(this));
		this[$list]
			.off('click.changeStatus')
			.on('click.changeStatus', '.btn-status', this._handleChangeStatus.bind(this));
	}

	_handleDel(e) {
		var $this = $(e.currentTarget);
		var id = $this.parents('.tasks').attr('id');
		$.ajax({
			url: `${App.BASE_URL}tasks/${id}`, 
			type: 'delete', 
			dataType: 'json', 
			contentType: "application/json; charset=utf-8",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true, 
			success: function(data) {
				console.log(data);
				this[$list].find(`#${id}`).remove();
			}.bind(this), 
			error: function(jqXHR) {
				console.dir(jqXHR);
			}
		});
	}

	_handleChangeStatus(e) {
		var $this = $(e.currentTarget);
		var id = $this.parents('.tasks').attr('id');
		var status = $this.attr('data-status');
		var isDone = status == 'done' ? false : true;
		$.ajax({
			url: `${App.BASE_URL}tasks/${id}`, 
			type: 'patch', 
			dataType: 'json', 
			contentType: "application/json; charset=utf-8",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true, 
			data: JSON.stringify({
				isDone
			}), 
			success: function(data) {
				console.log(data);
				$this
					.text((isDone ? 'Done' : 'Yet'))
					.attr('data-status', (isDone ? 'done' : 'det'))
					.parents('.tasks')
					.removeClass('danger success')
					.addClass(`${isDone ? 'success' : 'danger'}`)
			}, 
			error: function(jqXHR) {
				console.dir(jqXHR);
			}
		});
	}

	addTask(data) {
		console.dir(data);
		this[$list]
			.find('tbody')
			.append(
				`<tr id=${data.id} class="tasks danger">
					<td class="taskStatus">
						<button data-status="yet" type="button" class="btn btn-default btn-status">Yet</button>
					</td>
					<td class="taskName">
						${$('<textarea>').text(data.text).html()}
						<span class="glyphicon glyphicon-remove btn-del pull-right" aria-hidden="true"></span>
					</td>
				</tr>`
			);
	}

	render(list) {
		this[$list].find('tbody').html('');
		list.forEach(function(val, i) {
			this[$list]
				.find('tbody')
				.append(
					`<tr id=${val.id} class="tasks ${val.isDone ? 'success' : 'danger'}">
						<td class="taskStatus">
							<button data-status=${val.isDone ? 'done' : 'yet'} type="button" class="btn btn-default btn-status">${val.isDone ? 'Done' : 'Yet'}</button>
						</td>
						<td class="taskName">
							${$('<textarea>').text(val.text).html()}
							<span class="glyphicon glyphicon-remove btn-del pull-right" aria-hidden="true"></span>
						</td>
					</tr>`
				);
		}.bind(this));
	}
}
