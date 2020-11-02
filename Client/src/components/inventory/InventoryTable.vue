<template>
<table class="table table-dark table-hover bg-secondary">
    <thead>
        <tr>
            <th class="sort" v-on:click="sortClick('id')">Id
                <font-awesome-icon v-show="sortItem.column === 'id'" v-if="sortItem.direction === 'asc'" icon="sort-up" />
                <font-awesome-icon v-show="sortItem.column === 'id'" v-else-if="sortItem.direction === 'desc'" icon="sort-down" />
            </th>
            <th class="sort" v-on:click="sortClick('productName')">Name
                <font-awesome-icon v-show="sortItem.column === 'productName'" v-if="sortItem.direction === 'asc'" icon="sort-up" />
                <font-awesome-icon v-show="sortItem.column === 'productName'" v-else-if="sortItem.direction === 'desc'" icon="sort-down" />
            </th>
            <th class="sort" v-on:click="sortClick('description')">Description
                <font-awesome-icon v-show="sortItem.column === 'description'" v-if="sortItem.direction === 'asc'" icon="sort-up" />
                <font-awesome-icon v-show="sortItem.column === 'description'" v-else-if="sortItem.direction === 'desc'" icon="sort-down" />
            </th>
            <th class="sort" v-on:click="sortClick('stock')">Stock
                <font-awesome-icon v-show="sortItem.column === 'stock'" v-if="sortItem.direction === 'asc'" icon="sort-up" />
                <font-awesome-icon v-show="sortItem.column === 'stock'" v-else-if="sortItem.direction === 'desc'" icon="sort-down" />
            </th>
            <th class="sort" v-on:click="sortClick('price')">Price
                <font-awesome-icon v-show="sortItem.column === 'price'" v-if="sortItem.direction === 'asc'" icon="sort-up" />
                <font-awesome-icon v-show="sortItem.column === 'price'" v-else-if="sortItem.direction === 'desc'" icon="sort-down" />
            </th>
            <th>Category</th>
            <th>
                &nbsp;
            </th>
        </tr>
    </thead>
    <thead>
        <tr>
            <th>
                <input class="form-control search-small" placeholder="Id" v-model="search.id.criteria">
            </th>
            <th>
                <div style="display:flex;">
                    <select class="form-control" v-model="search.productName.operator">
                        <option value='='> = </option>
                        <option value='contains'> contains </option>
                    </select>
                    <input class="form-control" placeholder="Name" v-model="search.productName.criteria">
                </div>
            </th>
            <th>
                <div style="display:flex;">
                    <select class="form-control" v-model="search.description.operator">
                        <option value='='> = </option>
                        <option value='contains'> contains </option>
                    </select>
                    <input class="form-control" placeholder="Description" v-model="search.description.criteria">
                </div>
            </th>
            <th>
                <div style="display:flex;">
                    <select class="form-control" v-model="search.stock.operator">
                        <option value='='> = </option>
                        <option value='>'> &gt; </option>
                        <option value='>='> &ge; </option>
                        <option value='<'> &lt; </option>
                        <option value='<='> &le; </option>
                    </select>
                    <input class="form-control search-small" placeholder="Stock" v-model="search.stock.criteria">
                </div>
            </th>
            <th>
                <div style="display:flex;">
                    <select class="form-control" v-model="search.price.operator">
                        <option value='='> = </option>
                        <option value='>'> &gt; </option>
                        <option value='>='> &ge; </option>
                        <option value='<'> &lt; </option>
                        <option value='<='> &le; </option>
                    </select>
                    <input class="form-control search-small" placeholder="Price" v-model="search.price.criteria">
                </div>
            </th>
            <th>
                <select class="form-control" v-model="search.category.criteria">
                    <option value="" selected>Category</option>
                    <option v-for="option in categories" :value="option.id" v-bind:key="option.id">{{ option.categoryName }}</option>
                </select>
            </th>
            <th>
                <button class="btn btn-primary" v-on:click="getProducts">Find</button>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="row in products" v-on:click="clickProduct(row)" :class="{ selected: row.selected }" v-bind:key="row.id">
            <td>{{ row.id }}</td>
            <td>{{ row.productName }}</td>
            <td>{{ row.description }}</td>
            <td>{{ row.stock }}</td>
            <td>{{ row.price }}</td>
            <td>{{ getCategoryName(row.categoryId) }}</td>
            <td class="delete-icon">
                <a href="javascript:;" v-on:click="deleteProduct($event, row)">
                    <font-awesome-icon icon="minus-circle" />
                </a>
            </td>
        </tr>
    </tbody>
</table>
</template>

<script>
export default {
    name: 'InventoryTable',
    props: ['products', 'categories'],
    data: () => {
        return {
            // used for search
            search: {
                id: {
                    column: 'id',
                    operator: '=',
                    criteria: null
                },
                productName: {
                    column: 'productName',
                    operator: '=',
                    criteria: null
                },
                description: {
                    column: 'description',
                    operator: '=',
                    criteria: null
                },
                stock: {
                    column: 'stock',
                    operator: '=',
                    criteria: null
                },
                price: {
                    column: 'price',
                    operator: '=',
                    criteria: null
                },
                category: {
                    column: 'categoryId',
                    operator: '=',
                    criteria: null
                },
            },
            // used for sorting
            sortItem: {
                column: null,
                direction: null,
            },
        };
    },
    methods: {
        getCategoryId(name) {
            let categoryIds = this.categories.filter((category) => {
                return category.categoryName === name;
            });
            return categoryIds[0].id || null;
        },
        getCategoryName(categoryId) {
            let category = this.categories.filter((category) => {
                return category.id == categoryId;
            });
            return category[0].categoryName || '';
        },
        clickProduct(row) {
            this.products.forEach((product) => {
                product.selected = false;
            });
            row.selected = true;
            this.$parent.getProduct(row.id);
        },
        getProducts() {
            // $parent is the parent component (in this case the Inventory.vue component)
            this.$parent.getProducts(this.search, this.sortItem);
        },
        deleteProduct(event, row) {
            // stop propagation of the event to the table row
            event.stopPropagation();
            if (confirm(`Are you sure you want to do delete the product "${row.productName}"?`)) {
                this.$parent.deleteProduct(row.id);
            }
        },
        sortClick(column) {
            this.sortItem.column = column;
            if (this.sortItem.direction === 'asc') {
                this.sortItem.direction = 'desc';
                this.getProducts();
            } else {
                this.sortItem.direction = 'asc';
                this.getProducts();
            }
        },
    },
}
</script>
