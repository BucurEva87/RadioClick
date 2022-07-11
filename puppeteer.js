const puppeteer = require('puppeteer')
let browser

(async function() {
  browser = await puppeteer.launch()
})()

const retrieveSongName = async function() {
  const page = await browser.newPage()

  await page.goto('http://live.radioclick.ro:8008/index.html?sid=1')

  const selector = 'a[href^="currentsong"]'

  try {
    await page.waitForSelector(selector, {timeout: 2000})
  } catch (e) {
    if (e instanceof puppeteer.TimeoutError) {
      return 'DJERROR'
    }
  }

  const songName = await page.evaluate(selector => {
    return document.querySelector(selector).textContent.trim()
  }, selector)

  return cleanSongName(songName)
}

async function cleanSongName(songName) {
  const page = await browser.newPage()

  await page.goto(`https://www.google.com/search?q=${encodeURIComponent(songName)}`)

  const allResultsSelector = 'video-voyager h3'
  
  try {
    await page.waitForSelector(allResultsSelector, {timeout: 2000})
  } catch(e) {
    if (e instanceof puppeteer.TimeoutError)
      return songName
  }
  await page.click(allResultsSelector)

  let title = await page.evaluate(allResultsSelector => {
    return document.querySelector(allResultsSelector).textContent.trim()
  }, allResultsSelector)

  if (title.includes('YouTube'))
    title = title.replace(' - YouTube', '')
  if (title.includes(' (Official Video)'))
    title = title.replace(' (Official Video)', '')

  return title
}

module.exports = {
  retrieveSongName
}
