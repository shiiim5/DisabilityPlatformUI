import { Component, AfterViewInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-patienthome',
  standalone: true,
  templateUrl: './patienthome.component.html',
  styleUrls: ['./patienthome.component.css'],
  imports: [FooterComponent, RouterModule],
  encapsulation: ViewEncapsulation.None, 
})

export class PatienthomeComponent implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const sections = this.el.nativeElement.querySelectorAll('section');

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
          entry.target.classList.remove('section-hidden');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    sections.forEach((section: Element) => {
      section.classList.add('section-hidden');
      observer.observe(section);
    });
  }
}
