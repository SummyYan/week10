import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movieAng';
  toggleTitle="Actors";
  isActor: boolean = true;
  changeState() {
    if (!this.isActor) {
      this.toggleTitle = "Actors";
    } else {
      this.toggleTitle = "Movies";
    }
    this.isActor = !this.isActor;
  }
}
