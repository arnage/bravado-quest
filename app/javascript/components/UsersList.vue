<template>
  <div :class="$style.container">
    <div :class="$style.searchContainer">
      <i :class="$style.searchIcon"></i>
      <input
        :class="$style.searchBox"
        type="search"
        name="search"
        placeholder="Search..."
        v-on:input="debouncedSearchUser"
        :value="searchQuery"
      />
    </div>
    <div :class="$style.listContainer">
      <virtual-list
        :size="136"
        :remain="4"
        :item="userComponent"
        :itemcount="scrollSize"
        :itemprops="getItemProps"
      />
    </div>
  </div>
</template>

<script>
  import virtualList from 'vue-virtual-scroll-list';
  import debounce from 'debounce';
  import User from './User.vue';

  export default {
    name: 'UsersList',
    data () {
      return {
        userComponent: User,
        users: [],
        filteredUsers: [],
        searchQuery: window.location.pathname.match(/[^/]*$/)[0],
      }
    },
    created () {
      this.$http.plain.get('/users')
        .then(response => {
          this.users = response.data.map((user, index) => ({
            ...user,
            id: index,
            searchIndex: Object.values(user).join(' '),
            selected: false
          }));

          if (this.searchQuery) {
            this.searchUser(this.searchQuery);
          }
        })
        .catch(error => console.error(error, 'Something went wrong'));
    },
    computed: {
      scrollSize: function() {
        const users = this.getActualUsersList();
        return users.length;
      }
    },
    components: { 'virtual-list': virtualList },
    methods: {
      pushHistoryState: function(query) {
        history.pushState(
          {},
          null,
          query ? '/search/' + query : '/'
        )
      },
      debouncedSearchUser: debounce(
        function(e) {
          const query = e.target.value || '';
          this.searchUser(query);
        },
        400
      ),
      searchUser: function(query) {
        this.filteredUsers = this.users.filter(user => user.searchIndex.includes(query));

        this.searchQuery = query;
        this.pushHistoryState(query);
      },
      getActualUsersList () {
        return this.searchQuery ? this.filteredUsers : this.users;
      },
      getItemProps (itemIndex) {
        const info = this.getActualUsersList()[itemIndex];

        return {
          key: itemIndex,
          props: {
            index: itemIndex,
            highlightString: this.searchQuery,
            updateSelection: this.updateSelection,
            info
          }
        }
      },
      updateSelection (id) {
        this.$set(this.users[id], 'selected', !this.users[id].selected);
      }
    }
  }
</script>

<style module>
  .container {
    display: block;
    position: relative;
    margin: 54px auto;
    max-width: 564px;
    max-height: 643px;
    background-color: #FFFFFF;
  }

  .listContainer {
    display: block;
    overflow-y: auto;
    height: 554px;
    margin-right: 10px;
  }

  .listContainer ::-webkit-scrollbar {
    width: 4px;
  }
  
  .listContainer ::-webkit-scrollbar-track {
    box-shadow: inset -1px 1px 2px rgba(0, 0, 0, 0.3)
  }
  
  .listContainer ::-webkit-scrollbar-thumb {
    background-color: #4D4D4D;
    border-radius: 2px;
    height: 40px;
  }

  .searchContainer {
    display: inline-flex;
    flex: 1 1 300px;
    position: relative;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
    border-radius: 2px;
    overflow: hidden;
    margin: 20px 12px 0;
    min-width: 514px;
    height: 48px;
    padding: 0 0 0 10px;
  }

  .searchIcon {
    padding: 6px;
    width: 14px;
    background-image: url("../images/search.svg");
    background-repeat: no-repeat;
    background-position: center;
  }

  .searchBox {
    border: 0;
    padding: 0 10px 0;
    flex: 1;
    font-size: 24px;
    line-height: 28px;
  }
</style>