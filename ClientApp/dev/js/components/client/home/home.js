import React, { Component } from 'react'
import { Carousel } from 'react-bootstrap'

export class Home extends Component {

    render() {
        return (
            <div className="carousel-wrapper">
                <Carousel>
                    <Carousel.Item>
                        <img width={1024} height={768} alt="900x500" src="/images/home_1.jpg" />
                        <Carousel.Caption>
                            <h3>Check out the news</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={1024} height={768} alt="900x500" src="/images/home_2.jpg" />
                        <Carousel.Caption>
                            <h3>Sales up to -60 %</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={1024} height={768} alt="900x500" src="/images/home_3.jpg" />
                        <Carousel.Caption>
                            <h3>Best brands in lower prices</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        )
    }
}
