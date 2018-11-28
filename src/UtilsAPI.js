
/*---------------------------------------  foursquare API  ------------------------------------------------*/

// this Url used for search for places
var foursquare_url = "https://api.foursquare.com/v2/venues/search?v=20181107&intent=global&client_id=OSYKZKCNA4FXTF5LZGEUZSGVLNQL1R2TSWMNZI5XWS1QEUJ4&client_secret=K1DGUZBN1DQMEUITRDAUR1FONKJWQNY3GJLNXZX1XIWVA0OR&query="

export const getFoursquareLocationId = (placesName) =>
  fetch(`${foursquare_url}${placesName}`)
    .then(res => res.json())
    .then(data => data.response.venues[0].id)
    .catch(error => alert(`no details found for ${placesName}`))


// this Url used for search Places Details by id
var foursquare_details_url = "https://api.foursquare.com/v2/venues/"
var foursquare_details_prefix_url = "?client_id=OSYKZKCNA4FXTF5LZGEUZSGVLNQL1R2TSWMNZI5XWS1QEUJ4&client_secret=K1DGUZBN1DQMEUITRDAUR1FONKJWQNY3GJLNXZX1XIWVA0OR&v=20171124"

export const getFoursquareLocationDetalisById = (id) =>
  fetch(`${foursquare_details_url}${id}${foursquare_details_prefix_url}`)
    .then(res => res.json())
    .then(data => data.response.venue)
    .catch(error => alert(`no details found for ${id}`))


// Returns photos for a specific venue
/* To assemble a photo URL, combine the response’s prefix + size + suffix. Ex: https://igx.4sqi.net/img/general/${300x500}/5163668_xXFcZo7sU8aa1ZMhiQ2kIP7NllD48m7qsSwr1mJnFj4.jpg

size can be one of the following, where XX or YY is one of 36, 100, 300, or 500.

XXxYY
original: the original photo’s size
capXX: cap the photo with a width or height of XX. (whichever is larger). Scales the other, smaller dimension proportionally
widthXX: forces the width to be XX and scales the height proportionally
heightYY: forces the height to be YY and scales the width proportionally
Request*/

var foursquare_photos_url = "https://api.foursquare.com/v2/venues/"
var foursquare_photos_prefix_url = "/photos?client_id=OSYKZKCNA4FXTF5LZGEUZSGVLNQL1R2TSWMNZI5XWS1QEUJ4&client_secret=K1DGUZBN1DQMEUITRDAUR1FONKJWQNY3GJLNXZX1XIWVA0OR&v=20171124"

export const getFoursquareLocationPhotoById = (id) =>
fetch(`${foursquare_photos_url}${id}${foursquare_photos_prefix_url}`)
.then(res => res.json())
.then(data => data)
.catch(error => alert(`no details found for ${id}`))

/*---------------------------------------  wikipedia API  ------------------------------------------------*/

var wiki_url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&origin=*&titles='

const getFirstObjChild = (obj) => {
  return obj[Object.keys(obj)[0]]; //returns 'first element inside obj'
}

export const getWikipediaIntroduction  = (placesName) =>
  fetch(`${wiki_url}${placesName}`)
    .then(res => res.json())
    .then(data => data.query)
    .then(query => getFirstObjChild(query.pages))
    .catch(error => alert(`pleace check your internet connection no info about ${placesName}`))


/*---------------------------------------  flickr API  ------------------------------------------------*/

var flickr_url = 'https://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key=0e2b6aaf8a6901c264acb91f151a3350&nojsoncallback=1&text='
/* to get image u must use this */
export const getFlickrPhoto  = (placesName) =>
  fetch(`${flickr_url}${placesName}`)
    .then(res => res.json())
    .then(data => convertToImg(data.photos.photo))
    .catch(error => alert(`pleace check your internet connection no image for ${placesName}`))


const convertToImg = (photo) => {
  return `https://farm${photo[0].farm}.staticflickr.com/${photo[0].server}/${photo[0].id}_${photo[0].secret}.jpg`;
}
