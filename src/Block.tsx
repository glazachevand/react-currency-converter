import React from 'react';
import { TranslationCurrencies, DataRates, defaultCurrencies } from './types';

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

  React.useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      if (
        tableRef.current?.classList.contains('active') &&
        choiseRef.current &&
        !event.composedPath().includes(tableRef.current) &&
        !event.composedPath().includes(choiseRef.current)
      ) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutSide);

    return () => document.body.removeEventListener('click', handleClickOutSide);
  }, []);

  const currenciesTable = [];

  for (const key in dataRates) {
    currenciesTable.push(
      <div className="currencies__item" key={key} onClick={() => onChangeCurrencyTable(key, side)}>
        {key} - {TranslationCurrencies[key] ? TranslationCurrencies[key] : key}
      </div>,
    );
  }

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
          onClick={(event: React.MouseEvent<HTMLLIElement>) => {
            const target = event.target as Element;
            onChangeCurrency(target.innerHTML);
          }}
          className={currency === currenciesRef.current?.textContent ? 'active' : ''}
          key={'BYN'}
          title={
            currenciesRef.current?.textContent && TranslationCurrencies[currenciesRef.current.textContent]
              ? TranslationCurrencies[currenciesRef.current.textContent]
              : ''
          }>
          {currenciesRef.current?.textContent || 'BYN'}
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
      <div className="currencies__table" ref={tableRef}>
        {currenciesTable}
      </div>
      <input
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeValue(Number(event.target.value))}
        value={String(value)}
        type="number"
        placeholder={'1'}
      />
    </div>
  );
};
