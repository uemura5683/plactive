// javascript
var nodeApp = document.querySelector('#app');
var nodeCheckbox = nodeApp.querySelectorAll('input[type="checkbox"]');
var nodeItems = nodeApp.querySelectorAll('.item'); // 商品ノードのリスト
var nodeCount = nodeApp.querySelector('.count'); // 表示件数のノード
var count = nodeItems.length;

// チェックボックスイベントハンドラ
nodeCheckbox[0].addEventListener("change", onCheckChanged, false);
nodeCheckbox[1].addEventListener("change", onCheckChanged, false);

window.onload = function() {
	var count = nodeItems.length;
	nodeCount.textContent = count + '件';
}

function onCheckChanged(event) {

	var count = nodeItems.length;
	// 全ての商品ノードをお一旦表示する
	for (var i = 0; i < nodeItems.length; i++) {
		showNode(nodeItems[i]);
	}
	// セール対象のチェックが付いている場合
	if( nodeCheckbox[0].checked ) {
		for (var i = 0; i < nodeItems.length; i++) {
			if(!isSaleItems(nodeItems[i])) {
				// この商品を非表示にする
				hideNode(nodeItems[i]);
				// 件数をのこカウントを減らす
				count--;
			}
		}
	}
	// 送料無料のチェックが付いている場合
	if( nodeCheckbox[1].checked ) {
		for (var i = 0; i < nodeItems.length; i++) {
			if(!isDelvfreeItems(nodeItems[i])) {
				// この商品を非表示にする
				hideNode(nodeItems[i]);
				// 件数をのこカウントを減らす
				count--;
			}
		}
	}
	nodeCount.textContent = count + '件';
}

// セール商品かどうか判断する関数
function isSaleItems(nodeItems) {
	var node = nodeItems.querySelector('.status');
	return ( node && node.textContent == 'SALE' );
}

// 送料無料かどうか判断する関数
function isDelvfreeItems(nodeItems) {
	var node = nodeItems.querySelector('.shipping-free');
	return ( node && node.textContent == '送料無料' );
}

// ノードを非表示にする関数
function hideNode(node) {
	node.setAttribute('style', 'display:none;');
}

// ノードを表示する関数
function showNode(node) {
	node.removeAttribute('style');
}

