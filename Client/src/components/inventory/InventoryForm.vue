<template>
<div>
    <!-- use the modal component, pass in the prop -->
    <CategoryDialog v-if="showCategoryDialog" @close="showCategoryDialog = false" :categoryId="model.categoryId">
        <h3 slot="header">Add/Edit Category</h3>
    </CategoryDialog>

    <form @submit.prevent>
        <div class="form-group">
            <label for="productName">Product Name *</label>
            <input class="form-control" placeholder="Name of product" id="productName" v-model="model.productName" :class="{ error : errorName }" @keyup="validate">
        </div>
        <div class="form-group">
            <label for="productDescription">Description</label>
            <input class="form-control" placeholder="Description of product" id="description" v-model="model.description">
        </div>
        <div class="form-group">
            <label for="stock">Stock *</label>
            <input type="number" class="form-control" placeholder="Number in stock" id="stock" v-model="model.stock" :class="{ error : lowStock }" @change="validate">
        </div>
        <div class="form-group">
            <label for="price">Price *</label>
            <input type="number" step="0.01" class="form-control" id="price" placeholder="Product price" v-model="model.price" :class="{ error : lowPrice }" @change="validate">
        </div>
        <div class="form-group">
            <label for="categoryId">Category *</label>
            <span class="form-inline" style="display:flex;">
                <select class="form-control" style="flex-grow:1;" id="categoryId" v-model="model.categoryId" :class="{ error : errorCategory }" @change="validate">
                    <option v-for="option in categories" :value="option.id" v-bind:key="option.id">{{ option.categoryName }}</option>
                </select>
                <button class="btn btn-primary" @click="addCategory()">
                    <font-awesome-icon icon="plus-square" /></button>
                <button class="btn btn-primary" @click="updateCategory()" :disabled="!this.model.categoryId">
                    <font-awesome-icon icon="pen-square" /></button>
                <button class="btn btn-primary" @click="deleteCategory()" :disabled="!this.model.categoryId">
                    <font-awesome-icon icon="minus-square" /></button>
            </span>
        </div>
        <div class="form-group">
            <label for="files">Pictures</label>
            <input type="file" id="files" name="files" multiple @change="onFileSelected">
        </div>
        <div class="form-group">
            <button class="btn btn-primary" v-on:click="addProduct" :disabled="!model.isValid">Add</button>
            <button class="btn btn-primary" v-on:click="updateProduct" :disabled="!model.isValid">Update</button>
            <button class="btn btn-secondary" v-on:click="resetProduct">Reset</button>
        </div>
    </form>
</div>
</template>

<script>
import CategoryDialog from '../CategoryDialog';

export default {
    name: 'InventoryForm',
    props: ['products', 'categories', 'productModel'],
    components: {
        CategoryDialog,
    },
    computed: {
        errorName() {
            return !this.model.isNew && (!this.model.productName || this.model.productName.length < 3);
        },
        lowStock() {
            return !this.model.isNew && this.model.stock < 5;
        },
        lowPrice() {
            return !this.model.isNew && this.model.price < 10;
        },
        errorCategory() {
            return !this.model.isNew && !this.model.categoryId;
        }
    },
    data() {
        return {
            model: this.productModel,
            showCategoryDialog: false,
            categoryId: null,
            files: [],
        }
    },
    methods: {
        onFileSelected(event) {
            this.files = event.target.files;
        },
        addCategory() {
            this.model.categoryId = null;
            this.showCategoryDialog = true;
        },
        updateCategory() {
            this.showCategoryDialog = true;
        },
        deleteCategory() {
            let category = this.categories.filter((category) => {
                return category.id == this.model.categoryId;
            });
            if (confirm(`Are you sure you want to do delete the category "${category[0].categoryName}"?`)) {
                this.$parent.deleteCategory(this.model.categoryId);
                this.model.categoryId = null;
            }
        },
        validate() {
            this.model.isNew = false;
            // returns an array of 1 category e.g. [{ id: 0, categoryName: '' }]
            let category = this.categories.filter((category) => {
                return category.id == this.model.categoryId;
            });
            if (!this.model.productName || this.model.productName.length < 3 || this.lowStock || this.model.price < 10 || category.length === 0) {
                this.model.isValid = false;
            } else {
                this.model.isValid = true;
            }
            return this.model.isValid;
        },
        addProduct() {
            if (!this.validate()) {
                return; // Not valid no more processing
            }
            let newProduct = {
                productName: this.model.productName,
                description: this.model.description,
                stock: this.model.stock,
                price: this.model.price,
                categoryId: this.model.categoryId,
            };
            this.$parent.addProduct(newProduct, this.files);
            this.resetProduct();
        },
        updateProduct() {
            if (!this.model.id) {
                alert('Please select a product to update');
                return; // No product selected
            }
            if (!this.validate()) {
                return; // Not valid no more processing
            }
            let currentProduct = {
                id: this.model.id,
                productName: this.model.productName,
                description: this.model.description,
                stock: this.model.stock,
                price: this.model.price,
                categoryId: this.model.categoryId,
            };
            this.$parent.updateProduct(currentProduct, this.files);
            this.resetProduct();
        },
        resetProduct() {
            this.model.isNew = true;
            this.model.isValid = false;
            this.model.id = null;
            this.model.productName = null;
            this.model.description = null;
            this.model.stock = 0;
            this.model.price = 0;
            this.model.categoryId = null;
            this.files = [];
        },
    },
}
</script>
