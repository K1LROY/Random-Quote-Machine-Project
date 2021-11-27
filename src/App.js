/* eslint-disable react/jsx-no-target-blank */
import { useEffect, useState } from "react";
import axios from "axios";
import colorsArray from "./colorsArray";

import "./App.scss";

const API_URL =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [randomNumber, setRandomNumber] = useState(0);
  const [colorRandom, setColorRandom] = useState("#333");

  const [quotesArray, setQuotesArray] = useState(null);

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setQuotesArray(data.quotes);

    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRandomNumber = () => {
    const randomNum = Math.floor(quotesArray.length * Math.random());
    setRandomNumber(randomNum);
    setColorRandom(colorsArray[randomNum]);
    setQuote(quotesArray[randomNum].quote);
    setAuthor(quotesArray[randomNum].author);
  };

  return (
    <div>
      <div
        id="wrapper"
        style={{
          backgroundColor: colorRandom,
          color: colorRandom,
          transition: "all 0.8s ease-in-out",
        }}
      >
        <div id="quote-box">
          <div className="quote-text">
            <i className="fa fa-quote-left"> </i>
            <span id="text">{quote}</span>
          </div>
          <div className="quote-author">
            - <span id="author">{author}</span>
          </div>
          <div className="buttons">
            <a
              href={encodeURI(
                `http://www.twitter.com/intent/tweet?text=${quote} -${author}`
              )}
              className="button"
              style={{
                backgroundColor: colorRandom,
                transition: "all 0.6s ease-in-out",
              }}
              id="tweet-quote"
              title="Tweet this quote!"
              target="_top"
            >
              <i class="bi bi-twitch"></i>
            </a>
            <a
              href="https://github.com/K1LROY"
              style={{
                backgroundColor: colorRandom,
                transition: "all 0.6s ease-in-out",
              }}
              className="button"
              id="github-quote"
              title="My github"
              target="_blank"
            >
              <i class="bi bi-github"></i>
            </a>
            <button
              className="button"
              style={{
                backgroundColor: colorRandom,
                transition: "all 0.6s ease-in-out",
              }}
              id="new-quote"
              onClick={handleRandomNumber}
            >
              New quote
            </button>
          </div>
        </div>
      </div>
      <div className="footer">
        by <a href="https://codepen.io/k1lroy">forrfang</a>
      </div>
    </div>
  );
}

export default App;
