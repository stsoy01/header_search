import {
    ChangeDetectionStrategy,
    Component, OnDestroy,
    OnInit
} from '@angular/core';
import {RouterLink} from '@angular/router';
import {
    BehaviorSubject,
    Observable
} from 'rxjs';
import {
    AsyncPipe,
    NgClass,
    NgIf,
    NgStyle,
    NgTemplateOutlet
} from '@angular/common';
import {ExpandInputComponent} from '../expand-input/expand-input.component';
import {ExpandInputService} from "../expand-input/expand-input.service";

interface HeaderNavigationItemInterface {
    linkName: string;
    iconUrl?: string
}

interface UserDataInterface {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    notification_count: number;
    is_block: boolean;
    avatar_url: string;
}

@Component({
    selector: 'app-header',
    imports: [
        RouterLink,
        AsyncPipe,
        NgTemplateOutlet,
        NgClass,
        NgStyle,
        ExpandInputComponent,
        NgIf,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

    public headerNavigationList$: Observable<HeaderNavigationItemInterface[]> = new Observable((subscriber) => {
        subscriber.next(
            [
                {linkName: 'Ссылки', iconUrl: '/assets/img/link.png'},
                {linkName: 'Контакты', iconUrl: '/assets/img/contacts.png'},
                {linkName: 'Теги', iconUrl: '/assets/img/tag.png'},
                {linkName: 'Избранное', iconUrl: '/assets/img/favorites.png'},
                {linkName: 'Посещения', iconUrl: '/assets/img/history.png'},
            ])
    })

    private userDataSubject = new BehaviorSubject<UserDataInterface>({
        id: 1,
        avatar_url: "/assets/img/avatar.png",
        email: "j_ren@gmail.com",
        first_name: "Jeremy",
        is_block: false,
        last_name: "Renner",
        notification_count: 11
    });
    public userData$: Observable<UserDataInterface> = this.userDataSubject.asObservable();

    private tagsSubject = new BehaviorSubject<string[]>(
        [
            'закрепить теги',
            'кнопка',
            'приложение',
            'форма',
            'тестовое поле',
            'выпадающий список',
        ]
    );
    public tags$: Observable<string[]> = this.tagsSubject.asObservable();

    constructor(public expandService: ExpandInputService) {

    }

    public isContentShowed: boolean = false;

    public ngOnInit(): void {
    }

    public ngOnDestroy(): void {
        this.tagsSubject.unsubscribe()
        this.userDataSubject.unsubscribe()
    }

    public changeService(): void {
        this.expandService.isExtended = true;
    }

    public addNewTag(event: any): void {
        if (!event?.target?.value) return

        if (event.keyCode === 13) {
            this.tagsSubject.next([...this.tagsSubject.value, event.target.value]);
        }
    }
}
