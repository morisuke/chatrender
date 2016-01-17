var projectColor = {};

TimeLineView.prototype.getMessagePanelOld = TimeLineView.prototype.getMessagePanel;
TimeLineView.prototype.getMessagePanel = function(a, b) {
	var message_panel = this.getMessagePanelOld(a, b);
	var $message      = $('<div>').html(message_panel);
	
	// commit message
	var html = $message.html()

		.replace(/\[commit.*?\][\r\n]?([\s\S]*?)\[\/commit\][\r\n]?/gi, function(k, v) {

			v = v.replace(/\[.+?\]/gi, function(v) {
				var color = projectColor[v];
				return '<p><strong style="color:' + color + '">' + v + '</strong></p><hr>';
			});
			
			return v;
		})
		
		// マークダウンを開始
		.replace(/\[mk.*?\][\r\n]?([\s\S]*?)\[\/mk\][\r\n]?/gi, function(k, v){
			
			return marked(v);

		})

	// codeタグだけ内部のエスケープを解除
	$message.html(html).find('code').each(function(){
		$(this).html($(this).text());
	});

	// image inline preview
	$message.find('a[href$=".gif"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"]')
		.each(function () {
			this.innerHTML = null;
			$('<img>')
				.attr("src", $(this).attr("href"))
				.addClass('inline-open')
				.appendTo(this);
		});
	
	// code highlight
	$message.find('code').addClass('chatCode').each(function() {
		hljs.highlightBlock(this);
	});

	return $message.html();
};

$(function(){
	RL.rooms[RM.id].build();
});
