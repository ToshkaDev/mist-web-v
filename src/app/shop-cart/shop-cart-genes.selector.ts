import { createSelector } from '@ngrx/store';
import { State } from '../app.reducers';

export const selectGenomes = (state: State) =>
  state.genes_shopcart;

export const search = createSelector(
  selectGenomes,
  (state) => state.search,
);

export const getSearchQuery = createSelector(
  search,
  (searchState) => searchState.query,
);

export const getSearchIsFetching = createSelector(
  search,
  (searchState) => searchState.isFetching,
);

export const getSearchErrorMessage = createSelector(
  search,
  (searchState) => searchState.errorMessage,
);

export const getSearchResults = createSelector(
  search,
  (searchState) => searchState.matches,
);

export const getPageInfo = createSelector(
  search,
  (searchState) => { 
    return {
      count: searchState.count,  
      totalPages: searchState.totalPages, 
      currentPage: searchState.currentPage,
      perPage: searchState.perPage
    }
  }
);

export const getPageLinks = createSelector(
  search,
  (searchState) => searchState.links,
);