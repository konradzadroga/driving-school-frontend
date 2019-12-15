import { Component, OnInit, NgZone } from '@angular/core';
import { CourseService, UserService } from '../app.service';
import { MatSnackBar } from '@angular/material';
import { CourseDTO } from '../model/course.model';
import { Router } from '@angular/router';

declare let paypal: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})


export class PaymentComponent implements OnInit {

  courseId: number;
  course: CourseDTO;

  constructor(private courseService: CourseService, private userService: UserService, private router: Router, private ngZone: NgZone) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    let courseService = this.courseService;
    let userService = this.userService;
    let router = this.router;
    let ngZone = this.ngZone;
    let courseId: number;
    let cost: number;
    courseService.currentCourseId.subscribe(id => courseId = id);
    courseService.getCourseById(courseId).subscribe(course => cost = course.cost);

    this.loadExternalScript("https://www.paypalobjects.com/api/checkout.js").then(() => {
      paypal.Button.render({
        env: 'sandbox',
        client: {
          sandbox: 'AWQKCpvE1bIOMJC0zMvw3INKuUszkJ3ltk0GDK7CkkmhnnhxkZk4tVAdeI_7bFiFUAsNTMMZYV-w8UaG'
        },
        commit: true,
        payment: function (data, actions) {
          return actions.payment.create({
            payment: {
              transactions: [
                {
                  amount: { total: cost, currency: 'PLN' }
                }
              ]
            }
          })
        },
        onAuthorize: function(data, actions) {
          return actions.payment.execute().then(function(payment) {
            userService.addCourseToUser(courseId).subscribe();
            ngZone.run(() => router.navigate(['/payment-completed'])).then()
          })
        }
      }, '#paypal-button');
    });
  }

  private loadExternalScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script')
      scriptElement.src = scriptUrl
      scriptElement.onload = resolve
      document.body.appendChild(scriptElement)
  })}
  }


