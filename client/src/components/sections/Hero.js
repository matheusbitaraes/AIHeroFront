import React,  {useState, useEffect } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Image from '../elements/Image';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  // create an event listener
  useEffect(() => {
    //choose the screen size 
    const handleResize = () => {
      if (window.innerWidth < 640) { //640px is the css 'medium' value
          setIsMobile(true)
      } else {
          setIsMobile(false)
      }
    }
    window.addEventListener("resize", handleResize)
  })

  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const evidencesTag = isMobile ? 'Evidences (desktop only)' : 'Evidences'

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
              Welcome to AI Hero
            </h1>
            <div className="container-xs">
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                An Artificial Intelligence built for generating musical melodies
                </p>
              <div className="reveal-from-bottom" data-reveal-delay="600">
                <ButtonGroup>
                  <Button tag="a" color="primary" wideMobile href="/demo" disabled={false}>
                    Live Demo
                    </Button>
                  <Button tag="a" color="dark" wideMobile href="https://github.com/matheusbitaraes/AIHero" target='_blank'>
                    View on Github
                    </Button>
                  <Button tag="a" color="light" wideMobile href="/evidences" disabled={isMobile}>
                    {evidencesTag}
                    </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
          <div className="hero-figure reveal-from-bottom illustration-element-01" data-reveal-value="20px" data-reveal-delay="800">
            <Image 
            className="animated-gif" 
            src={require('../../assets/images/gan_training.gif')}
            alt="Training of Neural Model"
            width={896*0.7}
            height={504*0.7}
            ></Image>
            {/* <a
              data-video="https://player.vimeo.com/video/174002812"
              href="#0"
              aria-controls="video-modal"
              onClick={openModal}
            >
              <Image
                className="has-shadow"
                src={require('./../../assets/images/video-placeholder.jpg')}
                alt="Hero"
                width={896}
                height={504} />
            </a> */}
          </div>
          {/* <Modal
            id="video-modal"
            show={videoModalActive}
            handleClose={closeModal}
            video="https://player.vimeo.com/video/174002812"
            videoTag="iframe" /> */}
            <br/>

            <div className="container-sm reveal-from-bottom">
            <p align="justify">The AI Hero project proposes a blues melody generator, that tries to emulate the improvisation process of the human mind. Here is the high level architecture of the project:</p>
              <Image 
              className="architecture" 
              src={require('../../assets/images/architecture.png')}
              alt="Architecture of the model"
              ></Image>
              <br/>
            </div>
            <div className="container-sm reveal-from-bottom">
            <p align="justify">This work proposes an architecture composed
                of a genetic algorithm whose initial population is fed by generative adversarial networks
                (GANs) specialized in generating melodies for certain harmonic functions. The fitness
                function of the genetic algorithm is a weighted sum of heuristic methods for evaluating
                quality, where the weights of each function are assigned by the user, before requesting
                the melody. A data augmentation statregy for the GAN training data was proposed and
                experimentally validated. This experiment and two others are available in the <a href='https://www.ppgee.ufmg.br/defesas/2006M.PDF' target='_blank' rel="noreferrer">masters thesis (in portuguese)</a> generated by this work.

                Also, <a href='https://www.sba.org.br/cba2022/wp-content/uploads/artigos_cba2022/paper_1817.pdf' target='_blank' rel="noreferrer">this article</a>, validating a data augmentation strategy proposal, was published as a consequence of the work.
            </p>
            </div>
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;