export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url);
  })

  $axios.onError(error => {
    // Code to handle the exception goes here.
    // Only catch exceptions that you know how to handle.
  })
}
