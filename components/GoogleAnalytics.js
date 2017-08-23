import React, { Component } from 'react';
import siteConfig from '../site.config';

const googleAnalyticsScript = /* @html */`
  <script>
    var isProduction = window.location.hostname === '${siteConfig.domain}';
    if (isProduction) {
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-47489067-2', 'auto');
      ga('send', 'pageview');
    } else {
      window.ga = function gaDev() {
        console.log([...arguments]);
      };
    }
  </script>
`;

export class GoogleAnalytics extends Component {
  render() {
    return (
      <div
        className='GoogleAnalytics'
        dangerouslySetInnerHTML={{ __html: googleAnalyticsScript }}
      />
    );
  }
}
