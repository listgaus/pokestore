import {Component, OnInit} from '@angular/core';
import {LoggerService} from './services/logger.service';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pokeshop by shiran';


  constructor(
    private logger: LoggerService,
    private auth: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.logger.debug('init AppComponent');
    this.bootstrap();
  }

  private bootstrap() {
    this.auth.init();
  }
}
