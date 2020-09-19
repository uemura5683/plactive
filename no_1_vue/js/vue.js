Vue.filter('number_format', function(val) {
    return val.toLocaleString();
});

// 商品一覧コンポーネント
var app = new Vue({
    el: '#app',
    data: {
        //「セール対象」のチェック状態( true チェックあり・falseチェックなし)
        showSaleItem: false,
        //「送料無料」のチェック状態( true チェックあり・falseチェックなし)
        showDelvFree: false,
        // 並び替えの選択値(1：標準、2：値段が安い順)
        sortOrder: 1,
        // 商品リスト
        products: [],
        // エラーの有無
        isError: true,
        // メッセージ
        message: ''
    },
    created: function() {
        // JSONPのURL(サーバーに設置する)
        var url = 'js/products.js';
        //非同期通信でJSONPを読み込む
        $.ajax ({
            url : url,
            type : 'GET',
            dataType : 'jsonp',
            jsonp: 'callback',
            jsonpCallback : 'products'
        }).done ( function( data, textStatus, jqXHR ) {
            this.products = data;
        }.bind( this ) )
        .fail ( function( jqXHR, textStatus, errorThrown ) {
            this.isError = true;
            this.message = '商品リストの読み込みに失敗しました。'
        }.bind( this ) );
    },
    computed: {
        // 絞り込み後の商品リストを返す算出プロパティ
        filterList: function() {
            // 絞り込み後の商品リストを格納する新しい配列
            var newList = [];
            for ( var i = 0; i < this.products.length; i++ ) {
                // 表示対象かどうか判定するフラグ
                var isShow = true;
                // 一番目の商品が表示対象かどうか判定する
                if ( this.showSaleItem && !this.products[i].isSale) {
                    //セールチェックありで、セール対象商品ではない場合
                    isShow = false;
                }
                if ( this.showDelvFree && !this.products[i].delv > 0) {
                    //送料無料のチェックありで、送料無料の対象商品ではない場合
                    isShow = false;
                }
                // 対象商品の商品だけを新しい配列に追加する。
                if ( isShow ) {
                    newList.push( this.products[i] );
                }    
            }
            //新しい配列を並び替える
            if( this.sortOrder == 1 ) {
                // 元の順番にpushしているので並び替えすみ
            } else if ( this.sortOrder == 2 ) {
                newList.sort( function( a, b ) {
                    return a.price - b.price;
                } );
            } else if ( this.sortOrder == 3 ) {
                newList.sort( function( a, b ) {
                    return b.price - a.price;
                } )
            }
            return newList;
        },
        count: function() {
            return this.filterList.length;
        }
    }
});