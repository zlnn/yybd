new IScroll('#home', {
	mouseWheel: true,
	scrollbars: true
});
var arr = null;
$.ajax({
	url: 'data/data.json',
	dataType: 'json',
	success: function(data) {
		arr = data;
	}
})
$('.container').on('click', 'a', function(e) {
	e.preventDefault()
	var that = $(this).attr('href')
	var id = $(this).attr('id');

	$(that).css({
		transition: '0.3s all',
		transform: 'translate(0)'
	}).siblings().css({
		transition: '0.3s all',
		transform: 'translate(100%)'

	});
	if($(this).parent().parent()[0].nodeName == 'FOOTER') {
		$('#mark').css({
			transition: '0.3s all',
			left: $(this).index() * 25 + '%'

		})
	}
	if(that == '#favorite') {
		$('header').find('h2').text('收藏')
		$('.return').show()
	} else if(that == '#home') {
		$('header').find('h2').text('孕育宝典')
		$('.return').hide()
	} else if(that == '#history') {
		$('header').find('h2').text('历史记录')
		$('.return').show()
	} else if(that == '#config') {
		$('header').find('h2').text('设置')
		$('.return').show()
	}
	if(that == '#list') {
		$('header').find('h2').text($(this).attr('title'))
		$('.return').show()
		var str = '',
			data = arr[id];
		$.each(data.fenlei, function(idx, val) {
			str += `<div>              
  						<a href='#content'id=${id}_${idx}>
  							<img src="img/tu/${val.img}"/>
 							<span>${val.title}</span>
 						 </a>
  						</div>`
		})
		$('.list-iscroll').append(str)
	}
	if(that == '#content') {
		$('#content').html('')
		var str = $(this).attr('id');
		var fg = str.split('_');
		d = arr[fg[0]].fenlei[fg[1]].content;
		$('#content').append(d)
	}

})