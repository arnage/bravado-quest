<template>
  <div :class="[info.selected ? [$style.container, $style.selected] : $style.container]">
    <img
      :class="$style.avatar"
      :src="info.avatar"
      :alt="info.name"
      onerror="this.style.visibility='hidden'"
      ref="imageTag"
    />
    <div :class="$style.infoContainer">
      <div :class="$style.info">
        <div :class="$style.header">
          <span
            :class="$style.name"
            v-html="$options.filters.highlight(info.name, highlightString)">
              {{ info.name }}
            </span>
          <span
            :class="$style.email"
            v-html="$options.filters.highlight(info.email, highlightString)">
          >
              {{ info.email }}
          </span>
        </div>
        <span
          :class="$style.title"
          v-html="$options.filters.highlight(info.title, highlightString)">
        >
          {{ info.title }}
        </span>
        <span
          :class="$style.address"
          v-html="$options.filters.highlight(`${info.address}, ${info.city}`, highlightString)">
        >
          {{ info.address }}, {{ info.city }}
        </span>
      </div>
      <div :class="$style.button" @click="selectUser">
        <span>{{ info.selected ? 'SKIP SELECTION' : 'MARK AS SUITABLE' }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';

  Vue.filter('highlight', function(word, query) {
    const trimmedQuery = query.trim()

    if (!trimmedQuery || !word.includes(trimmedQuery)) {
      return word;
    }

		return word.replace(trimmedQuery, '<span style=\'background-color: yellow \'>' + trimmedQuery + '</span>');
  });

  export default {
    name: 'User',
    props: {
      index: {
        default: 0
      },
      highlightString: {
        type: String,
        default: ''
      },
      info: {
        type: Object,
        default: () => ({
          name: '',
          email: '',
          title: '',
          address: '',
          city: '',
          selected: false
        })
      },
      updateSelection: {
        type: Function
      }
    },
    data () {
      return {}
    },
    beforeDestroy () {
      this.$refs.imageTag.src = '';
    },
    methods: {
      selectUser() {
        this.updateSelection(this.info.id);
      }
    }
  }
</script>

<style module>
  .container {
    display: flex;
    flex-direction: row;
    min-width: 524px;
    height: 136px;
    margin: 22px 12px;
    background: #FAFAFA;
    border: 1px solid #FAFAFA;
    box-sizing: border-box;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
    border-radius: 3px;
  }

  .selected {
    border: 1px solid #4765FF;
    box-sizing: border-box;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
  }

  .infoContainer {
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 14px;
  }

  .info {
    flex: 2;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    padding-left: 28px;
  }

  .button {
    flex: 1;
    font-weight: 500;
    line-height: 16px;
    padding-left: 28px;
    display: flex;
    align-items: center;
    cursor: pointer;

    color: #009688;
  }

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 9px 0 0;
  }

  .name {
    font-size: 24px;
    line-height: 32px;

    color: rgba(0, 0, 0, 0.87);
  }

  .email {
    line-height: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    color: rgba(0, 0, 0, 0.54);
  }

  .title {
    display: block;
    font-weight: bold;
    line-height: 20px;

    color: rgba(0, 0, 0, 0.543846);
  }

  .address {
    font-weight: normal;
    
    line-height: 20px;
    color: rgba(0, 0, 0, 0.543846);
  }

  .avatar {
    display: block;
    height: 134px;
    min-width: 136px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    background-color: #bbbbbb;
  }
</style>