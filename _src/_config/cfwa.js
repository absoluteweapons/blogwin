require("dotenv").config();
module.exports = () => {
  return (process.env.NODE_ENV === "production")
    ? `<!-- Cloudflare Web Analytics --><script defer="defer" src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "${ process.env.CFWA_TOKEN }"}'></script><!-- End Cloudflare Web Analytics -->`
    : "";
}