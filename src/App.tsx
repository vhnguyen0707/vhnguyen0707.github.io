
import WebGLCanvas from "./components/webgl/WebGLCanvas";

const App = () => {
  return (
      <div>
          {/*<div style={{backgroundColor: "pink", width: "100%", height: "200px"}} />*/}
         <WebGLCanvas />

          {/* Content below for scrolling */}
          <div style={{ height: "100vh", padding: "20px", backgroundColor: "#f5f5f5" }}>
              <h1>Welcome to My Portfolio</h1>
              <p>Scroll to zoom in and focus on the screen...</p>
              <div style={{ height: "80vh" }}></div>
          </div>
      </div>
  )
}

export default App