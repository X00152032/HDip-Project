<template>
<div>
    <div class="row bg-light text-dark">
        <div class="col-sm-4">
            <InventoryForm :products="products" :categories="categories" :productModel="productModel" />
        </div>
        <div class="col-sm-8 bg-secondary">
            <div class="row row-table">
                <InventoryTable :products="products" :categories="categories" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import serverDetails from '../../constants';
import InventoryForm from './InventoryForm';
import InventoryTable from './InventoryTable';

export default {
    name: 'Inventory',
    components: {
        InventoryForm,
        InventoryTable,
    },
    computed: {
        productCount() {
            if (this.products) {
                return this.products.length;
            } else {
                return 0;
            }
        },
    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
        this.getData();
    },
    data() {
        return {
            loading: false,
            error: null,
            categories: null,
            products: null,
        }
    },
    methods: {
        getData() {
            this.error = null;
            this.loading = true;
            axios.all([this.getCategories(), this.getProducts()])
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                });
        },
        addPictures(productId, files) {
            const fd = new FormData();
            fd.append('productId', productId);
            for (let i = 0; i < files.length; i++) {
                fd.append('files[' + i + ']', files[i], files[i].name);
            }
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            axios.post(`${url}picture`, fd, {
                params
            }).then((result) => {
                console.log(result);
            }).catch(err => {
                console.log(err);
            });
        },
        deleteCategory(id) {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            axios.delete(`${url}category/${id}`, {
                    params
                })
                .then(() => {
                    this.loading = false;
                    this.getCategories();
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                    alert(error.response.data);
                })
        },
        getCategories() {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            axios.get(`${url}category`, {
                    params
                })
                .then(response => {
                    this.loading = false;
                    this.categories = response.data;
                    console.log('promise has resolved', response.data);
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },
        addProduct(newProduct, files) {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            axios.post(`${url}product`, newProduct, {
                    params
                })
                .then((res) => {
                    this.addPictures(res.data.id, files);
                    this.getProducts();
                    this.loading = false;
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },
        getProduct(id) {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            axios.get(`${url}product/${id}`, {
                    params
                })
                .then(response => {
                    this.loading = false;
                    this.productModel.id = response.data.id;
                    this.productModel.productName = response.data.productName;
                    this.productModel.description = response.data.description;
                    this.productModel.stock = response.data.stock;
                    this.productModel.price = response.data.price;
                    this.productModel.picture = response.data.picture;
                    this.productModel.categoryId = response.data.categoryId;
                    this.productModel.isValid = true;
                    console.log('promise has resolved', response.data);
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },
        getProducts(search, order) {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            if (search) {
                params.search = {};
                Object.values(search).forEach((value) => {
                    if (value.criteria) {
                        params.search[value.column] = {
                            column: value.column,
                            operator: value.operator,
                            criteria: value.criteria
                        }
                        console.log(params);
                    }
                });
            }
            if (order && order.column) {
                params.order = order;
            }
            axios.get(`${url}product`, {
                    params
                })
                .then(response => {
                    this.loading = false;
                    this.products = response.data;
                    console.log('promise has resolved', response.data);
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },
        deleteProduct(id) {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            axios.delete(`${url}product/${id}`, {
                    params
                })
                .then(() => {
                    this.loading = false;
                    this.getProducts();
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },
        updateProduct(currentProduct, files) {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            axios.put(`${url}product`, currentProduct, {
                    params
                })
                .then(() => {
                    this.addPictures(currentProduct.id, files);
                    this.getProducts();
                    this.loading = false;
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },
    },
    props: ['productModel'],
    watch: {
        // call again the method if the route changes
        '$route': 'getData'
    },
}
</script>
