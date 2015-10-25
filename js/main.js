var projectColor = {};

TimeLineView.prototype.getMessagePanelOld = TimeLineView.prototype.getMessagePanel;
TimeLineView.prototype.getMessagePanel = function(a, b) {
	var message_panel = this.getMessagePanelOld(a, b);
	var $message      = $('<div>').html(message_panel);

	// image inline preview
	$message.find('a[href$=".gif"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"]')
		.each(function () {
			this.innerHTML = null;
			$('<img style="display:box; height:250px; border:1px solid #CCC;" />')
				.attr("src", $(this).attr("href")).appendTo(this);
		});
	
	// code highlight
	$message.find('code').each(function() {
		hljs.highlightBlock(this);
	});
	
	// commit message
	var html = $message.html().replace(/\[commit.*?\][\r\n]?([\s\S]*?)\[\/commit\][\r\n]?/gi, function(k, v) {

		v = v.replace(/\[.+?\]/gi, function(v) {
			var labelStyle.color = projectColor[v];
			return '<p><strong style="color:' + color + '">' + v + '</strong></p><hr>';
		});
		
		return v;
	});

	$message.html(html);
	return $message.html();
};

$(function(){
	RL.rooms[RM.id].build();
});
