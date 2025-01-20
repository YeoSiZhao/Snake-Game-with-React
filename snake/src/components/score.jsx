const Score = (prop) => {
  return (
    <div style={{ fontSize: '20px', color: 'white', margin: '10px' }}>
      Score: {prop.currentScore}
    </div>
  );
};

export default Score;
