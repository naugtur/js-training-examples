import React from 'react';
import EmojiIcon from 'emoji-icon-component';

const PastryList = ({ pastries }) => {
  return (
    <div>
      <h2>Pastries</h2>
      <ul>
        {pastries.map((pastry, index) => (
          <li key={index}>
            <EmojiIcon /> {pastry.name} - ${pastry.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PastryList;