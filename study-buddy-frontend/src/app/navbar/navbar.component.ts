import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  open: boolean;
  openCloseBurgerUsed: boolean;

  // @HostListener('click')
  // clickIn() {
  //   if (!this.openCloseBurgerUsed) {
  //     this.open = true;
  //     console.log("clickIn open=" + this.open);
  //     this.clickInUsed = true;
  //   }
  // }

  @HostListener('document:click')
  clickOut() {
    if (this.openCloseBurgerUsed) {
      this.openCloseBurgerUsed = false;
    } else {
      this.open = false;
      // console.log("clickOut open=" + this.open);
    }
  }

  constructor() {
    this.open = false;
    this.openCloseBurgerUsed = false;
  }

  ngOnInit(): void {
  }

  openCloseBurger() {
    this.open = !this.open;
    // console.log("openCloseBurger open=" + this.open);
    this.openCloseBurgerUsed = true;
  }

}
