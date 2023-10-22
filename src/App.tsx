import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import JsonParse from './components/json-pase';
import './App.css';
import Splitter from './components/splitter';

function App() {
  const [data, setData] = useState();

  return (
    <div className="wrapper">
      <Splitter
        leftView={
          <textarea
            style={{ width: '100%', height: '100%', resize: 'none' }}
            placeholder="请输入一些json数据"
            onChange={(e) =>
              setData(() => {
                try {
                  return JSON.parse(e.target.value);
                } catch (_) {
                  return String(e.target.value);
                }
              })
            }
          ></textarea>
        }
        rightView={
          typeof data === 'object' ? (
            <JsonParse data={data} initExtend={true} />
          ) : (
            <>{String(data || '')}</>
          )
        }
      />
    </div>
  );
}

export default App;
