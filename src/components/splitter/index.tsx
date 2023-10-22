import { useEffect, useRef } from 'react';
import style from './index.module.css';
import Darwish from 'darwish';

const Splitter = ({
  splitterWidth = 15,
  leftView,
  rightView,
}: {
  splitterWidth?: number;
  leftView?: React.ReactNode;
  rightView?: React.ReactNode;
}) => {
  const [states, setStates] = Darwish.useSetState({
    moveX: 0,
    startX: 0,
    width: -1,
  });
  const slideRef = useRef<Darwish.ElementRef<'div'>>(null);
  const { moveX, startX, width } = states;
  const onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    setStates({ startX: event.pageX });
  };

  const onDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    if (event.pageX > 0) {
      setStates({ width: width + (event.pageX - startX), moveX: 0, startX: 0 });
    }
  };

  const onDrag = (event: React.DragEvent<HTMLDivElement>) => {
    setStates({ moveX: event.pageX - startX });
  };

  useEffect(() => {
    if (slideRef.current) {
      setStates({ width: slideRef.current.clientWidth });
    }
  }, [slideRef.current]);

  return (
    <div className={style.splitter_ctn}>
      <div
        className={style.splitter__left}
        ref={slideRef}
        style={{
          width:
            width == -1
              ? `calc(50% - ${splitterWidth / 2}px)`
              : `${width + moveX}px`,
        }}
      >
        {leftView ? leftView : null}
      </div>
      <div
        style={{ width: splitterWidth }}
        className={style.splitter_vert}
        onMouseEnter={onDragEnter}
        onDragEnd={onDragEnd}
        onDrag={onDrag}
        draggable={true}
      ></div>
      <div className={style.splitter__right}>
        {rightView ? rightView : null}
      </div>
    </div>
  );
};
export default Splitter;
