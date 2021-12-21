import React from "react";

const Fallback = () => {
  return (
    <div className='fallback'>
      <div className='f-banner'>
        <div className='f-header'>
          <div className='f-content'></div>
          <div className='f-content'></div>
          <div className='f-content'></div>
        </div>
      </div>
      <style jsx>{`
        .fallback {
          max-width: 1200px;
          margin: 20px auto;
        }
        .fallback > div {
          background: #dbcc1a;
          border-radius: 4px;
          margin: 20px 0;
        }
        .f-banner {
          padding: 12% 0;
        }
        .f-header {
          padding: 15px 0;
          max-width: 500px;
        }
        .f-content {
          padding: 8px 0;
          max-width: 1000px;
        }
      `}</style>
    </div>
  );
};

export default Fallback;
