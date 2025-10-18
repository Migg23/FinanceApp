import Navbar from './Navbar';

function HomePage() {
  return (
    <>
      <Navbar />  {/* Render the Navbar component here */}
      <div className="home">
        <h1>Budget Boss</h1>
        <p>A cool app for budgeting and stuff</p>
      </div>
    </>
  );
}

export default HomePage;
