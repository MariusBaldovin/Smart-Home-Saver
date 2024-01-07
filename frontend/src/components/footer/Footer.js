import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="smart-home__footer">
      <div className="smart__home">
        <p className="smart-home__share">
          <span className="text-wrapper">Smart</span>
          <span className="span">Home</span>
          <span className="text-wrapper">Share</span>
        </p>
        <div className="smart-home__social">
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="social__media-icon"
              xlmns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 31"
            >
              <path d="M16 0.0567932C24.8457 0.0567932 32 6.77826 32 15.0888C32 23.3994 24.8457 30.1209 16 30.1209C7.15429 30.1209 0 23.3994 0 15.0888C0 6.77826 7.15429 0.0567932 16 0.0567932ZM13.0743 23.0129C20.16 23.0129 24.0457 17.494 24.0457 12.7052V12.2327C24.8 11.7174 25.4629 11.0731 25.9657 10.343C25.28 10.6222 24.5257 10.8154 23.7486 10.9228C24.5486 10.4718 25.1657 9.76319 25.44 8.92569C24.6857 9.33371 23.8629 9.63435 22.9943 9.80614C22.2857 9.09749 21.28 8.668 20.1829 8.668C18.0571 8.668 16.32 10.3001 16.32 12.2972C16.32 12.5763 16.3429 12.8555 16.4343 13.1132C13.2343 12.9629 10.3771 11.5241 8.48 9.33371C8.16 9.87056 7.95429 10.4933 7.95429 11.159C7.95429 12.4045 8.64 13.5212 9.66857 14.1654C9.02857 14.1654 8.43429 13.9936 7.93143 13.7145V13.7574C7.93143 15.5183 9.25714 16.9786 11.0171 17.3222C10.6971 17.4081 10.3543 17.451 10.0114 17.451C9.76 17.451 9.53143 17.4295 9.28 17.3866C9.76 18.8254 11.2 19.8776 12.8686 19.8991C11.5429 20.8654 9.87429 21.4452 8.06857 21.4452C7.74857 21.4452 7.45143 21.4452 7.15429 21.4023C8.84571 22.433 10.88 23.0343 13.0514 23.0343" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="social__media-icon"
              xlmns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 31"
            >
              <path d="M32 15.1803C32 6.82578 24.8387 0.0567932 16 0.0567932C7.16129 0.0567932 0 6.82578 0 15.1803C0 22.7286 5.85097 28.9854 13.5 30.1209V19.5521H9.43548V15.1803H13.5V11.8482C13.5 8.05823 15.8871 5.96472 19.5432 5.96472C21.2942 5.96472 23.1252 6.25987 23.1252 6.25987V9.97976H21.1071C19.12 9.97976 18.5 11.1457 18.5 12.3416V15.1803H22.9374L22.2277 19.5521H18.5V30.1209C26.149 28.9854 32 22.7286 32 15.1803Z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="social__media-icon"
              xlmns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 31"
            >
              <path d="M15.9957 10.2992C13.0578 10.2992 10.6602 12.5547 10.6602 15.3186C10.6602 18.0825 13.0578 20.338 15.9957 20.338C18.9336 20.338 21.3312 18.0825 21.3312 15.3186C21.3312 12.5547 18.9336 10.2992 15.9957 10.2992ZM31.9982 15.3186C31.9982 13.24 32.0182 11.1803 31.8941 9.10549C31.7701 6.69556 31.1857 4.55676 29.3125 2.7945C27.4352 1.02848 25.1657 0.482478 22.604 0.365747C20.3946 0.249016 18.2052 0.267844 15.9997 0.267844C13.7902 0.267844 11.6008 0.249016 9.39536 0.365747C6.83368 0.482478 4.56019 1.03224 2.68696 2.7945C0.809722 4.56052 0.22934 6.69556 0.105259 9.10549C-0.0188226 11.184 0.00119056 13.2438 0.00119056 15.3186C0.00119056 17.3934 -0.0188226 19.4569 0.105259 21.5317C0.22934 23.9416 0.813724 26.0804 2.68696 27.8427C4.56419 29.6087 6.83368 30.1547 9.39536 30.2714C11.6048 30.3881 13.7943 30.3693 15.9997 30.3693C18.2092 30.3693 20.3986 30.3881 22.604 30.2714C25.1657 30.1547 27.4392 29.6049 29.3125 27.8427C31.1897 26.0766 31.7701 23.9416 31.8941 21.5317C32.0222 19.4569 31.9982 17.3971 31.9982 15.3186ZM15.9957 23.0416C11.4527 23.0416 7.78631 19.5924 7.78631 15.3186C7.78631 11.0447 11.4527 7.59552 15.9957 7.59552C20.5387 7.59552 24.2051 11.0447 24.2051 15.3186C24.2051 19.5924 20.5387 23.0416 15.9957 23.0416ZM24.5413 9.0829C23.4806 9.0829 22.6241 8.27708 22.6241 7.27922C22.6241 6.28136 23.4806 5.47554 24.5413 5.47554C25.602 5.47554 26.4586 6.28136 26.4586 7.27922C26.4589 7.51616 26.4095 7.75084 26.3133 7.96981C26.217 8.18877 26.0758 8.38773 25.8977 8.55527C25.7196 8.72282 25.5082 8.85567 25.2754 8.94621C25.0426 9.03674 24.7932 9.08319 24.5413 9.0829Z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
