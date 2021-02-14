import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import logo from './logo.svg';
import {FormattedMessage} from "react-intl";
import './App.css';  

import { I18nPropvider, LOCALES } from './i18nProvider';
import translate from "./i18nProvider/translate";
import Input from './input';

export default function App() {


  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/topics">
            <Topics />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  const [currentTime, setCurrentTime] = useState(0);
  const [locale, setLocale] = useState(LOCALES.ENGLISH);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);
  
  return (<div>
    <div data-collapse="medium" data-animation="over-right" data-duration="400" role="banner" className="topnav w-nav">
    <div className="navcontainer">
        <a href="#" className="navbutton hide w-inline-block">
            <img
                src="https://uploads-ssl.webflow.com/5f8dfd84d751ba4b176eac9e/5f946b1beefd7d8cec92de49_backarrow.png"
                loading="lazy" width="42" alt=""/>
            </a>
        <a href="/" aria-current="page" className="w-inline-block w--current">
            <img
                src="https://uploads-ssl.webflow.com/5f8dfd84d751ba4b176eac9e/5f8dfe9670ebe498ee6de57a_klem.png"
                loading="lazy" width="113" alt="" className="logo"/>
        </a>
        <nav role="navigation" className="nav-menu w-nav-menu">
            <div className="div-block-5">
                <div className="text-block-83">Welcome</div><img
                    src="https://uploads-ssl.webflow.com/5f8dfd84d751ba4b176eac9e/5f8dfe9670ebe44ba96de57c_workspace.jpg"
                    loading="lazy" width="64" height="64" alt="" className="navlinkimage"/>
            </div><a href="#" className="navlink w-nav-link">Home</a><a href="#" className="navlink w-nav-link">Discover</a><a
                href="#" className="navlink w-nav-link">About Us</a><a href="#" className="navmainlink w-button">LOGIN</a>
        </nav>
    </div>
    <div className="w-nav-overlay" data-wf-ignore="" id="w-nav-overlay-0"></div>
</div>
<div className="margint60 blue bigpadding">
    <div className="_10container">
        <div className="heading-grid">
            <div className="still">
                <h1 className="homepagetitle">Bring the World to Your class room</h1>
                <div className="text-block-110"><strong className="home-page-subtitle">Your gateway to the very best in Project
                        Based Learning. Find a growing set of resources here to empower your classrooms</strong></div>
                <form action="/search" className="search w-form"><input type="search" className="search-input w-input"
                        autofocus="true" maxlength="256" name="query" placeholder="Search Projects…" id="search"
                        required=""/><input type="submit" value="Search" className="search-button w-button"/></form>
            </div>
            <div id="w-node-e4328cdc-b9a1-a18f-6f54-d4b8f7f80cc4-0ebb9283" className="heading-image-container">
                <div className="heading-image-wrapper"><img
                        src="https://uploads-ssl.webflow.com/5f8dfd84d751ba4b176eac9e/5f98576546308bba28502fd3_5f685a109fe5f00d69089413_IMG20200726145519-01.jpeg"
                        loading="lazy" alt="" className="heading-image"/><img
                        src="https://uploads-ssl.webflow.com/5f8dfd84d751ba4b176eac9e/5f9876287421765bfaa5cd3a_IMG_20200726_143807-01-min.jpeg"
                        loading="lazy" alt="" className="heading-image-2"/></div>
            </div>
        </div>
    </div>
</div>

<I18nPropvider locale={locale}  >
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>
            <FormattedMessage id="hello" />
          </h1>
          <h2>
            Not translated part. {translate('hello')}
          </h2>
          <p>
            {translate('edit-file', {file: <code>src/App.js</code>})}
            <hr/>
            Edit <code>src/App.js</code> and save to reload.
          </p>


          <div className='THIS sample does not work'>
            <input type="text" placeholder={translate('demo-placeholder')} />
            <input type="text" placeholder={<FormattedMessage id="demo-placeholder" />} />
          </div>

          <Input />
          <FormattedMessage id="demo-placeholder" defaultMessage="search">
            {placeholder=>
                <input placeholder={placeholder}/>
            }
          </FormattedMessage>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>

          <hr/>

          <button onClick={() => setLocale(LOCALES.ENGLISH)}>English</button>
          <button onClick={() => setLocale(LOCALES.FRENCH)}>French</button>
          <button onClick={() => setLocale(LOCALES.GERMAN)}>German</button>
        </header>
      </div>
    </I18nPropvider>
</div>);
}

function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}

