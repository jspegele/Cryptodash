import React, { useState } from 'react'
import moment from 'moment'

const cc = require('cryptocompare')
cc.setApiKey(process.env.REACT_APP_CRYPTO_COMPARE_API_KEY)

const CoinNews = (props) => {
  const [news, setNews] = useState([])

  if(news.length === 0) {
    cc.newsList('EN', { categories: [props.categories] })
    .then(newsList => {
      setNews(newsList.slice(0, props.results))
    }).catch(console.error)
  }
  return (
    <div className="news-list">
      {news.map(story => {
        const now = moment()
        const published = moment(story.published_on * 1000)
        const secondsAgo = now.diff(published) / 1000
        return (
          <div key={story.id} className="news-list__story">
            <div className="news-list__title"><a href={story.url} target="_blank" rel='noreferrer noopener'>{story.title}</a></div>
            {props.showBody && <div className="news-list__subtitle">{story.body}</div>}
            <div className="news-list__subtitle">
              {secondsAgo < 60 ? (
                <span>&lt; 1 min</span>
              ) : (
                secondsAgo < 3600 ? (
                  Math.round(secondsAgo / 60) === 1 ? (
                    <span>1 min</span>
                  ) : (
                    <span>{Math.round(secondsAgo / 60)} mins</span>
                  )
                ) : (
                  secondsAgo < 86400 ? (
                    Math.round(secondsAgo / 3600) === 1 ? (
                      <span>1 hour</span>
                    ) : (
                      <span>{Math.round(secondsAgo / 3600)} hours</span>
                    )
                  ) : (
                    Math.round(secondsAgo / 86400) === 1 ? (
                      <span>1 day</span>
                    ) : (
                      <span>{Math.round(secondsAgo / 86400)} days</span>
                    )
                  )
                )
              )
              
              } ago
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CoinNews


