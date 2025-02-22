import {
    ChangeDetectionStrategy,
    Component,
    OnInit
} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Observable} from 'rxjs';
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
export class HeaderComponent implements OnInit {

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

    public userData$: Observable<UserDataInterface> = new Observable((subscriber) => {
        subscriber.next({
            id: 1,
            avatar_url: "/assets/img/avatar.png",
            email: "j_ren@gmail.com",
            first_name: "Jeremy",
            is_block: false,
            last_name: "Renner",
            notification_count: 11
        })
    })

    public tags$: Observable<string[]> = new Observable((subscriber) => {
        subscriber.next(
            ['закре пить теги', 'кнопка', 'приложение', 'форма', 'тестовое поле', 'выпадающий список',]
        )
    })

    constructor(public expandService: ExpandInputService) {
    }

    public isContentShowed: boolean = false;

    ngOnInit(): void {
    }

    public changeService(): void {
        this.expandService.asd = true;
    }

}
