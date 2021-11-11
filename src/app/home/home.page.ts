import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { IonItemGroup } from '@ionic/angular';
import data from '../../data.json';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChildren(IonItemGroup, { read: ElementRef }) itemGroups: QueryList<any>;
  data = [];
  groupedData = [];
  pageTitle = 'Alpha Contacts';
  scroll = false;

  constructor() {
    const sorted = data.sort((a,b) => {
      if (a.last_name + a.first_name < b.last_name + b.first_name) { return -1; }
      if (a.last_name + a.first_name > b.last_name + b.first_name) { return 1; }
      return 0;
    });

    let last = null;
    sorted.forEach(({ first_name: firstName, last_name: lastName }) => {
      if (!last || !lastName.startsWith(last)) {
        last = lastName[0];
        this.groupedData.push({ key: last, users: [] });
      }
      this.groupedData[this.groupedData.length - 1].users.push({ firstName, lastName });
    });
  }

  scrollToLetter(letter) {
    this.itemGroups.toArray()
      .find(group => group.nativeElement.innerText.substring(0, 1) >= letter)
      .nativeElement.scrollIntoView();
  }

  scrolling(active) {
    this.scroll = active;
  }

}
