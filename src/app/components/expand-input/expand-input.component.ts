import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Output,
  QueryList,
  Renderer2,
  ViewChildren,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-expand-input',
  templateUrl: './expand-input.component.html',
  styleUrls: ['./expand-input.component.scss'],
  standalone: true,
  imports: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ExpandInputComponent {

  @Output() public isNgContentDisplayed = new EventEmitter<boolean>();

  constructor(
    private el: ElementRef,
    private renderer: Renderer2) {
  }

  @ViewChildren('div') private expandContainer!: QueryList<ElementRef>;

  @HostListener('click', ['$event']) private onElementClick(): void {
    const [, expandElement] = this.expandContainer.toArray();
    const isInside = !!this.el.nativeElement.contains(event?.target);

    console.log();
    
    this.isNgContentDisplayed.emit(isInside)
    this.renderer.setStyle(expandElement.nativeElement, 'width', isInside ? '500px' : '0px')
  }
}
