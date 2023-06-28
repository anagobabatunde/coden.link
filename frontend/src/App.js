import { useEffect, useState } from 'react';

const Card = ({ title, link, origin, image }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    setIsClicked(true);
  };

  const logoCardStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '6px', // Set border radius to 6px for a square shape
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: origin === 'Lobsters' ? 'orange' : (origin === 'Product Hunt' ? 'purple' : 'blue'),
    marginRight: '10px',
  };
  

  const logoTextStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
  };
  

  return (
    <div
      style={{
        display: 'flex',
        background: '#f7f7f7',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.3s ease',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '10px',
        }}
      >
        <div style={logoCardStyle}>
          <span style={logoTextStyle}>{origin.charAt(0)}</span>
        </div>
      </div>
      <div>
        <h4
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '10px',
          }}
        >
          {title}
        </h4>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: isClicked ? 'red' : 'blue',
            textDecoration: 'none',
            display: 'block',
          }}
          onClick={handleClick}
        >
          {isClicked ? 'Already Clicked' : 'Go to link'}
        </a>
      </div>
    </div>
  );
};



const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://8dfb-213-41-102-186.ngrok-free.app/news');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ fontFamily: 'Arial', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
 {data.map((item, index) => (
  <Card
    key={index}
    title={item.title}
    link={item.link}
    origin={item.origin} // Make sure to provide the origin prop
    image={item.image} // Make sure to provide the image prop
  />
))}

    </div>
  );
};

export default App;