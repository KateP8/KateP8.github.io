/* eslint-disable no-console */
import React, { FC, useReducer } from 'react';
import cn from 'clsx';
import s from './ChildrenExample.sass';
import { ChildrenCheck } from '../ChildrenCheck';

interface RenderPropsAsFunctionProps {
  render: (count: number) => React.ReactElement;
}

const RenderPropsAsFunction: FC<RenderPropsAsFunctionProps> = ({ render }) => {
  const [count, increase] = useReducer((v) => v + 1, 0);

  return (
    <div>
      {render(count)}
      <button type="button" onClick={increase}>
        increase
      </button>
    </div>
  );
};

interface RenderPropsAsJSXProps {
  header: React.ReactElement;
  footer: React.ReactElement;
}

const RenderPropsAsJSX: FC<RenderPropsAsJSXProps> = ({ footer, header }) => (
  <div>
    {header}
    <hr />
    {footer}
  </div>
);

interface FunctionAsChildrenExampleProps {
  children: (count: number) => React.ReactElement;
}

const FunctionAsChildrenExample: FC<FunctionAsChildrenExampleProps> = ({ children }) => {
  const [count, increase] = useReducer((v) => v + 1, 0);

  return (
    <div>
      {children(count)}
      <button type="button" onClick={increase}>
        increase
      </button>
    </div>
  );
};

export type TestProps = Record<string, never>;

export const Test: FC<TestProps> = () => <div>Компонент</div>;

export type ChildrenExampleProps = {
  className?: string;
};

export const ChildrenExample: FC<ChildrenExampleProps> = ({ className }) => (
  <div className={cn(s.root, className)}>
    <ChildrenCheck>string</ChildrenCheck>
    <ChildrenCheck>{0}</ChildrenCheck>
    <ChildrenCheck>{null}</ChildrenCheck>
    <ChildrenCheck>{undefined}</ChildrenCheck>
    <ChildrenCheck>{false}</ChildrenCheck>
    <ChildrenCheck>{true}</ChildrenCheck>
    <ChildrenCheck>{[2, '3', null, undefined, false, <div key={1}>test</div>, <div key={2}>test</div>]}</ChildrenCheck>
    <ChildrenCheck>
      <div>Элемент</div>
    </ChildrenCheck>
    <ChildrenCheck>
      <Test />
    </ChildrenCheck>
    <FunctionAsChildrenExample>{(count) => <div>{count}</div>}</FunctionAsChildrenExample>
    <RenderPropsAsFunction render={(count) => <div>{count}</div>} />
    <RenderPropsAsJSX header={<div>header</div>} footer={<div>footer</div>} />
  </div>
);
