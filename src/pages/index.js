import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEye, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import HomePageFeatures from '@site/src/components/HomePage/HomePageFeatures';
import { getGithubStars, getLatestTag } from '@site/src/utilities/githubHelper';
import styles from './index.module.scss';
import WhatIsCipp from './_what-is-cipp.md';
import UnderTheHood from './_under-the-hood.md';
import WhyDoesCippExist from './_why-does-cipp-exist.md';
import GotQuestions from './_got-questions.md';
import IndexContent from './_index.md';

function HomePageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const [cippVersion, setCippVersion] = useState(null);
  const [cippApiVersion, setCippApiVersion] = useState(null);
  const [githubStars, setGithubStars] = useState(null);

  useEffect(() => {
    const getGithubData = async () => {
      setCippVersion(await getLatestTag('KelvinTegelaar', 'CIPP'));
      setCippApiVersion(await getLatestTag('KelvinTegelaar', 'CIPP-API'));
      setGithubStars(await getGithubStars('KelvinTegelaar', 'CIPP'));
    };

    getGithubData();
  }, []);

  return (
    <header className={clsx('hero hero--homepage', styles.hero)}>
      <div className={styles.heroInner}>
        <div className={clsx(styles.heroSubtitle)}>
          <span><strong>Free</strong> and <strong>open-source</strong> multi-tenant management for <strong>Microsoft 365</strong></span><br/>
          <span className={clsx('homepage--github--buttons', styles.heroButtons)}>
            {cippVersion && (
              <>
                {!!cippVersion && (
                  <a
                    href="https://github.com/KelvinTegelaar/CIPP/releases/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="button button--primary button--lg cipp--gh--button"
                  >
                    <FontAwesomeIcon icon={faGithub} fixedWidth />
                    <span class="margin-horiz--xs">CIPP</span>
                    {cippVersion.startsWith('v')
                      ? cippVersion
                      : `v${cippVersion}`}
                  </a>
                )}
                {!!githubStars && (
                  <a
                    href="https://github.com/KelvinTegelaar/CIPP/stargazers"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={clsx('button button--lg', styles.speechButton)}
                  >
                    <FontAwesomeIcon icon={faStar} fixedWidth />
                    {githubStars}
                  </a>
                )}
                {!!cippApiVersion && (
                  <a
                    href="https://github.com/KelvinTegelaar/CIPP-API/releases/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="button button--primary button--outline button--lg cipp-api--gh--button"
                  >
                    <FontAwesomeIcon icon={faGithub} fixedWidth />
                    <span class="margin-horiz--xs">CIPP-API</span>
                    {cippApiVersion.startsWith('v')
                      ? cippApiVersion
                      : `v${cippApiVersion}`}
                  </a>
                )}
                
              </>
            )}
          </span>
        </div>
        <div className={clsx(styles.buttons)}>
          <Link
            className="button button--primary button--lg cipp-get-started--button"
            to="/docs/user/gettingstarted/"
          >
            <span className="margin-right--xs">Get Started</span>
            <FontAwesomeIcon icon={faPlay} fixedWidth />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="Free and open-source multi-tenant management for Microsoft 365"
    >
      <HomePageHeader />
      <main className="cipp-home">
        <HomePageFeatures />
        <div className="width--full text--center margin-vert--lg">
          <Link className="button button--outline button--primary button--lg" to="https://github.com/sponsors/KelvinTegelaar">
            Sponsor on GitHub
          </Link>
        </div>
        <div className="width--full what-is-cipp padding-vert--md">
          <div className="container">
            <h2><span className="cipp-home--title">What Is CIPP?</span></h2>
            <WhatIsCipp />
          </div>
        </div>
        <div className="width--full under-the-hood padding-vert--lg">
          <div className="container">
          <h2><span className="cipp-home--title">Under The Hood</span></h2>
            <UnderTheHood />
          </div>
          <div className="container text--center margin-vert--md">
            <Link className="button button--primary button--lg" to="/docs/dev">
              Want to help? Check out the Developer Guide
            </Link>
          </div>
        </div>
        <div className="width--full why-does-cipp-exist padding-vert--lg">
          <div className="container">
          <h2><span className="cipp-home--title">Why Does CIPP Exist?</span></h2>
            <WhyDoesCippExist />
          </div>
          <div className="container text--center margin-vert--md">
            <Link className="button button--primary button--lg" to="https://cyberdrain.com">
              See more of Kelvin's work at CyberDrain.com
            </Link>
          </div>
        </div>
        <div className="width--full got-questions padding-vert--lg">
          <div className="container">
          <h2><span className="cipp-home--title">Got Questions?</span></h2>
            <GotQuestions />
          </div>
        </div>
      </main>
    </Layout>
  );
}
