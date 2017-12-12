import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
import { Search } from './genomes.actions';
import * as fromGenomes from './genomes.selectors';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mist-genomes',
  styleUrls: [],
  templateUrl: './genomes.pug',
})
export class GenomesComponent implements OnInit {
  query$: Observable<string>;
  isFetching$: Observable<boolean>;
  errorMessage$: Observable<string>;
  genomes$: Observable<any[]>;
  firstPage$: Observable<string>;
  lastPage$: Observable<string>;
  prevPage$: Observable<string>;
  nextPage$:Observable<string>;

  perPage = 30;
  dataSource = new GenomeDataSource(this.store);
  columns = ['Genome', 'Superkingdom', 'Taxonomy', 'Genbank Version', 'Assembly level'];
  displayedColumns: String[];
  
  constructor(
    private store: Store<any>,
  ) {}

  ngOnInit() {
    this.query$ = this.store.select(fromGenomes.getSearchQuery);
    this.isFetching$ = this.store.select(fromGenomes.getSearchIsFetching);
    this.errorMessage$ = this.store.select(fromGenomes.getSearchErrorMessage);
    this.genomes$ = this.store.select(fromGenomes.getSearchResults);
    this.genomes$.subscribe(results => results.length > 0 ? this.displayedColumns = this.columns : this.displayedColumns = null);
    this.firstPage$ = this.store.select(fromGenomes.pageUrl('first'));
    this.lastPage$ = this.store.select(fromGenomes.pageUrl('last'));
    this.prevPage$ = this.store.select(fromGenomes.pageUrl('prev'));
    this.nextPage$ = this.store.select(fromGenomes.pageUrl('next'));
  }

  search(query: string) {
    this.store.dispatch(new Search({search: query, pageNumber:1, perPage:  }));   
  }
}

export class GenomeDataSource extends DataSource<any> {
  constructor(private store: Store<any>) {
    super();
  }
  connect(): Observable<any[]> {
    return this.store.select(fromGenomes.getSearchResults);
  }
  disconnect() {}
}
