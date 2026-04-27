// 当页面加载完成
// window.addEventListener('load', function () {
// 	document.querySelector('.loader-container').style.display = 'none'
// })



const qst_clsfct_item_list = document.querySelectorAll(".question .classification .item")

for (let i = 0; i < qst_clsfct_item_list.length; i++) {
	qst_clsfct_item_list[i].addEventListener('click', () => {
		if (document.querySelector('.question .classification .item.active')) {
			document.querySelector('.question .classification .item.active').classList.remove('active')
		}

		qst_clsfct_item_list[i].classList.toggle("active")
	})
}