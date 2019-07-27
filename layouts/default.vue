<template>
  <div class="max-w-6xl mx-auto px-4">
    <nuxt />
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.plyr--full-ui input[type=range] {
  color: #45babd;
}

.plyr__control--overlaid {
  background: rgba(69, 186, 189, .8);
}

.plyr--video .plyr__control.plyr__tab-focus,
.plyr--video .plyr__control:hover,
.plyr--video .plyr__control[aria-expanded=true] {
  background: #45babd;
}

.plyr__control.plyr__tab-focus {
  box-shadow: 0 0 0 5px rgba(69, 186, 189, .8, .5);
}

.plyr__menu__container .plyr__control[role=menuitemradio][aria-checked=true]::before {
  background: #45babd;
}

.post-content p {
  color: #434343;
  font-size: 1.05rem;
  line-height: 1.7em;
  margin-bottom: 1.5em;
  font-weight: 500;
}
</style>
