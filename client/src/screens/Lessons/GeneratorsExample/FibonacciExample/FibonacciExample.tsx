import React, { FC, useState, useRef, useEffect } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import { ProgressIndicator } from 'src/components/ProgressIndicator';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Title } from 'src/components/Title';
import s from './FibonacciExample.sass';

export type FibonacciExampleProps = {
  className?: string;
};

const size = 100;

// const fibonacciSequense = (length: number): number[] => {
//   let [prev, current, next] = [0, 0, 1];
//   const result: number[] = [];
//   while (length > 0) {
//     result.push(current);
//     prev = current;
//     current = next;
//     next = prev + next;
//     length--;
//   }
//   return result;
// };
//
// export const FibonacciExample: FC<FibonacciExampleProps> = ({ className }) => {
//   const [list, setList] = useState<number[]>([]);
//
//   const onClick = () => setList(fibonacciSequense(size));
//
//   return (
//     <div className={cn(s.root, className)}>
//       <Title>Найти числа Фибоначчи</Title>
//
//       <div className={s.buttons}>
//         <Button type="primary" onClick={onClick}>
//           <PlayCircleIcon />
//         </Button>
//       </div>
//       {list.map((item, i) => (
//         <div key={i}>{item}</div>
//       ))}
//     </div>
//   );
// };

function* fibonacciSequense(length: number): Generator<number> {
  let [prev, current, next] = [0, 0, 1];
  while (length > 0) {
    yield current;
    prev = current;
    current = next;
    next = prev + next;
    length--;
  }
}

export const FibonacciExample: FC<FibonacciExampleProps> = ({ className }) => {
  const [running, setRunning] = useState<boolean>(false);
  const [list, setList] = useState<number[]>([]);

  const listCopy = useRef(list);
  listCopy.current = list;

  const fibonacci = useRef<Generator<number>>();
  const paused = useRef<boolean>(false);

  useEffect(() => {
    const fn = () => {
      if (paused.current) return;
      const { value, done } = fibonacci.current.next();
      if (!done) {
        setList((v) => [...v, value]);
        setTimeout(fn);
      }
    };

    if (running) {
      paused.current = false;

      if (listCopy.current.length) {
        fn();
      } else {
        fibonacci.current = fibonacciSequense(size);
        fn();
      }
    } else {
      paused.current = true;
    }
  }, [running]);

  const onStop = () => {
    setList([]);
    setRunning(false);
  };
  return (
    <div className={cn(s.root, className)}>
      <Title>Найти числа Фибоначчи</Title>
      <div>
        <ProgressIndicator className={s.progress} progress={(list.length / size) * 100} />
        {`${list.length} / ${size}`}
      </div>
      <div className={s.buttons}>
        <Button type="primary" onClick={() => setRunning(true)}>
          <PlayCircleIcon />
        </Button>
        <Button onClick={() => setRunning(false)}>
          <PauseCircleIcon />
        </Button>
        <Button type="primary" danger onClick={onStop}>
          <HighlightOffIcon />
        </Button>
      </div>
      {list.map((item, i) => (
        <div key={i}>{item}</div>
      ))}
    </div>
  );
};