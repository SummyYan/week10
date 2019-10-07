import { Component, OnInit } from '@angular/core';
import { ActorComponent } from "../actor/actor.component";
import { DatabaseService } from "../database.service";
@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.css']
})
export class IntegrationComponent implements OnInit {

  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
   this.dbService.getActors(); 
  }

}
