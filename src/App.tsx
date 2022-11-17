import React from 'react';
import { Block } from './Block';
import beginData from './data.json';
import './index.scss';

// API: https://www.cbr-xml-daily.ru/latest.js или https://cdn.cur.su/api/latest.json

function App() {
  // названия валют
  const [fromCurrency, setFromCurrency] = React.useState('USD');
  const [toCurrency, setToCurrency] = React.useState('RUB');

  // значение в инпутах
  const [fromPrice, setFromPrice] = React.useState(1);
  const [toPrice, setToPrice] = React.useState(0);

  // курсы валют
  const ratesRef = React.useRef<{ [item: string]: number }>(beginData.rates);

  React.useEffect(() => {
    //fetch('https://cdn.cur.su/api/latest.json')
    fetch('https://www.cbr-xml-daily.ru/latest.js')
      .then((res) => res.json())
      .then((data) => {
        ratesRef.current = data.rates;
        ratesRef.current.RUB = 1;
      })
      .catch((err) => {
        console.warn(err);
        alert('Не удалось получить информацию с сервера - с сайта https://www.cbr-xml-daily.ru/latest.js. Показаны данные за 2022-11-17');
      })
      .finally(() => onChangeFromPrice(1));
  }, []);

  const onChangeFromPrice = (value: number) => {
    const result = (value / ratesRef.current[fromCurrency]) * ratesRef.current[toCurrency];
    setFromPrice(value);
    setToPrice(+result.toFixed(3));
  };

  const onChangeToPrice = (value: number) => {
    const result = (value / ratesRef.current[toCurrency]) * ratesRef.current[fromCurrency];
    setToPrice(value);
    setFromPrice(+result.toFixed(3));
  };

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  React.useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  return (
    <div className="App">
      <h1 className="title">Конвертер валют</h1>
      <div className="row">
        <Block value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice} />
        <Block value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice} />
      </div>
    </div>
  );
}

export default App;
