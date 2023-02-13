import React from 'react';
//Owl Carousel Libraries and Module
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './Owl.css'
//Owl Carousel Settings
const options = {
  margin: 30,
  responsiveClass: true,
  nav: true,
  autoplay: false,
  smartSpeed: 1000,
  responsive: {
      0: {
          items: 1,
      },
      400: {
          items: 1,
      },
      600: {
          items: 2,
      },
      700: {
          items: 3,
      },
      1000: {
          items: 3,
      }
  },
};


function NewsCarousel(){
        return(
                <div>
  
<OwlCarousel className="slider-items owl-carousel owl-theme" navText={[
            '<span class="arrow prev">‹</span>',
            '<span class="arrow next">›</span>'
          ]} {...options}>
        <div class="post-slide">
          <div class="post-img">
            <img src="https://img.etimg.com/thumb/msid-97533365,width-300,height-225,imgsize-235558,,resizemode-75/warehousing.jpg" alt="" />
            <a href="https://economictimes.indiatimes.com/industry/services/property-/-cstruction/warehousing-and-logistic-sector-to-get-a-considerable-boost-from-budget/articleshow/97533306.cms" class="over-layer"><i class="fa fa-link"></i></a>
          </div>
          <div class="post-content">
            <h3 class="post-title">
              <a href="https://economictimes.indiatimes.com/industry/services/property-/-cstruction/warehousing-and-logistic-sector-to-get-a-considerable-boost-from-budget/articleshow/97533306.cms">Warehousing and logistic sector to get a considerable boost from Budget</a>
            </h3>
            <p class="post-description"> with the budget The Warehousing and logistic sector is expected to get a considerable boost from the government's proposal in the Union budget 2023-2024......</p>
            <span class="post-date"><i class="fa fa-clock-o"></i>Feb 01, 2023</span>
            <a href="https://economictimes.indiatimes.com/industry/services/property-/-cstruction/warehousing-and-logistic-sector-to-get-a-considerable-boost-from-budget/articleshow/97533306.cms" class="read-more">read more</a>
          </div>
        </div>
        
        <div class="post-slide">
          <div class="post-img">
            <img src="https://img.etimg.com/thumb/msid-97439310,width-300,height-225,imgsize-414292,,resizemode-75/istock-874165674.jpg" alt="" />
            <a href="https://economictimes.indiatimes.com/small-biz/sme-sector/budget-2023-focus-on-industrial-real-estate-warehousing-can-create-lakhs-of-jobs-by-2025/articleshow/97439208.cms" class="over-layer"><i class="fa fa-link"></i></a>
          </div>
          <div class="post-content">
            <h3 class="post-title">
              <a href="https://economictimes.indiatimes.com/small-biz/sme-sector/budget-2023-focus-on-industrial-real-estate-warehousing-can-create-lakhs-of-jobs-by-2025/articleshow/97439208.cms">Budget 2023: Focus on industrial real estate, warehousing can create lakhs of jobs by 2025</a>
            </h3>
            <p class="post-description"> The year 2022 was a recovery year for the industrial real estate and logistics sectors. It was an eventful year amid Covid-related apprehensions. All sectors went through significant ups and downs......</p>
            <span class="post-date"><i class="fa fa-clock-o"></i>Jan 30, 2023</span>
            <a href="https://economictimes.indiatimes.com/small-biz/sme-sector/budget-2023-focus-on-industrial-real-estate-warehousing-can-create-lakhs-of-jobs-by-2025/articleshow/97439208.cms" class="read-more">read more</a>
          </div>
        </div>

        <div class="post-slide">
          <div class="post-img">
            <img src="https://img.etimg.com/thumb/msid-97199068,width-300,height-225,imgsize-2426887,,resizemode-75/warehousing.jpg" alt="" />
            <a href="https://economictimes.indiatimes.com/industry/services/property-/-cstruction/industrial-and-warehousing-demand-strengthens-in-2022-up-by-8-colliers/articleshow/97199076.cms" class="over-layer"><i class="fa fa-link"></i></a>
          </div>
          <div class="post-content">
            <h3 class="post-title">
              <a href="https://economictimes.indiatimes.com/industry/services/property-/-cstruction/industrial-and-warehousing-demand-strengthens-in-2022-up-by-8-colliers/articleshow/97199076.cms">Industrial and warehousing demand strengthens in 2022; up by 8%: Colliers</a>
            </h3>
            <p class="post-description"> The year 2022 saw 24.5 million sq ft of industrial & warehousing demand, up 8% on a YoY basis across the top 5 cities in India. The average quarterly leasing during 2022 remained strong at......</p>
            <span class="post-date"><i class="fa fa-clock-o"></i>Jan 30, 2023</span>
            <a href="https://economictimes.indiatimes.com/industry/services/property-/-cstruction/industrial-and-warehousing-demand-strengthens-in-2022-up-by-8-colliers/articleshow/97199076.cms" class="read-more">read more</a>
          </div>
        </div>
                  </OwlCarousel>
</div>
        )
}



export default NewsCarousel;