
var data = {
	books:[
		{"ID":1,"name":"红楼梦","author":"曹雪芹","price":45},
		{"ID":2,"name":"水浒传","author":"曹雪芹","price":28},
		{"ID":3,"name":"西游记","author":"曹雪芹","price":34},
		{"ID":4,"name":"简爱","author":"曹雪芹","price":62},
		{"ID":5,"name":"一千零一夜","author":"曹雪芹","price":67}
	],
	type:'请输入您要搜索的内容',
}

var vm = new Vue({
	el:"#app",
	data:data,
	methods:{
		add:function(){
			this.id=$("#ID").val();
			this.name = $("#name").val();
			this.author = $("#author").val();
			this.price = $("#price").val();
			var book ={
				'ID':this.id,
				'name':this.name,
				'author':this.author,
				'price':this.price
			};
			console.log(book);
			data.books.push(book);
			localStorage.setItem("books",book);
			this.id="";
			this.name = " ";
			this.author = " ";
			this.price = " ";
		},
		del:function(){
			this.books.splice(this.index,1);
		},
		
		typeFun:function(type){
			var obj = {};
			obj[type] = this.inputVal;
			return obj;
		},
		chageType:function(types){
			this.type = types;
			console.log(123);
		}
	}
})
