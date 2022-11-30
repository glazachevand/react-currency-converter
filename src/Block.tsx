import React from 'react';
import { TranslationCurrencies, DataRates } from './types';

type BlockProps = {
  value: number;
  currency: string;
  onChangeValue: (value: number) => void;
  onChangeCurrency: (cur: string) => void;
  dataRates: DataRates;
  onChangeCurrencyTable: (key: string, side: string) => void;
  side: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultCurrencies = ['RUB', 'USD', 'EUR', 'GBP'];

export const Block: React.FC<BlockProps> = ({
  value,
  currency,
  onChangeValue,
  onChangeCurrency,
  dataRates,
  onChangeCurrencyTable,
  side,
  open,
  setOpen,
}) => {
  const choiseRef = React.useRef<HTMLLIElement>(null);
  const currenciesRef = React.useRef<HTMLLIElement>(null);
  const tableRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!defaultCurrencies.includes(currency)) {
      if (currenciesRef.current) {
        currenciesRef.current.textContent = currency;
      }
    }
  }, [currency]);

  React.useEffect(() => {
    if (!open) {
      choiseRef.current?.classList.remove('active');
      tableRef.current?.classList.remove('active');
    }
  }, [open]);

  const currenciesTable = () => {
    const arr = [];
    for (const key in dataRates) {
      arr.push(
        <div className="currencies__item" key={key} onClick={() => onChangeCurrencyTable(key, side)}>
          {key} - {TranslationCurrencies[key] ? TranslationCurrencies[key] : key}
        </div>,
      );
    }
    return (
      <div className="currencies__table" ref={tableRef}>
        {arr}
      </div>
    );
  };

  return (
    <div className="block">
      <ul className="currencies">
        {defaultCurrencies.map((cur) => (
          <li
            onClick={() => onChangeCurrency(cur)}
            className={currency === cur ? 'active' : ''}
            key={cur}
            title={TranslationCurrencies[cur] ? TranslationCurrencies[cur] : cur}>
            {cur}
          </li>
        ))}
        <li
          ref={currenciesRef}
          onClick={() => onChangeCurrency(currenciesRef.current?.textContent || 'BYN')}
          className={currency === currenciesRef.current?.textContent ? 'active' : ''}
          key={'BYN'}
          title={
            currenciesRef.current?.textContent && TranslationCurrencies[currenciesRef.current.textContent]
              ? TranslationCurrencies[currenciesRef.current.textContent]
              : 'BYN'
          }>
          {'BYN'}
        </li>
        <li
          ref={choiseRef}
          className="currencies__choice"
          onClick={() => {
            choiseRef.current?.classList.toggle('active');
            tableRef.current?.classList.toggle('active');
            setOpen((state) => !state);
          }}></li>
      </ul>
      {currenciesTable()}
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeValue(Number(e.target.value))}
        value={String(value)}
        type="number"
        placeholder={'1'}
      />
    </div>
  );
};
