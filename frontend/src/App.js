import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 10; // Change this to display more/less items per page

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
    width: "50px",
    height: "50px",
    borderRadius: "6px", // Set border radius to 6px for a square shape
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:
      origin === "Lobsters"
        ? "orange"
        : origin === "Product Hunt"
        ? "purple"
        : "blue",
    marginRight: "10px",
  };

  const logoTextStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "white",
  };

  return (
    <div
      style={{
        display: "flex",
        background: "#f7f7f7",
        borderRadius: "10px",
        padding: "20px",
        marginBottom: "20px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        transform: isHovered ? "scale(1.05)" : "scale(1)",
        transition: "transform 0.3s ease",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "10px",
        }}
      >
        <div style={logoCardStyle}>
          <span style={logoTextStyle}>{origin.charAt(0)}</span>
        </div>
      </div>
      <div>
        <h4
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          {title}
        </h4>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: isClicked ? "red" : "blue",
            textDecoration: "none",
            display: "block",
          }}
          onClick={handleClick}
        >
          {isClicked ? "Already Clicked" : "Go to link"}
        </a>
      </div>
    </div>
  );
};

const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://8dfb-213-41-102-186.ngrok-free.app/news"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const paginatedData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div
      style={{
        fontFamily: "Arial",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      {paginatedData.map((item, index) => (
        <Card
          key={index}
          title={item.title}
          link={item.link}
          origin={item.origin}
          image={item.image}
        />
      ))}
      <Pagination
        totalItems={data.length}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

const Pagination = ({ totalItems, itemsPerPage, currentPage, setCurrentPage }) => {
  const pages = Math.ceil(totalItems / itemsPerPage);

  const buttonStyle = {
    padding: '10px 20px',
    margin: '0 5px',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#007BFF',
    color: 'white',
  };

  const inactiveButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'white',
    color: '#007BFF',
  };

  const prevNextButtonStyle = (enabled) => ({
    ...buttonStyle,
    backgroundColor: enabled ? '#007BFF' : '#BEC8D2',
    color: 'white',
    cursor: enabled ? 'pointer' : 'not-allowed',
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
      <button
        style={prevNextButtonStyle(currentPage > 1)}
        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          style={currentPage === page ? activeButtonStyle : inactiveButtonStyle}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
      <button
        style={prevNextButtonStyle(currentPage < pages)}
        onClick={() => currentPage < pages && setCurrentPage(currentPage + 1)}
        disabled={currentPage === pages}
      >
        Next
      </button>
    </div>
  );
};


export default App;
