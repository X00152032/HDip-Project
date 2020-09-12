<template>
<table class="table table-light table-hover table-sm bg-warning">
    <thead>
        <tr>
            <th class="sort" v-on:click="sortClick('id')">Id
                <font-awesome-icon v-show="sortItem.column === 'id'" v-if="sortItem.direction === 'asc'" icon="sort-up" />
                <font-awesome-icon v-show="sortItem.column === 'id'" v-else-if="sortItem.direction === 'desc'" icon="sort-down" />
            </th>
            <th class="sort" v-on:click="sortClick('firstName')">First Name
                <font-awesome-icon v-show="sortItem.column === 'firstName'" v-if="sortItem.direction === 'asc'" icon="sort-up" />
                <font-awesome-icon v-show="sortItem.column === 'firstName'" v-else-if="sortItem.direction === 'desc'" icon="sort-down" />
            </th>
            <th class="sort" v-on:click="sortClick('lastName')">Last Name
                <font-awesome-icon v-show="sortItem.column === 'lastName'" v-if="sortItem.direction === 'asc'" icon="sort-up" />
                <font-awesome-icon v-show="sortItem.column === 'lastName'" v-else-if="sortItem.direction === 'desc'" icon="sort-down" />
            </th>
            <th class="sort" v-on:click="sortClick('email')">Email
                <font-awesome-icon v-show="sortItem.column === 'email'" v-if="sortItem.direction === 'asc'" icon="sort-up" />
                <font-awesome-icon v-show="sortItem.column === 'email'" v-else-if="sortItem.direction === 'desc'" icon="sort-down" />
            </th>
            <th class="sort" v-on:click="sortClick('role')">Role
                <font-awesome-icon v-show="sortItem.column === 'role'" v-if="sortItem.direction === 'asc'" icon="sort-up" />
                <font-awesome-icon v-show="sortItem.column === 'role'" v-else-if="sortItem.direction === 'desc'" icon="sort-down" />
            </th>
            <th>
                &nbsp;
            </th>
        </tr>
    </thead>
        <thead>
        <tr>
            <th><input class="form-control search-small" placeholder="Id" v-model="search.id.criteria"></th>
            <th><input class="form-control" placeholder="First Name" v-model="search.firstName.criteria"></th>
            <th><input class="form-control" placeholder="Last Name" v-model="search.lastName.criteria"></th>
            <th><input class="form-control search-small" placeholder="Email" v-model="search.email.criteria"></th>
            <th><input class="form-control search-small" placeholder="Role" v-model="search.role.criteria"></th>
            <th>
                <button class="btn btn-primary" v-on:click="getUsers">Find</button>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="row in users" v-on:click="clickUser(row)" :class="{ selected: row.selected }" v-bind:key="row.id">
            <td>{{ row.id }}</td>
            <td>{{ row.firstName }}</td>
            <td>{{ row.lastName }}</td>
            <td>{{ row.email }}</td>
            <td>{{ row.role }}</td>
            <td class="delete-icon">
                <a href="javascript:;" v-on:click="deleteUser($event, row)">
                    <font-awesome-icon icon="minus-circle" />
                </a>
            </td>
        </tr>
    </tbody>
</table>
</template>

<script>
export default {
    name: 'UserTable',
    props: ['users', 'userModel'],
    data: () => {
        return {
            // used for search
            search: {
                id: {
                    column: 'id',
                    operator: '=',
                    criteria: null
                },
                firstName: {
                    column: 'firstName',
                    operator: '=',
                    criteria: null
                },
                lastName: {
                    column: 'lastName',
                    operator: '=',
                    criteria: null
                },
                email: {
                    column: 'email',
                    operator: '=',
                    criteria: null
                },
                role: {
                    column: 'role',
                    operator: '=',
                    criteria: null
                }
            },
            // used for sorting
            sortItem: {
                column: null,
                direction: null,
            },
        };
    },
    methods: {
        clickUser(row) {
            this.users.forEach((user) => {
                user.selected = false;
            });
            row.selected = true;
            this.$parent.getUser(row.id);
        },
        getUsers() {
            // $parent = User.vue
            this.$parent.getUsers(this.search, this.sortItem);
        },
        sortClick(column) {
            this.sortItem.column = column;
            if (this.sortItem.direction === 'asc') {
                this.sortItem.direction = 'desc';
                this.getUsers();
            } else {
                this.sortItem.direction = 'asc';
                this.getUsers();
            }
        },
        deleteUser(event, row) {
            // stop propagation of the event to the table row
            event.stopPropagation();
            if (confirm(`Are you sure you want to do delete the user "${row.firstName} ${row.lastName} (${row.email})"?`)) {
                this.$parent.deleteUser(row.id);
            }
        },
    },
}
</script>
