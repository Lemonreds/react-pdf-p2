import React from 'react';
import { render } from 'react-dom';
import ReactPDF from '../react-pdf-p2';

const file = 'http://127.0.0.1:3000/demo.pdf';

const App = () => {
  return (
    <div>
      <div style={{ height: 660, width: 400 }}>
        <ReactPDF file={file} />
      </div>
    </div>
  );
};

render(<App />, document.getElementById('root'));
