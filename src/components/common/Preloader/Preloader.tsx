import React from 'react';
import preloader from '../../../assets/images/Spinner-1s-200px.svg';

const Preloader: React.FC = () => {
  return (
    <div>
      <img src={preloader} alt="preloader" />
    </div>
  );
};

export default Preloader;
