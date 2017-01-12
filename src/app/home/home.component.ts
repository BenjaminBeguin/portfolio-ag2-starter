import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { WorksService } from '../works/works.service';


@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [WorksService]
})
export class HomeComponent implements OnInit {
	title = "title";
	works;
	work;

	private sub: any;
	private mode: string;
	index;
	slug = "p1"

	constructor(private _worksService: WorksService, private location: Location, public route: ActivatedRoute) {

		_worksService.getWork().subscribe(
	        works => this.works = works,
	        error => console.error('Error: ' + error),
	        () => {
	        	console.log(this.works)
	        	this.get_slug();
	        }
      );;
	}

	get_slug(){
		 this.sub = this.route
		    .params
			.subscribe(params => {
				this.mode = params['slug'];
				if(this.mode) {
			 		this.get_project_by_slug(this.mode)
			 		console.log(this.mode);
				}
			});
	}

	get_project_by_slug(slug){
		this.index = this.arrayObjectIndexOf(this.works, slug, "slug");
		if(this.index >= 0) {
			this.setwork(this.works[this.index]);
		}
	}

	setwork(data){
		this.slug= null;

		setTimeout(() => {
		  this.slug = data.slug;
			this.location.replaceState("/" + this.slug);
		}, 200);
	}

	arrayObjectIndexOf(myArray, searchTerm, property) {
		console.log(myArray);
		if(myArray) {
		    for(var i = 0, len = myArray.length; i < len; i++) {
		        if (myArray[i][property] === searchTerm) return i;
		    }
		    return -1;
		}
	}

  ngOnInit() {
    console.log('Hello Home');

  }

}
