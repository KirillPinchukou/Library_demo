import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AuthorFormComponent} from './author-form.component';
import {DataProvider} from '../../services/data-provider.service';
import {HttpDataProvider} from '../../services/httpServices/http-data-provider-service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

describe('AuthorFormComponent', () => {
  let component: AuthorFormComponent;
  let fixture: ComponentFixture<AuthorFormComponent>;
  let httpClient: HttpClient;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorFormComponent ],
      providers: [{provide: DataProvider, useValue: new HttpDataProvider(httpClient)},{provide: Router, useValue: router}],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
