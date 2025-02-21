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
    ViewChild,
    Input,
    OnDestroy,
} from '@angular/core';
import {ExpandInputService} from "./expand-input.service";

@Component({
    selector: 'app-expand-input',
    templateUrl: './expand-input.component.html',
    styleUrls: ['./expand-input.component.scss'],
    standalone: true,
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ExpandInputComponent implements OnDestroy {

    @Input() public asd = false;
    @Output() public isNgContentDisplayed = new EventEmitter<boolean>();

    private isInside = false;
    private clearId!: unknown;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private expandService: ExpandInputService) {
    }

    @ViewChild('addBtn') private addBtn!: ElementRef<HTMLButtonElement>

    @ViewChildren('div') private expandContainer!: QueryList<ElementRef>;

    @HostListener('document:click', ['$event.target']) private onElementClick(): void {
        const [, expandElement] = this.expandContainer.toArray();
        this.isInside = !!this.el.nativeElement.contains(event?.target);

        if ((event?.target as HTMLElement).id === 'addBtn') return;

        if (this.isInside) {
            this.isNgContentDisplayed.emit(this.isInside)
            this.renderer.setStyle(expandElement.nativeElement, 'width', '704px')
            this.renderer.setStyle(expandElement.nativeElement, 'height', this.expandService.asd ? '250px' : '48px')
        } else {
            this.expandService.asd = false;
            this.renderer.setStyle(expandElement.nativeElement, 'height', this.expandService.asd ? '250px' : '48px')
            this.clearId = setTimeout(() => {
                this.renderer.setStyle(expandElement.nativeElement, 'width', '0')
            }, 175)
        }
    }

    public ngOnDestroy(): void {
        clearTimeout(this.clearId as number)
    }
}
