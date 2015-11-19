'use strict';

var React = require('react'),
		ProductList = require('./../components/ProductList'),
		ProductAdding = require('./../components/ProductAdding'),
		Pagination = require('./../components/Pagination'),
		DropDownList = require('./../components/DropDownList');

module.exports = React.createClass({
	getInitialState: function() {
		return ({
			productListData: [],
			categories: [],
			currentCat: '',
			pages: 1,
			currentPage: 1,
			productsPerPage: 5,
			productInfo: ''
		});
	},
	componentWillMount: function() {
		// get categories
		this.getCategoies();
		// get products
		this.getProductList(this.state.productsPerPage, this.state.currentPage);
	},
	getProductList: function(perPage, page, catId) {
		// Request get products list
		var url = '/api/products/'+ perPage +'/'+ page;
		url += catId ? '/'+ catId : '';
		console.log(url);
		var getProducts = $.get(url);

		getProducts.done(function(data) {
		console.log(JSON.stringify(data.products));
				var _pages = Math.floor(data.total/perPage);
				_pages += (data.total%perPage > 0) ? 1 : 0;
				this.setState({
					productListData: data.products,
					pages: _pages
				});
			}.bind(this));

		getProducts.fail(function(xhr, status, err) {
				console.error('/api/products', status, err.toString());
			}.bind(this));
	},
	getCategoies: function() {
		var getCats = $.get('/api/categories');

		getCats.done(function(data) {
				var cats = data.categories;
				console.log(JSON.stringify(cats));
				cats.splice(0, 0, { _id: '', categoryname: 'All' });
				this.setState({ categories: cats });
			}.bind(this));

		getCats.fail(function(xhr, status, err) {
				console.error('/api/catigories', status, err.toString());
			}.bind(this));
	},
	changeCategory: function(catId) {
		this.getProductList(this.state.productsPerPage, 1, catId);
		this.setState({currentCat: catId, currentPage: 1});
	},
	changeProductsPerPage: function(perPage) {
		// Update products list
		this.getProductList(perPage, 1, this.state.currentCat);
		// update this.state
		this.setState({productsPerPage: perPage, currentPage: 1});
	},
	moveToPage: function(pageIndex) {
		if(this.state.currentPage !== pageIndex) {
			this.setState({currentPage: pageIndex});

			// Options default
			var perPage = this.state.productsPerPage,
					page  = pageIndex;

			// Update data list
			this.getProductList(perPage, page, this.state.currentCat);
		}
	},
	render: function() {
		var pageSizes = [
			{ key: 5, value: 5 },
			{ key: 10, value: 10 },
			{ key: 15, value: 15 },
			{ key: 20, value: 20 },
			{ key: 25, value: 25 }
		];
		var formReturn = (
			<div className='panel panel-default'>
				<div className='panel-heading'>
					Products
				</div>
				<div className='panel-body'>
					<div className='row'>
						<div className='col-sm-6'>
							<label><DropDownList
								dataList={pageSizes}
								onChangeData={this.changeProductsPerPage}
								_class='input-sm'/></label>
						</div>
						<div className="col-sm-6">
							<DropDownList
								dataList={this.state.categories}
								onChangeData={this.changeCategory}
								_key='_id' _value='categoryname' _class='input-sm'/>
						</div>
					</div>
					<div className='table-responsive'>
						<table className='table table-striped table-bordered table-hover'>
							<thead>
								<tr>
									<th>#</th>
									<th>Product Name</th>
									<th>Category</th>
									<th>Price</th>
									<th>Stock</th>
									<th>Description</th>
								</tr>
							</thead>
							<tbody>
								{
									this.state.productListData.map(function(product, index) {
										return (
											<tr>
												<td>{index}</td>
												<td>{product.productname}</td>
												<td>{product.categories}</td>
												<td>{product.price}</td>
												<td>{product.stock}</td>
												<td>{product.description}</td>
											</tr>
										)
									})
								}
							</tbody>
						</table>
					</div>
				</div>

				<Pagination
					pages={this.state.pages}
					currentPage={this.state.currentPage}
					moveToPage={this.moveToPage}/>
			</div>
		);

		return formReturn;
	}
});
