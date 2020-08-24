import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent implements OnInit {

  authMsg = '';
  newsForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {

  }

}
