import {Component, Input, OnInit} from '@angular/core';
import {DataProvider} from '../../services/data-provider.service';
import {Router} from '@angular/router';
import {Author} from '../../model/author';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'library-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.less']
})
export class AuthorFormComponent implements OnInit {

  form: FormGroup;
  @Input() author?: Author = new Author();

  constructor(private dataProviderService: DataProvider, private router: Router) {
  }

  public ngOnInit(): void {
      this.form = new FormGroup({
      title: new FormControl(this.author.firstName, [Validators.minLength(2)]),
      genre: new FormControl(this.author.lastName, [Validators.required]),
      author: new FormControl(this.author.dateOfBirth, [Validators.minLength(4)]),
    });
  }

  public submit(): void {
    this.dataProviderService.addAuthor(this.author).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}
