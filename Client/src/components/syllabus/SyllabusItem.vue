<template>
<!--If this is content for the homepage then do show, otherwise do nothing)
This is set by checkbox in subject form for boolean flag in Content table) -->
<article v-if="contentModel.HomepageArticle">
    <h4><b>{{ contentModel.contentName }}</b></h4>
    <div class="gallery">
        <div class="picture" v-for='item in pictures' :key='item.id'>
        <!--delete picture only an option when logged in -->
             <div class="delete-icon" v-show="loggedIn">
                <a href="javascript:;" v-on:click="deletePicture(item.id)">
                    <font-awesome-icon icon="minus-circle" />
                </a>
            </div><!--display picture -->
            <img v-bind:src='item.picture' :alt='item.pictureName'>
            <p><strong>{{ }}</strong></p>
        </div>
    </div><!--display content name and text -->
    <p>{{ contentModel.name }}</p>
    <p>{{ contentModel.text }}</p>
</article>
</template>

<script>
import axios from 'axios'; //promise-based HTTP client makes HTTP requests to fetch or save data
import serverDetails from '../../constants'; //local or hosted

//models for content
export default {
    name: 'SyllabusItem',
    props: ['contentModel'],
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
            params.search['contentId'] = {
                column: 'contentId',
                operator: '=',
                criteria: this.contentModel.id
            };
            
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
                                contentId: record.contentId,
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
/*Scope applies css to this only*/

article {
    padding-top: 10px;
    border-bottom: 1px solid rgb(33, 54, 240);
    margin-left:30px;
    margin-right:30px;

}

h4{
    padding-left: 7px;
}

.delete-icon {
    color: white;
    text-align: right;
    padding-top: 5px;
    padding-right: 10px;
}

.picture {
    display: inline-block;
    text-align: center;
    background-color: white;
    margin: 10px;
}

img {
    margin: 10px;
}

p {
    margin: 8px;
    margin-bottom:10px;
}

</style>
