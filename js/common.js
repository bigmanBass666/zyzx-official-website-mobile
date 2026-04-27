if (document.querySelector('.loader-container')) { // 5个 tabBar 页面
	// 当页面加载完成
	window.addEventListener('load', function () {
		// 隐藏 loading 动画，因为背景图已经加载完成
		console.log('页面加载完成')
		setTimeout(() => {
			console.log('延迟隐藏 loading 动画')
			document.querySelector('.loader-container').style.display = 'none'
		}, 800)
	})

	// 除index.html以外的4个图片页面的body
	if (document.querySelector('body.empty')) {
		document.querySelector('body.empty').addEventListener('click', function (e) {
			if (e.target.classList.contains('loader-container') || e.target.classList.contains('tabBar')) return

			console.log('body 被点击')

			// 跳转至todo.html
			window.location.href = '/html/todo.html'
		})
	}
}

// 返回上一级按钮
const backBtn = document.querySelector('#backBtn')
if (backBtn) {
	backBtn.addEventListener('click', function () {
		window.history.back()
	})
}