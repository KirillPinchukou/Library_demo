// import {Book} from "../../model/book";
// import {Client} from "../../model/client";
//
// @Component({
//   selector: 'library-registration',
//   templateUrl: './registration.component.html',
//   styleUrls: ['./registration.component.less']
// })
// export class RegistrationComponent implements OnInit {
//   form: FormGroup;
//
//
//   @Input() client?: Client = new Client();
//   @Output() addedClient = new EventEmitter<Client>();
//
//   constructor() { }
//
//   ngOnInit(): void {
//     this.form = new FormGroup({
//       name: new FormControl('', [Validators.minLength(2)]),
//       mail: new FormControl('', [Validators.required]),
//     });
//   }
//
//   submit() {
//     this.addedClient.emit(this.client);
//   }
// }
//
