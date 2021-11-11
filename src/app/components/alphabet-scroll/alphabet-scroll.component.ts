import { Component, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { GestureController } from '@ionic/angular';

@Component({
  selector: 'app-alphabet-scroll',
  templateUrl: './alphabet-scroll.component.html',
  styleUrls: ['./alphabet-scroll.component.scss'],
})
export class AlphabetScrollComponent implements AfterViewInit {
  @Output() letterSelected = new EventEmitter<string>();
  @Output() scrollingLetter = new EventEmitter<boolean>();
  @ViewChild('bar') sidebar: ElementRef;
  letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  last = null;

  constructor(private gestureCtrl: GestureController) { }

  ngAfterViewInit() {
    const moveGesture = this.gestureCtrl.create({
      el: this.sidebar.nativeElement,
      direction: 'y',
      threshold: 0,
      gestureName: 'move',
      onStart: () => {
        this.scrollingLetter.emit(true);
      },
      onMove: ev => {
        const closestElem: any = document.elementFromPoint(ev.currentX, ev.currentY);
        if (closestElem && ['LI', 'A'].includes(closestElem.tagName)) {
          const letter = closestElem.innerText;
          if (letter) {
            if (letter !== this.last) {
              Haptics.impact({ style: ImpactStyle.Light });
            }
            this.goToLetter(letter);
          }
        }
      },
      onEnd: () => {
        this.scrollingLetter.emit(false);
      }
    });
    moveGesture.enable();
  }

  goToLetter(letter: string) {
    if (letter !== this.last) {
      this.last = letter;
      this.letterSelected.emit(letter);
    }
  }

}
