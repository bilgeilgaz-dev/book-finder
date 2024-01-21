<template>
  <div
    id="search-bar"
    :class="[
      'search-bar',
      {'landing-search-bar': isLandingPage},
      {'results-search-bar': !isLandingPage}
    ]"
  >
    <v-row class="mx-3 pb-2">
      <v-col cols="2" class="text-center" v-if="!isLandingPage">
        <v-img
          src="@/assets/Penguin_Random_House.png"
          width="100"
        />
      </v-col>
      <v-col
        :md="isLandingPage ? 12 : 8"
        :sm="isLandingPage ? 12 : 10"
      >
        <v-row class="toolbar-container">
          <v-col
            :sm="isLandingPage ? 12 : 9"
          >
            <v-toolbar
              dense
              class="search-bar-toolbar"
            >
              <v-text-field
                hide-details
                single-line
                :clearable="!isLandingPage"
                v-model="searchKey"
                :placeholder="$t('search.placeholder')"
                class="mr-2"
                @keydown.enter.prevent="search"
              />
              <v-btn
                icon
                @click="search"
                :class="[
                  isLandingPage ? 'landing-search-btn' : 'mr-2',
                  {'search-btn-disabled': !searchKey}
                ]"
                type="submit"
                :disabled="!searchKey"
              >
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-toolbar>
          </v-col>
          <v-col
            :sm="isLandingPage ? 12 : 3"
            xs="12"
          >
            <v-row class="align-end select-search-text">
              <v-col
                v-if="isLandingPage"
                md="4"
                sm="5"
                xs="2"
                class="text-align"
              >
                <span>{{ $t('search.searchBy') }}</span>
              </v-col>
              <v-col
                :md="isLandingPage ? 4 : 12"
                :sm="isLandingPage ? 6 : 12"
                xs="12"
              >
                <v-select
                  hide-details
                  dense
                  :items="SEARCH_TYPES"
                  v-model="searchType"
                  :menu-props="{ bottom: true, offsetY: true }"
                >
                <template v-slot:selection="{ item }">
                  <span v-html="getSearchTypeText(item)"></span>
                </template>
                <template v-slot:item="{ item }">
                  <span v-html="getSearchTypeText(item)"></span>
                </template>
                </v-select>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import { SEARCH_TYPES_ENUM } from '../../utils/constants';

const SEARCH_TYPES = [
  SEARCH_TYPES_ENUM.SMART,
  SEARCH_TYPES_ENUM.TITLE,
  SEARCH_TYPES_ENUM.AUTHOR,
  SEARCH_TYPES_ENUM.ISBN,
];

export default {
  name: 'SearchBar',

  props: {
    state: {
      type: String,
      required: false,
      default: 'Results',
    },
  },

  data: () => ({
    searchKey: '',
    searchType: SEARCH_TYPES_ENUM.SMART,
  }),

  computed: {
    isLandingPage() {
      return this.state === 'Landing';
    },
  },

  methods: {
    search() {
      if (this.searchType === SEARCH_TYPES_ENUM.ISBN) {
        this.searchKey = this.searchKey.replace(/-/g, '');
      }
      this.$store.commit('setSearchKey', this.searchKey);
      this.$store.commit('setSearchType', this.searchType);
      this.$emit('startSearching', { searchKey: this.searchKey, searchType: this.searchType });
    },

    getSearchTypeText(item) {
      return (this.isLandingPage && item === 'SMART') ? this.$t('search.types.LandingSmart') : this.$t(`search.types.${item}`);
    },
  },

  created() {
    this.SEARCH_TYPES = SEARCH_TYPES;
    const searchKeyFromStore = this.$store.getters.getSearchKey;
    if (searchKeyFromStore) {
      this.searchKey = searchKeyFromStore;
    }
    const searchTypeFromStore = this.$store.getters.getSearchType;
    if (searchTypeFromStore) {
      this.searchType = searchTypeFromStore;
    }
  },
};
</script>
<style scoped lang="scss">
.search-btn-disabled {
  cursor: not-allowed !important;
  opacity: 0.8;
}

.landing-search-bar .theme--light.v-btn.v-btn--disabled .v-icon {
  color: white !important;
  opacity: 0.8;
}

.text-align {
  text-align: end;
}

.search-bar-toolbar {
  border-radius: 5px;
}
.landing-search-bar {
  display: flex;
  flex-direction: column;
  align-items: center;

  .select-search-text {
    color: #757575;
    width: 100%;
    justify-content: center;
  }

  ::v-deep .v-toolbar__content {
    padding: 0 12px;
  }

  .landing-search-btn {
    background-color: #FF6602;
    color: white;
    border-radius: 0 5px 5px 0;
  }
}

.results-search-bar {
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2);

  .toolbar-container {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;

    .search-bar-toolbar {
      background-color: #f4f4f4;
      border-radius: 5px;
      ::v-deep .v-toolbar__content {
        display: flex;
        flex-direction: row-reverse;
        padding-left: 0;
      }
    }

  }
}

::v-deep .v-text-field > .v-input__control > .v-input__slot:before {
  border-style: none;
}

</style>
<style scoped lang="scss">
.v-list-item__title {
  color: #071F3F !important;
}

@media screen and (max-width: 600px) {
  .text-align {
    text-align: center;
  }

  .align-end {
    align-items: center !important;
  }

  .toolbar-container {
    flex-direction: column !important;
  }
}

@media screen and (min-width: 601px) and (max-width: 950px) {
  .toolbar-container {
    align-items: flex-start !important;
  }
}
</style>
