import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Observable} from 'rxjs';
import {AsyncPipe, NgClass, NgIf, NgStyle, NgTemplateOutlet} from '@angular/common';
import {ExpandInputComponent} from '../expand-input/expand-input.component';

interface headerNavigationItemInterface {
  linkName: string;
  iconUrl?: string
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

  public headerNavigationList$: Observable<headerNavigationItemInterface[]> = new Observable((subscriber) => {
    subscriber.next(
      [
        {linkName: 'Ссылки', iconUrl: '/assets/img/link.png'},
        {linkName: 'Контакты', iconUrl: '/assets/img/contacts.png'},
        {linkName: 'Теги', iconUrl: '/assets/img/tag.png'},
        {linkName: 'Избранное', iconUrl: '/assets/img/favorites.png'},
        {linkName: 'Посещения', iconUrl: '/assets/img/history.png'},
      ])
  })

  public isContentShowed: boolean = false;

  ngOnInit(): void {
  }

}
