import React, { Component } from 'react';

export class GoogleAds extends Component {
  componentDidMount() {
    // if (process.env.NODE_ENV === 'development') {
    //   return;
    // }
    //
    // this.ads.innerHTML = /* @html */`
    //   <script async src='//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'></script>
    // `;
    //
    // (window.adsbygoogle = window.adsbygoogle || []).push({
    //   google_ad_client: 'ca-pub-0240331342800724',
    //   enable_page_level_ads: true
    // });
  }

  render() {
    return (
      <div ref={c => this.ads = c} />
    );
  }
}
