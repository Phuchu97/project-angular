import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-category-slide',
  templateUrl: './category-slide.component.html',
  styleUrls: ['./category-slide.component.css']
})
export class CategorySlideComponent implements OnInit {
  configCategorySlide:SwiperOptions = {
    slidesPerView:1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30
  };
  constructor() { }

  ngOnInit(): void {

  }

}
