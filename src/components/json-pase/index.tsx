import { useState, useRef, useEffect } from 'react';
import style from './index.module.css';
import Darwish from 'darwish';

enum COLOR_ENUM {
  string = 'rgb(94, 179, 86)',
  number = 'rgb(87, 167, 222)',
  boolean = 'rgb(233, 138, 131)',
}
const JsonParse = ({
  data,
  initExtend = false,
}: {
  data: any;
  initExtend?: boolean;
}) => {
  const indentRef = useRef<Darwish.ElementRef<'span'>>(null);
  const [extendObj, setExtendObj] = useState(initExtend);
  const keyValueArr = Object.entries(data);
  useEffect(() => {
    console.log(indentRef);
  }, [indentRef.current]);
  return (
    <>
      {!extendObj ? (
        <ObjectViewEll {...{ setExtendObj, extendObj, data }} />
      ) : (
        <div>
          {data ? (
            <div>
              <span
                className={style.icon_extend}
                onClick={() => {
                  setExtendObj((prev) => !prev);
                }}
              >
                {extendObj ? '➖' : '➕'}
              </span>
              <span className={style.text_font} ref={indentRef}>
                {'{'}
              </span>
              {keyValueArr.map((item, key) => {
                return (
                  <div
                    className={style.sing_line}
                    key={key}
                    style={{
                      marginLeft: indentRef.current
                        ? indentRef.current.offsetWidth + 25 + 'px'
                        : '0px',
                    }}
                  >
                    <StringView str={item[0]} />
                    <span
                      className={style.text_font}
                      style={{ margin: '0 2.5px' }}
                    >
                      :
                    </span>
                    {typeof item[1] === 'object' ? (
                      <JsonParse data={item[1]} />
                    ) : (
                      <span
                        className={style.text_font}
                        style={{
                          color:
                            COLOR_ENUM[
                              typeof item[1] as 'string' | 'number' | 'boolean'
                            ],
                        }}
                      >
                        {typeof item[1] === 'string' ? (
                          <StringView str={item[1]} color={COLOR_ENUM.string} />
                        ) : (
                          <>{item[1] + ''}</>
                        )}
                      </span>
                    )}
                    <CommaCharView {...{ key, len: keyValueArr.length }} />
                  </div>
                );
              })}
              <div className={style.text_font}>{'}'}</div>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};
export default JsonParse;

const ObjectViewEll = ({
  setExtendObj,
  extendObj,
  data,
}: {
  setExtendObj: React.Dispatch<React.SetStateAction<boolean>>;
  extendObj: boolean;
  data: any;
}) => {
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div className={style.sing_line}>
      <span
        className={style.icon_extend}
        onClick={() => {
          setExtendObj((prev) => !prev);
        }}
      >
        {extendObj ? '➖' : '➕'}
      </span>
      <span className={style.text_font}>
        {capitalizeFirstLetter(Darwish.typeOfData(data))}
        <span className={style.text_font}>{' {'}</span>
        <span
          className={style.text_eil}
          onClick={() => {
            setExtendObj((prev) => !prev);
          }}
        >
          ~~~
        </span>
        <span className={style.text_font}>{'} '}</span>
      </span>
    </div>
  );
};
const StringView = ({ str, color }: { str: string; color?: string }) => {
  return (
    <span
      className={style.text_prop}
      style={{ color: color || 'rgb(135, 48, 139)' }}
    >
      {'"' + str + '"'}
    </span>
  );
};
const CommaCharView = ({ key, len }: { key: number; len: number }) => {
  return (
    <span className={style.text_font} style={{ marginLeft: '2px' }}>
      {key !== len - 1 ? ',' : ''}
    </span>
  );
};
// const ExtendTypeofData = () => {};
