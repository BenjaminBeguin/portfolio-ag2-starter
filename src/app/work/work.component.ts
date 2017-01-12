import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WorksService } from '../works/works.service';


@Component({
  selector: 'one-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  providers: [WorksService]
})

export class WorkComponent implements OnInit {
	title = "title";
	works;
	work: any;
	@Input() slug: string;


	private sub: any;   
	private mode: string;
	index;

	constructor(private _worksService: WorksService, public route: ActivatedRoute, public router: Router) {

		_worksService.getWork().subscribe(
	        works => this.works = works,
	        error => console.error('Error: ' + error),
	        () => { 
	        	if(this.slug) {
	        		this.get_project_by_slug(this.slug);
	        	} else {
	        		this.get_slug();
	        	}
	        }
      );
	}

	arrayObjectIndexOf(myArray, searchTerm, property) {
		if(myArray) {
		    for(var i = 0, len = myArray.length; i < len; i++) {
		        if (myArray[i][property] === searchTerm) return i;
		    }
		    return -1;
		}
	}
	

	get_slug(){
		 this.sub = this.route
		    .params
			.subscribe(params => {
				this.mode = params['slug'];
			 	this.get_project_by_slug(this.mode)
			});
	}

	get_project_by_slug(slug){
		this.index = this.arrayObjectIndexOf(this.works, slug, "slug")
		if(this.index >= 0) {
			this.work = this.works[this.index];
		} else {
			this.router.navigateByUrl('/');
		}
	}

  ngOnInit() {

  }

}
