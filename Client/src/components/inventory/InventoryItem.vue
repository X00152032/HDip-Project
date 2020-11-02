<template>
<article>
    <h4>{{ productModel.productName }}</h4>
    <div class="gallery">
        <div class="picture" v-for='item in pictures' :key='item.id'>
            <div class="delete-icon" v-show="loggedIn">
                <a href="javascript:;" v-on:click="deletePicture(item.id)">
                    <font-awesome-icon icon="minus-circle" />
                </a>
            </div>
            <img v-bind:src='item.picture' :alt='item.pictureName'>
            <p><strong>{{ item.pictureName }}</strong></p>
        </div>
    </div>
    <p>{{ productModel.description }}</p>
    <p>Price: {{ productModel.price }}, {{ productModel.stock }} in stock</p>
</article>
</template>

<script>
import axios from 'axios';
import serverDetails from '../../constants';

export default {
    name: 'InventoryItem',
    props: ['productModel'],
    data() {
        return {
            pictures: []
        }
    },
    computed: {
        loggedIn() {
            return sessionStorage.loggedIn === "true";
        },
    },
    methods: {
        deletePicture(id) {
            if (confirm(`Are you sure you want to do delete the picture?`)) {
                let url = serverDetails.url;
                let params = {...serverDetails.params};
                axios.delete(`${url}picture/${id}`, {
                        params
                    })
                    .then(() => {
                        this.pictures = this.pictures.filter((picture) => {
                            return picture.id != id;
                        })
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        },
        getPictures() {
            this.error = null;
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            params.search = { };
            params.search['productId'] = {
                column: 'productId',
                operator: '=',
                criteria: this.productModel.id
            };
            // get non-observed version of the current model, 
            // so when the model changes it will not effect the product id search parameter
            params.search = {...params.search};
            axios.get(`${url}picture/`, {
                    params
                })
                .then(response => {
                    this.pictures = [];
                    if (response.data) {
                        response.data.forEach((record) => {
                            let picture = {
                                id: record.id,
                                productId: record.productId,
                                pictureName: record.pictureName,
                                picture: 'data:image/jpeg;base64,' + record.picture
                            }
                            this.pictures.push(picture);
                        });
                    }
                })
                .catch(error => {
                    this.error = error.toString();
                    console.log(error);
                })
        }
    },
    mounted() {
        this.getPictures();
    }
}
</script>

<style scoped>
article {
    padding-top: 10px;
    border-bottom: 3px solid blueviolet;
}

.delete-icon {
    color: blue;
    text-align: right;
    padding-top: 5px;
    padding-right: 5px;
}

.picture {
    display: inline-block;
    text-align: center;
    background-color: cornflowerblue;
    margin: 10px;
}

img {
    margin: 10px;
}

p {
    margin: 8px;
}
</style>
